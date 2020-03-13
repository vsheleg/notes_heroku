const repository = require("../repositories/note.repository");

function editNote(body, noteId, user) {
  return repository.editNote(body, noteId, user);
}

function deleteNote(noteId, user) {
  return repository.deleteNote(noteId, user);
}

function addNote(body, user) {
  return repository.addNote(body, user);
}
function readNote(noteId, user) {
  return repository.readNote(noteId, user);
}
function getNotes(user) {
  return repository.getNotes(user);
}

module.exports = { editNote, deleteNote, addNote, readNote, getNotes };
