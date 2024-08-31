const express = require("express");
const upload = require("../controllers/posts/upload");
const del = require("../controllers/posts/delete");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// initialization
const postRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `../client/public`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});
const file_uploader = multer({ storage: storage });

postRouter.post("/upload", file_uploader.array("files", 5), upload);
postRouter.delete("/delete", del);

module.exports = postRouter;
