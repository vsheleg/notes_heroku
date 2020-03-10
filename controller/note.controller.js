const service = require("../services/note.service");

async function addNote(req, res) {
  const { typeOfNotes } = req.params;
  const result = await service.addNote(req.body, typeOfNotes, req.user);
  res.send({ note: result });
}

async function deleteNote(req, res) {
  const { typeOfNotes } = req.params;
  const { noteId } = req.params;
  const result = await service.deleteNote(noteId, typeOfNotes, req.user);
  res.send({ note: result });
}

async function editNote(req, res) {
  const { typeOfNotes } = req.params;
  const { noteId } = req.params;
  const result = await service.editNote(
    req.body,
    noteId,
    typeOfNotes,
    req.user
  );
  res.send({ note: result });
}

async function getNotes(req, res) {
  const { typeOfNotes } = req.params;
  let notes = await service.getNotes(typeOfNotes, req.user);
  notes = notes.map(note => {
    return note.id;
  });
  res.end(JSON.stringify(notes));
}
async function readNote(req, res) {
  const { typeOfNotes } = req.params;
  const { noteId } = req.params;
  let note = await service.readNote(noteId, typeOfNotes, req.user);
  res.end(JSON.stringify([note.note_content]));
}

module.exports = { getNotes, readNote, addNote, deleteNote, editNote };
