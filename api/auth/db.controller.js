const AuthModel = require("./helpers/db.model");
const fs = require("fs");
const path = require("path");

class DBController {
  async download_backup(req, res) {
    try {
      const { fileName } = req.params;
      const backupDir = path.join(__dirname, "backups"); // Adjust the path as needed
      const filePath = path.join(backupDir, fileName);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("Error while sending the file:", err);
          res.status(500).json({ error: "Could not download the file" });
        }
      });
    } catch (error) {
      console.error("Error in download_backup:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async backup_create(req, res) {
    try {
      const findAll = await AuthModel.find().sort({ _id: -1 });
      const documentCount = findAll.length; // Cantidad de documentos
      const newDate = new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(2, 14);
      // Guardar las notas en un archivo local
      // Define el directorio y archivo del respaldo
      // Acceder al nombre del modelo
      const modelName = AuthModel.modelName;
      const backupDir = path.resolve(__dirname, "backups"); // Carpeta "backups" dentro de tu proyecto
      const backupPath = path.join(backupDir, `backup-${modelName}-${documentCount}-${newDate}.json`);
      // Asegúrate de que el directorio existe
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      // Escribe el archivo
      fs.writeFileSync(backupPath, JSON.stringify(findAll, null, 2), "utf-8");
      res.status(200).json({ message: "Respaldo creado con éxito", backupPath });
    } catch (error) {
      console.error("Error en el respaldo:", error);
      res.status(500).json({ error: "Error al crear el respaldo" });
    }
  }

  async backup_list(req, res) {
    const backupDir = path.resolve(__dirname, "backups");
    // Verificar si el directorio de respaldos existe
    if (!fs.existsSync(backupDir)) {
      return res.status(404).json({ error: "El directorio de respaldos no existe" });
    }
    // Leer los archivos del directorio
    fs.readdir(backupDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer el directorio de respaldos" });
      }
      // Filtrar solo los archivos .json (si solo quieres listar los archivos de respaldo)
      const backupFiles = files.filter((file) => file.endsWith(".json"));
      // Si no hay archivos de respaldo
      if (backupFiles.length === 0) {
        return res.status(404).json({ message: "No se encontraron archivos de respaldo" });
      }
      // Devolver la lista de archivos de respaldo
      res.status(200).json({ backupFiles });
    });
  }

  async backup_restore_upload(req, res) {
    try {
      const backupPath = req.file.path;
      // Leer y parsear los datos del respaldo
      const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
      await AuthModel.deleteMany({});
      // Restaurar los datos en la base de datos
      const inserted = await AuthModel.insertMany(backupData, { ordered: true });
      // Eliminar el archivo subido para evitar acumulación
      fs.unlinkSync(backupPath);
      res.status(200).json({
        message: "Restauración completada con éxito",
        restoredCount: inserted.length,
      });
    } catch (error) {
      console.error("Error durante la restauración:", error);
      res.status(500).json({ error: "Error al restaurar los datos" });
    }
  }

  async backup_restore_filename(req, res) {
    try {
      const { fileName } = req.params;
      // Ruta del archivo de respaldo (puedes ajustar esto según tu configuración)
      const backupPath = path.resolve(__dirname, "backups", fileName);
      // Verificar si el archivo existe
      if (!fs.existsSync(backupPath)) {
        return res.status(404).json({ error: "Archivo de respaldo no encontrado" });
      }
      // Leer los datos del archivo de respaldo
      const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
      await AuthModel.deleteMany({});
      // Restaurar los datos en la base de datos
      const inserted = await AuthModel.insertMany(backupData, { ordered: true });
      res.status(200).json({
        message: "Restauración completada con éxito",
        restoredCount: inserted.length,
      });
    } catch (error) {
      console.error("Error durante la restauración:", error);
      res.status(500).json({ error: "Error al restaurar los datos" });
    }
  }

  async backup_delete_filename(req, res) {
    const { filename } = req.params;
    const backupPath = path.join(__dirname, "backups", filename);
    // Verificar si el archivo existe
    fs.stat(backupPath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({ error: "Archivo no encontrado" });
      }
      // Eliminar el archivo
      fs.unlink(backupPath, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al eliminar el archivo" });
        }
        res.status(200).json({ message: `El archivo ${filename} ha sido eliminado correctamente` });
      });
    });
  }
}

module.exports = new DBController();
