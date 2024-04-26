const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// Conexión a la base de datos MongoDB
const MONGO_URI = process.env.MONGO_URI;
const dbName = "storeDB";
const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI, { dbName });
    console.log("Conexión a la base de datos de mongodb/storeDB establecida");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

const productoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagenes: [{ type: String }],
});

const Producto = mongoose.model("Producto", productoSchema);
// const Producto = mongoose.model("Producto", new mongoose.Schema({}));

// const uploadDir = "public/uploads/";
const uploadDir = path.join(__dirname, "public/uploads");

// Verifica si la carpeta de destino existe, si no, la crea
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configura Multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Ruta para manejar el formulario de categoría
app.post("/api/productos/crear", upload.array("imagenes"), async (req, res) => {
  try {
    // Extrae los campos del formulario
    const { categoria, nombre, precio } = req.body;

    // Crea una nueva categoría en la base de datos
    const nuevaCategoria = new Producto({
      categoria,
      nombre,
      precio,
      imagenes: req.files.map((file) => file.filename), // Guarda los nombres de las imágenes
    });

    // Guarda la nueva categoría en la base de datos
    await nuevaCategoria.save();

    res.status(201).json({ mensaje: "Categoría creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

// Ruta para obtener todas las categorías
app.get("/api/productos", async (req, res) => {
  try {
    const categorias = await Producto.find();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// Ruta para eliminar una categoría por su ID
app.delete("/api/productos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const categoriaEliminada = await Producto.findByIdAndDelete(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
});

// Ruta para actualizar una categoría por su ID
app.put("/api/productos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { categoria, nombre, precio } = req.body;
    const categoriaActualizada = await Producto.findByIdAndUpdate(id, { categoria, nombre, precio }, { new: true });
    if (!categoriaActualizada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
});

// Ruta para obtener solo las categorías según la opción proporcionada
app.get("/api/productos/:categoria", async (req, res) => {
  try {
    // Obtiene la opción proporcionada desde los parámetros de la ruta
    const categoria = req.params.categoria;

    // Consulta la base de datos para encontrar las categorías según la opción proporcionada
    const categorias = await Producto.find({ categoria: categoria });

    // Envía las categorías encontradas como respuesta
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// ========== login... ==========
app.use(express.urlencoded({ extended: true }));

let USER1 = process.env.USER1;
let PASSWORD1 = process.env.PASSWORD1;
console.log({ USER1: USER1, PASSWORD1: PASSWORD1 });

const users = [{ USER1: USER1, PASSWORD1: PASSWORD1 }];
const loginAttempts = {}; // Objeto para mantener un registro de los intentos de inicio de sesión por dirección IP

app.get("/admin", (req, res) => {
  const ip = req.ip; // Obtener la dirección IP del cliente

  // Verificar si ya ha excedido el límite de intentos por IP
  if (loginAttempts[ip] >= 2 && Date.now() - loginAttempts[ip + "_timestamp"] < 30 * 1000) {
    return res.send("Por favor, espera 30 minutos antes de intentarlo de nuevo.");
  }
  res.sendFile(path.join(__dirname, "/private/login.html"));
});

app.post("/admin", (req, res) => {
  const ip = req.ip; // Obtener la dirección IP del cliente
  const { username, password } = req.body;
  const user = users.find((u) => u.USER1 === username && u.PASSWORD1 === password);

  // Verificar si ya ha excedido el límite de intentos por IP
  if (loginAttempts[ip] >= 2 && Date.now() - loginAttempts[ip + "_timestamp"] < 30 * 1000) {
    return res.send("Por favor, espera 30 minutos antes de intentarlo de nuevo.");
  }

  if (user) {
    // Restablecer el contador de intentos si el inicio de sesión es exitoso
    loginAttempts[ip] = 0;
    const adminPath = path.join(__dirname, "private", "admin.html");
    res.sendFile(adminPath);
  } else {
    // Incrementar el contador de intentos si el inicio de sesión falla
    loginAttempts[ip] = (loginAttempts[ip] || 0) + 1;
    loginAttempts[ip + "_timestamp"] = Date.now();
    res.send("Inicio de sesión fallido");
  }
  console.log(loginAttempts);
});
// ========== login. ==========

// Puerto en el que escucha el servidor
// const PORT = process.env.PORT || 3000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
//   });
// });

connectDB();
module.exports = app;
