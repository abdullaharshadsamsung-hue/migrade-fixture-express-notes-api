const test = require("node:test");
const assert = require("node:assert");
const notes = require("../notes");

test("creates and fetches a note", () => {
  const created = notes.create({ title: "first" });
  assert.equal(notes.get(created.id).title, "first");
});

test("removing a missing note reports false", () => {
  assert.equal(notes.remove(9999), false);
});
