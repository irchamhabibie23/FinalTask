const { User, Film, PurchaseList, sequelize } = require("../../models")
const isUrl = require("is-url")
const { literal } = require("sequelize")
const joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secretKey = process.env.SECRET_KEY
const path = process.env.FILE_PATH

exports.userAuth = async (req, res) => {
  try {
    const email = req.body.email

    const password = req.body.password
    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().required(),
      fullName: joi.string(),
      avatar: joi.string(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      })
    }
    const auth = await User.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ["phone", "createdAt", "updatedAt"],
      },
    })

    if (!auth) {
      return res.send({
        status: "failed",
        message: "Invalid Email or Password",
      })
    }

    const isPasswordMatch = bcrypt.compareSync(password, auth.password)

    if (!isPasswordMatch) {
      return res.send({
        status: "failed",
        message: "Invalid Email or Password",
      })
    }

    const user = await User.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ["phone", "password", "createdAt", "updatedAt"],
      },
    })

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: JSON.stringify(user.id),
      },
      secretKey
    )
    if (email == "admin@admin.com") {
      res.send({
        status: "success",
        isAdmin: true,
        data: {
          user: {
            fullName: user.fullName,
            email: user.email,
            token: token,
          },
        },
      })
    }
    res.send({
      status: "success",
      data: {
        user: {
          fullName: user.fullName,
          email: user.email,
          token: token,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.checkAuth = async (req, res) => {
  try {
    const id = req.userId

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    })

    if (!dataUser) {
      return res.status(404).send({
        status: "Failed",
      })
    }

    res.send({
      status: "success",
      message: "user valid",
      data: {
        user: {
          id: dataUser.id,
          fullName: dataUser.fullName,
          email: dataUser.email,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.createUser = async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().required(),
      avatar: joi.string(),
      fullName: joi.string().min(3).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      })
    }

    const email = req.body.email
    const isRegistered = await User.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ["phone", "createdAt", "updatedAt", "thumbnail"],
      },
    })

    if (!isRegistered) {
      const salt = bcrypt.genSaltSync(10)
      req.body.password = bcrypt.hashSync(req.body.password, salt)
      if (!req.body.avatar) {
        await User.create({ ...req.body, avatar: "conten.png" })
      } else {
        await User.create({ ...req.body })
      }

      const user = await User.findOne({
        where: {
          email,
        },
        attributes: {
          exclude: ["phone", "createdAt", "updatedAt", "avatar", "password"],
        },
      })

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: JSON.stringify(user.id),
        },
        secretKey
      )

      return res.send({
        status: "success",
        data: {
          user: {
            email: user.email,
            token: token,
          },
        },
      })
    }
    return res.send({
      status: "failed",
      message: "Your email has been registred",
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.readUsers = async (req, res) => {
  try {
    const dataUsers = await User.findAll({
      include: [
        {
          model: PurchaseList,
          as: "purchasedFilms",
        },
        {
          model: Film,
          as: "myFilms",
          attributes: ["id", "title", "price", "description"],
        },
      ],
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })

    res.send({
      status: "success",
      data: {
        users: dataUsers,
      },
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id,
      },
    })

    if (user) {
      await User.destroy({
        where: {
          id,
        },
      })
      return res.send({
        status: "success",
        message: "resource has been deleted",
        data: {
          id: 1,
        },
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

exports.getProfile = async (req, res) => {
  try {
    const id = req.userId
    const profile = await User.findOne({
      where: { id },
      include: [
        {
          model: PurchaseList,
          as: "purchasedFilms",
          attributes: [
            "id",
            [
              literal(`(
              SELECT Films.title FROM Films
              WHERE purchasedFilms.FilmId=Films.id
            )`),
              "film",
            ],
            [
              literal(`(
              SELECT Films.price FROM Films
              WHERE purchasedFilms.FilmId=Films.id
            )`),
              "price",
            ],
            "status",
            "accountNumber",
            "transferProof",

            [
              sequelize.fn(
                "date_format",
                sequelize.col("purchasedFilms.updatedAt"),
                "%W, %d %M %Y"
              ),
              "orderedAt",
            ],
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    })

    if (!profile) {
      return res.send({
        status: "failed",
        message: "User data not found",
      })
    }

    const parseJSON = JSON.parse(JSON.stringify(profile))
    data = [parseJSON].map((item) => {
      if (!isUrl(item.avatar)) {
        return {
          ...item,

          avatar: path + item.avatar,
        }
      } else {
        return {
          ...item,
        }
      }
    })

    res.send({
      status: "succes",
      data: {
        profile: data,
      },
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.getMyFilms = async (req, res) => {
  try {
    const id = req.userId
    const profile = await User.findOne({
      where: { id },
      include: [
        {
          model: PurchaseList,
          as: "purchasedFilms",
          attributes: [
            "FilmId",
            [
              literal(`(
              SELECT Films.title FROM Films
              WHERE purchasedFilms.FilmId=Films.id
            )`),
              "film",
            ],
            [
              literal(`(
              SELECT Films.thumbnail FROM Films
              WHERE purchasedFilms.FilmId=Films.id
            )`),
              "thumbnail",
            ],
            "status",
            "accountNumber",
            "transferProof",

            [
              sequelize.fn(
                "date_format",
                sequelize.col("purchasedFilms.updatedAt"),
                "%W, %d %M %Y"
              ),
              "orderedAt",
            ],
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    })

    if (!profile) {
      return res.send({
        status: "failed",
        message: "User data not found",
      })
    }

    const parseJSON = JSON.parse(JSON.stringify(profile))

    data = parseJSON.purchasedFilms.map((item) => {
      return {
        ...item,
        id: item.FilmId,
        thumbnail: path + item.thumbnail,
      }
    })

    res.send({
      status: "succes",
      data: {
        myFilms: data,
      },
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const id = req.userId
    const profile = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })

    if (!profile) {
      return res.send({
        status: "failed",
        message: "User data not found",
      })
    }

    if (req.files.imageFile) {
      const avatar = req.files.imageFile[0].filename
      const updateData = { ...req.body, avatar }
      await User.update(updateData, {
        where: { id },
      })
      res.send({
        status: "succes",
        data: {
          ...updateData,
        },
      })
    } else {
      if (!req.body) {
        return res.send({
          status: "No change",
        })
      }
      if (req.body.email) {
        const isRegistered = await User.findOne({
          where: { email: req.body.email },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        })
        if (isRegistered) {
          return res.send({
            status: "Failed",
            message: "Email has been registered. Choose another email",
          })
        }
      }

      const updateData = { ...req.body }
      await User.update(updateData, {
        where: { id },
      })
      res.send({
        status: "succes",
        data: {
          ...updateData,
        },
      })
    }
  } catch (err) {
    console.log(err)
    res.send({
      status: "failed",
      message: "server error",
    })
  }
}
