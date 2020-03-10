const repository = require("../repositories/note.repository");

function editNote(body, noteId, typeOfNotes, user) {
  return repository.editNote(body, noteId, typeOfNotes, user);
}

function deleteNote(noteId, typeOfNotes, user) {
  return repository.deleteNote(noteId, typeOfNotes, user);
}

function addNote(body, typeOfNotes, user) {
  return repository.addNote(body, typeOfNotes, user);
}
function readNote(noteId, typeOfNotes, user) {
  return repository.readNote(noteId, typeOfNotes, user);
}
function getNotes(typeOfNotes, user) {
  return repository.getNotes(typeOfNotes, user);
}

module.exports = { editNote, deleteNote, addNote, readNote, getNotes };
