const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------- TEST ---------- */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ---------- CRUD ---------- */

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(tasks);
});

// CREATE task
app.post("/api/tasks", async (req, res) => {
  const task = await prisma.task.create({
    data: req.body
  });
  res.json(task);
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.task.delete({
    where: { id }
  });

  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updated = await prisma.task.update({
      where: { id },
      data: req.body
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});