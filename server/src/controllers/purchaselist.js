const { Film, PurchaseList, User, sequelize } = require("../../models")
const { literal } = require("sequelize")
const { v4: uuidv4 } = require("uuid")
const midTransClient = require("midtrans-client")
const MIDTRANS_CLIENT_KEY = "SB-Mid-client-Cbqkqdo_7MGn2PNt"
const MIDTRANS_SERVER_KEY = "SB-Mid-server-7fqHC_31wyVISwOhgDbSGzLr"

exports.createUserOrder = async (req, res) => {
  try {
    const parameter = {
      transaction_details: {
        order_id: req.body.id,
        gross_amount: req.body.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.body.customer.fullName,
        email: req.body.customer.email,
        phone: req.body.customer.phone,
      },
    }

    const snap = new midTransClient.Snap({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
    })

    snap.createTransaction(parameter).then((transaction) => {
      const transactionToken = transaction.token
      res.send({
        status: "success",
        data: { token: transactionToken },
      })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

const handleTransaction = async (status, transactionId) => {
  await PurchaseList.update(
    { status: status },
    { where: { id: transactionId } }
  )
  console.log(status, transactionId)
}
const coreApi = new midTransClient.CoreApi({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
})

exports.notification = async (req, res) => {
  try {
    const data = req.body

    const response = await coreApi.transaction.notification(data)

    console.log("response", response)

    const { order_id, transaction_status, fraud_status } = response

    if (transaction_status == "capture") {
      if (fraud_status == "challenge") {
        handleTransaction("Pending", order_id)
        res.status(200)
      } else if (fraud_status == "accept") {
        handleTransaction("Finished", order_id)
        res.status(200)
      }
    } else if (transaction_status == "settlement") {
      handleTransaction("Finished", order_id)
      res.status(200)
    } else if (transaction_status == "deny") {
      handleTransaction("Cancel", order_id)
      res.status(200)
    } else if (
      transaction_status == "cancel" ||
      transaction_status == "expire"
    ) {
      handleTransaction("Cancel", order_id)
      res.status(200)
    } else if (transaction_status == "pending") {
      handleTransaction("Pending", order_id)
      res.status(200)
    }

    res.status(200).send({ status: "success" })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.createTransaction = async (req, res) => {
  try {
    const UserId = JSON.parse(req.userId)
    const avail = await PurchaseList.findOne({
      where: { UserId, FilmId: req.body.FilmId },
    })
    if (!avail) {
      const addData = await PurchaseList.create({
        ...req.body,
        UserId,
        id: uuidv4(),
      })
      res.status(200).send({
        status: "success",
        data: addData,
      })
    }
    res.send({
      status: "failed",
      data: avail,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.createUserPurchase = async (req, res) => {
  try {
    const filmid = req.params.filmid
    const id = JSON.parse(req.userId)
    const proof = req.files.imageFile[0].filename

    const purchase = await PurchaseList.create({
      ...req.body,
      id: uuidv4(),
      UserId: id,
      FilmId: filmid,
      transferProof: proof,
      status: "Pending",
    })

    res.status(200).send({
      status: "success",
      data: {
        purchase,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.readUserPurchaseList = async (req, res) => {
  try {
    const transaction = await PurchaseList.findAll({
      include: [
        {
          model: Film,
          attributes: [
            "id",
            "title",
            [
              literal(`(
            SELECT Categories.name FROM Categories
            WHERE Categories.id=Film.CategoryId
          )`),
              "category",
            ],
            "price",
            "description",
            "thumbnail",
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "phone", "avatar"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "UserId", "FilmId"],
      },
      attributes: [
        "id",
        "status",
        "accountNumber",
        "transferProof",

        [
          sequelize.fn(
            "date_format",
            sequelize.col("PurchaseList.updatedAt"),
            "%W, %d %M %Y"
          ),
          "orderedDate",
        ],
      ],
    })

    res.status(200).send({
      status: "success",
      data: {
        transaction,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.updateUserPurchaseList = async (req, res) => {
  try {
    const { id } = req.params

    const transaction = await PurchaseList.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })

    if (!transaction) {
      return res.status(500).send({
        status: "failed",
        message: "transaction data not found",
      })
    }

    const updateData = { status: req.body.status }

    await PurchaseList.update(updateData, {
      where: { id },
    })

    res.send({
      status: "success",
      data: {
        transaction,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.deleteUserTransaction = async (req, res) => {
  try {
    const UserId = JSON.parse(req.userId)
    const avail = await PurchaseList.findOne({
      where: { UserId, FilmId: req.params.FilmId },
    })

    if (avail) {
      await PurchaseList.destroy({
        where: { UserId, FilmId: req.params.FilmId },
      })
      return res.send({
        status: "success",
        message: "resource has been deleted",
      })
    }
    return res.send({
      status: "failed",
      message: "data not found",
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}
