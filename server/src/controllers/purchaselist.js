const { Film, PurchaseList, User, sequelize } = require("../../models")
const { literal } = require("sequelize")
const midTransClient = require("midtrans-client")
const path = process.env.FILE_PATH

exports.createUserPurchase = async (req, res) => {
  try {
    const filmid = req.params.filmid
    const id = req.userId
    const proof = req.files.imageFile[0].filename

    const purchase = await PurchaseList.create({
      ...req.body,
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
