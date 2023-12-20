// index.js

const express = require("express");
const bodyParser = require("body-parser");
// const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname))

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

let todos = [
  { id: 1, text: "Learn Node.js", done: false },
  { id: 2, text: "Build a ToDo app", done: true },
];

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Get a specific todo by ID
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Create a new todo
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Update a todo by ID
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;

  todos = todos.map((todo) => (todo.id === todoId ? { ...todo, ...updatedTodo } : todo));

  res.json({ message: "Todo updated successfully" });
});

// Delete a todo by ID
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);

  res.json({ message: "Todo deleted successfully" });
});

module.exports = app;
