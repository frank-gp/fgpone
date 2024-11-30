const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Definir el directorio de carga
const backupDir = path.resolve(__dirname, "..", "backups");

// Verificar si el directorio de carga 'backups' existe, si no, crearlo
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Configurar multer para mantener la extensión del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, backupDir); // Directorio de carga
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Obtener la extensión del archivo
    const filename = file.originalname; // Mantener el nombre original
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Exportar el middleware
module.exports = upload.single("file");
