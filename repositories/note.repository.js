let model = require("../db/index");

async function deleteNote(noteId, typeOfNotes, user) {
  if (typeOfNotes === "all") {
    return await model.Notes.destroy({
      where: {
        id: noteId
      }
    });
  } else {
    const personModel = await model.getPersonalNotes(user);
    return await personModel.destroy({
      where: {
        id: noteId
      }
    });
  }
}
async function editNote(body, noteId, typeOfNotes, user) {
  if (typeOfNotes === "all") {
    return await model.Notes.update(
      { note_content: body.val },
      { where: { id: noteId } }
    );
  } else {
    const personModel = await model.getPersonalNotes(user);
    return await personModel.update(
      { note_content: body.val },
      { where: { id: noteId } }
    );
  }
}
async function addNote(body, typeOfNotes, user) {
  if (typeOfNotes === "all") {
    return await model.Notes.create({
      note_content: body.value
    });
  } else {
    const personModel = await model.getPersonalNotes(user);
    return await personModel.create({
      note_content: body.value
    });
  }
}
async function getNotes(typeOfNotes, user) {
  if (typeOfNotes === "all") {
    return await model.Notes.findAll({ raw: true });
  } else {
    const personModel = await model.getPersonalNotes(user);
    return await personModel.findAll({ raw: true });
  }
}
async function readNote(noteId, typeOfNotes, user) {
  if (typeOfNotes === "all") {
    return await model.Notes.findOne({ where: { id: noteId } });
  } else {
    const personModel = await model.getPersonalNotes(user);
    return await personModel.findOne({ where: { id: noteId } });
  }
}

module.exports = { getNotes, readNote, addNote, deleteNote, editNote };
