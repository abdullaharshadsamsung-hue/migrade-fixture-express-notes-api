const express = require("express");
const notes = require("./notes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/notes", (req, res) => res.json(notes.list()));

app.get("/notes/:id", (req, res) => {
  const note = notes.get(Number(req.params.id));
  if (!note) return res.status(404).json({ error: "not found" });
  res.json(note);
});

app.post("/notes", (req, res) => {
  const { title, body } = req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }
  res.status(201).json(notes.create({ title, body }));
});

app.put("/notes/:id", (req, res) => {
  const { title, body } = req.body || {};
  if (title !== undefined && (typeof title !== "string" || !title)) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  const note = notes.update(Number(req.params.id), { ...(title && { title }), ...(body !== undefined && { body }) });
  if (!note) return res.status(404).json({ error: "not found" });
  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  if (!notes.remove(Number(req.params.id))) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 8080;
  app.listen(port, "0.0.0.0", () => console.log(`listening on ${port}`));
}

module.exports = app;
