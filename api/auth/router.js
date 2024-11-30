const express = require("express");
const Controller = require("./controller");
const DBController = require("./db.controller");
const uploadMiddleware = require("../utils/uploadMiddleware"); // Importar el middleware
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/login", Controller.login);

router.use(verifyToken);

router.post("/create", Controller.create);
router.get("/findAll", Controller.findAll);
router.get("/findOne/:id", Controller.findOne);
router.get("/search", Controller.searchQuery);
router.get("/findOneEmail/:param", Controller.findOneEmail);
router.put("/update/:id", Controller.update);
router.delete("/remove/:id", Controller.remove);
router.delete("/deleteMany", Controller.deleteMany);

router.get("/download/:fileName", DBController.download_backup);
router.post("/backup_create", DBController.backup_create);
router.post("/backup_list", DBController.backup_list);
router.post("/backup_restore_upload", uploadMiddleware, DBController.backup_restore_upload);
router.post("/backup_restore/:fileName", DBController.backup_restore_filename);
router.delete("/backup_delete/:filename", DBController.backup_delete_filename);

module.exports = router;
