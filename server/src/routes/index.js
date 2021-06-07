const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth")
const { uploadFile } = require("../middlewares/uploadFile")

const {
  createUser,
  readUsers,
  deleteUser,
  userAuth,
  checkAuth,
  getProfile,
  updateProfile,
  getMyFilms,
} = require("../controllers/user")

const { createFilm, readFilms, readDetailFilm } = require("../controllers/film")

const { createCategory, readCategories } = require("../controllers/category")

const {
  createUserPurchase,
  readUserPurchaseList,
  updateUserPurchaseList,
} = require("../controllers/purchaselist")

router.post("/login", userAuth)
router.post("/register", createUser)
router.get("/check-auth", auth, checkAuth)
router.get("/users", readUsers)
router.get("/profile", auth, getProfile)
router.patch("/update", auth, uploadFile("imageFile"), updateProfile)
router.delete("/user/:id", auth, deleteUser)

router.post("/film", auth, uploadFile("imageFile1", "imageFile2"), createFilm)
router.get("/film", readFilms)
router.get("/my-films", auth, getMyFilms)
router.get("/film/:id", readDetailFilm)

router.post("/category", auth, createCategory)
router.get("/category", auth, readCategories)

router.post(
  "/purchase/:filmid",
  auth,
  uploadFile("imageFile"),
  createUserPurchase
)
router.get(
  "/transaction",
  auth,

  readUserPurchaseList
)

router.patch("/updateTransactionStatus/:id", auth, updateUserPurchaseList)

module.exports = router
