const express = require("express");
const shortenerController = require("./shortener.controller");
const ShortenerDBController = require("./shortener.db.controller");
const uploadMiddleware = require("./helpers/uploadMiddleware"); // Importar el middleware

const router = express.Router();

router.post("/create", shortenerController.create);
router.get("/findAll", shortenerController.findAll);
router.get("/findOne/:id", shortenerController.findOne);
router.get("/search/:query", shortenerController.searchQuery);
router.put("/update/:id", shortenerController.update);
router.delete("/remove/:id", shortenerController.remove);
router.delete("/deleteMany", shortenerController.deleteMany);

router.post("/reset_visit_count", shortenerController.reset_visit_count);
router.get("/findOneShortUrl/:shortUrl", shortenerController.findOneShortUrl);
router.get("/:shortUrl", shortenerController.redirect);

router.get("/download/:fileName", ShortenerDBController.download_backup);
router.post("/backup_create", ShortenerDBController.backup_create);
router.post("/backup_list", ShortenerDBController.backup_list);
router.post("/backup_restore_upload", uploadMiddleware, ShortenerDBController.backup_restore_upload);
router.post("/backup_restore/:fileName", ShortenerDBController.backup_restore_filename);
router.delete("/backup_delete/:filename", ShortenerDBController.backup_delete_filename);

module.exports = router;
