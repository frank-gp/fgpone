const express = require("express");
const shortenerController = require("./shortener.controller");
const ShortenerDBController = require("./shortener.db.controller");
const uploadMiddleware = require("./helpers/uploadMiddleware");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();
const routerShort = express.Router();
const routerDB = express.Router();

// ** Shortener Routes **
routerShort
  .post("/create", verifyToken, shortenerController.create)
  .get("/findAll", shortenerController.findAll)
  .get("/findOne/:id", shortenerController.findOne)
  .get("/search/:query", shortenerController.searchQuery)
  .put("/update/:id", verifyToken, shortenerController.update)
  .delete("/remove/:id", verifyToken, shortenerController.remove)
  .delete("/deleteMany", verifyToken, shortenerController.deleteMany)
  .post("/reset_visit_count", verifyToken, shortenerController.reset_visit_count)
  .get("/findOneShortUrl/:shortUrl", shortenerController.findOneShortUrl)
  .get("/:shortUrl", shortenerController.redirect);

// ** Shortener DB Routes **
routerDB.use(verifyToken); // Apply token verification for all DB routes
routerDB
  .get("/download/:fileName", ShortenerDBController.download_backup)
  .post("/backup_create", ShortenerDBController.backup_create)
  .post("/backup_list", ShortenerDBController.backup_list)
  .post("/backup_restore_upload", uploadMiddleware, ShortenerDBController.backup_restore_upload)
  .post("/backup_restore/:fileName", ShortenerDBController.backup_restore_filename)
  .delete("/backup_delete/:filename", ShortenerDBController.backup_delete_filename);

router.use("/private", routerDB);
router.use("/", routerShort);
module.exports = router;
