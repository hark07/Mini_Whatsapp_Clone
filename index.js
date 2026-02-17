const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Redirect root
app.get("/", (req, res) => res.redirect("/chats"));

// Show all chats
app.get("/chats", async (req, res) => {
  const chats = await Chat.find().sort({ created_at: 1 });
  res.render("index", { chats });
});

// New chat form
app.get("/chats/new", (req, res) => {
  res.render("new");
});

// Create new chat
app.post("/chats", async (req, res) => {
  const { from, to, msg } = req.body;
  await Chat.create({ from, to, msg, created_at: new Date() });
  res.redirect("/chats");
});

// Send message from main input (fixed sender/receiver demo)
app.post("/chats/send", async (req, res) => {
  const { msg } = req.body;
  await Chat.create({ from: "Harish", to: "Janak", msg, created_at: new Date() });
  res.redirect("/chats");
});

// Show edit form
app.get("/chats/:id/edit", async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.render("edit", { chat });
});

// Update chat
app.post("/chats/:id/update", async (req, res) => {
  const { msg } = req.body;
  await Chat.findByIdAndUpdate(req.params.id, { msg });
  res.redirect("/chats");
});

// Delete chat
app.post("/chats/:id/delete", async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  res.redirect("/chats");
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
