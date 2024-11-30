const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Carpeta temporal para subir archivos

const notepadRouter = express.Router();

// Configurar multer para mantener la extensión del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "backups")); // Directorio de carga
  },
  filename: function (req, file, cb) {
    // Usar el nombre original del archivo y mantener la extensión
    const ext = path.extname(file.originalname); // Obtener la extensión del archivo
    const filename = file.originalname; // Mantener el nombre original
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const shortenerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true }, // shortUrl personalizado
  visitCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// const ShortenerModel = mongoose.model("shortener", shortenerSchema);
const Url = mongoose.model("shortener", shortenerSchema);

// ==========  ==========

notepadRouter.post("/shorten", async (req, res) => {
  const { originalUrl, shortUrl } = req.body;

  if (!originalUrl || !shortUrl) {
    return res.status(400).json({ error: "La URL original y el shortUrl son requeridos" });
  }

  try {
    // Verificar si el shortUrl ya está en uso
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(400).json({ error: "El shortUrl ya está en uso" });
    }

    const _id =
      req.body._id ||
      new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(2, 14); // Generar _id si no existe en el cuerpo

    // Almacenar la URL en la base de datos
    const url = new Url({ originalUrl, shortUrl, _id });
    await url.save();

    res.status(201).json({
      originalUrl,
      shortUrl: `http://localhost:3000/${shortUrl}`, // El enlace acortado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al acortar la URL" });
  }
});

notepadRouter.get("/stats/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Buscar la URL en la base de datos
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL no encontrada" });
    }

    res.json({ shortUrl, visitCount: url.visitCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las estadísticas" });
  }
});

notepadRouter.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Buscar la URL en la base de datos
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL no encontrada" });
    }

    // Incrementar el contador de visitas
    url.visitCount += 1;
    await url.save();

    // Redirigir a la URL original
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al redirigir a la URL" });
  }
});

// ==========  ==========

notepadRouter.get("/", async (req, res) => {
  try {
    const find = await Url.find().sort({ _id: -1 });
    res.status(200).json(find);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las notas" });
  }
});

// Buscar notas cuyo ID comience con un texto específico y ordenarlas en orden descendente
notepadRouter.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params; // Obtener el parámetro "query" de la URL

    // Buscar notas cuyo ID comience con el texto proporcionado y ordenarlas en orden descendente
    const matchingNotes = await Url.find({
      _id: { $regex: `^${query}`, $options: "i" }, // Buscando por _id
    }).sort({ _id: -1 }); // Ordenar en orden descendente por _id

    if (!matchingNotes || matchingNotes.length === 0) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.status(200).json(matchingNotes);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la nota por ID" });
  }
});

notepadRouter.get("/backups-list", (req, res) => {
  const backupDir = path.resolve(__dirname, "backups"); // Asegúrate de que esta sea la ruta correcta

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
});

notepadRouter.get("/backup", async (req, res) => {
  try {
    const notes = await Url.find().sort({ _id: -1 });
    // const backupPath = `backup-notes-${new Date().toISOString()}.json`;
    const newDate = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(2, 14);

    // Guardar las notas en un archivo local
    // Define el directorio y archivo del respaldo
    const backupDir = path.resolve(__dirname, "backups"); // Carpeta "backups" dentro de tu proyecto
    const backupPath = path.join(backupDir, `backup-notes-${newDate}.json`);

    // Asegúrate de que el directorio existe
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Escribe el archivo
    fs.writeFileSync(backupPath, JSON.stringify(notes, null, 2), "utf-8");
    res.status(200).json({ message: "Respaldo creado con éxito", backupPath });
  } catch (error) {
    console.error("Error en el respaldo:", error);
    res.status(500).json({ error: "Error al crear el respaldo" });
  }
});

// Obtener una nota por ID
notepadRouter.get("/:id", async (req, res) => {
  try {
    const note = await Url.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la nota" });
  }
});

notepadRouter.post("/", async (req, res) => {
  try {
    const reqBody = req.body;

    // Verificar si el _id está presente en el cuerpo de la solicitud, si no, generarlo automáticamente
    const _id =
      reqBody._id ||
      new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(2, 14); // Generar _id si no existe en el cuerpo

    // Crear la nota con el _id (proporcionado o generado)
    const noteCreated = await Url.create({ ...reqBody, _id });

    res.status(201).json(noteCreated);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la nota" });
  }
});

notepadRouter.post("/restore/multer", upload.single("backup"), async (req, res) => {
  try {
    const backupPath = req.file.path; // Ruta temporal del archivo subido
    console.log("req.file", req.file);
    // Leer y parsear los datos del respaldo
    const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));

    await Url.deleteMany({});

    // Restaurar los datos en la base de datos
    const inserted = await Url.insertMany(backupData, { ordered: true });

    // Eliminar el archivo subido para evitar acumulación
    // fs.unlinkSync(backupPath);

    res.status(200).json({
      message: "Restauración completada con éxito",
      restoredCount: inserted.length,
    });
  } catch (error) {
    console.error("Error durante la restauración:", error);
    res.status(500).json({ error: "Error al restaurar los datos" });
  }
});

notepadRouter.post("/restore/:fileName", async (req, res) => {
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

    await Url.deleteMany({});
    // Restaurar los datos en la base de datos
    const inserted = await Url.insertMany(backupData, { ordered: true });

    res.status(200).json({
      message: "Restauración completada con éxito",
      restoredCount: inserted.length,
    });
  } catch (error) {
    console.error("Error durante la restauración:", error);
    res.status(500).json({ error: "Error al restaurar los datos" });
  }
});

// Actualizar una nota por ID
notepadRouter.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Url.findByIdAndUpdate(req.params.id, { title, content }, { new: true, runValidators: true });
    if (!updatedNote) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la nota" });
  }
});

// Eliminar todas las notas
notepadRouter.delete("/delete-all", async (req, res) => {
  console.log("delete-all");
  try {
    const result = await Url.deleteMany({});
    res.json({ message: "Todas las notas han sido eliminadas", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar todas las notas" });
  }
});

notepadRouter.delete("/backup/:filename", (req, res) => {
  const { filename } = req.params; // Obtener el nombre del archivo desde la URL
  const backupPath = path.join(__dirname, "backups", filename); // Construir la ruta completa del archivo

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
});

// Eliminar una nota por ID
notepadRouter.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Url.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la nota" });
  }
});

module.exports = notepadRouter;
