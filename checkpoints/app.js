const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const preguntas = require("./data");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Función para seleccionar 3 preguntas aleatorias
function seleccionarPreguntasAleatorias(array, cantidad) {
  const preguntasAleatorias = [];
  const copiaArray = [...array];
  for (let i = 0; i < cantidad; i++) {
    const indiceAleatorio = Math.floor(Math.random() * copiaArray.length);
    preguntasAleatorias.push(copiaArray.splice(indiceAleatorio, 1)[0]);
  }
  return preguntasAleatorias;
}

// Ruta para mostrar el formulario de preguntas
app.get("/", (req, res) => {
  // Seleccionar 3 preguntas aleatorias
  const preguntasAleatorias = seleccionarPreguntasAleatorias(preguntas, 3);
  res.render("index", { preguntas: preguntasAleatorias });
});

// Ruta para manejar la comprobación de respuestas
app.post("/comprobar", (req, res) => {
  const respuestasUsuario = req.body;
  console.log(respuestasUsuario);
  let puntaje = 0;

  // Iterar sobre las respuestas del usuario y compararlas con las respuestas correctas
  for (const preguntaId in respuestasUsuario) {
    const respuestaUsuario = respuestasUsuario[preguntaId];
    const pregunta = preguntas.find((pregunta) => pregunta.id === parseInt(preguntaId));
    if (pregunta && respuestaUsuario === pregunta.respuestaCorrecta) {
      puntaje++;
    }
  }

  // Renderizar la vista de resultados con el puntaje obtenido
  // res.render('resultados', { puntaje });
  res.json({ puntaje });
  // res.json(respuestasUsuario);
});

module.exports = app;
