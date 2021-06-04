const { Category } = require("../../models");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      status: "success",
      data: {
        book: category,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.readCategories = async (req, res) => {
  try {
    const category = await Category.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.send({
      status: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
