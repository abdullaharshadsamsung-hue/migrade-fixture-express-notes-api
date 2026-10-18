// In-memory store for notes.
let nextId = 1;
const notes = new Map();

function list() {
  return [...notes.values()];
}

function get(id) {
  return notes.get(id) || null;
}

function create({ title, body = "" }) {
  const note = { id: nextId++, title, body };
  notes.set(note.id, note);
  return note;
}

function update(id, fields) {
  const note = notes.get(id);
  if (!note) return null;
  Object.assign(note, fields);
  return note;
}

function remove(id) {
  return notes.delete(id);
}

module.exports = { list, get, create, update, remove };
