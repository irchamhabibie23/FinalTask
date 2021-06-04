const multer = require("multer")

exports.uploadFile = (imageFile1, imageFile2, videoFile) => {
  const pathDir = "./public/uploads/"
  const storage = multer.diskStorage({
    destination: pathDir,
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
    },
  })

  const fileFilter = (req, file, cb) => {
    if (
      file.fieldname === imageFile1 &&
      !file.originalname.match(/\.(svg|SVG|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
    ) {
      req.fileValidationError = {
        message: "Only Image files are allowed",
      }
      return cb(new Error("Only Image files are allowed!"), false)
    }
    if (
      file.fieldname === imageFile2 &&
      !file.originalname.match(/\.(svg|SVG|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
    ) {
      req.fileValidationError = {
        message: "Only Image files are allowed",
      }
      return cb(new Error("Only Image files are allowed!"), false)
    }
    if (
      file.fieldname === videoFile &&
      !file.originalname.match(/\.(mp4|mkv)$/)
    ) {
      req.fileValidationError = {
        message: "Only Video files are allowed!",
      }
      return cb(new Error("Only Video files are allowed"), false)
    }
    cb(null, true)
  }

  const sizeInMB = 100
  const maxSize = sizeInMB * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
  }).fields([
    { name: imageFile1, maxCount: 1 },
    { name: imageFile2, maxCount: 1 },
    { name: videoFile, maxCount: 1 },
  ])

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }
      // if (!req.files && !err) {
      //   return res.status(400).send({
      //     message: "Please select files to upload",
      //   });
      // }
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10MB",
          })
        }
        return res.send(400).send(err)
      }
      return next()
    })
  }
}
