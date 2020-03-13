let model = require("../db/index");

async function deleteNote(noteId) {
  return await model.Notes.destroy({
    where: {
      id: noteId
    }
  });
}
async function editNote(body, noteId) {
  return await model.Notes.update(
    { note_content: body.val },
    { where: { id: noteId } }
  );
}
async function addNote(body, author) {
  if (author) {
    const user = await model.User.findOne({ where: { email: author.email } });
    if (body.privacy === "personal") {
      //if note added for all or only for user
      return await model.Notes.create({
        note_content: body.value,
        privacy: true,
        author: user.user_id
      });
    } else {
      return await model.Notes.create({
        note_content: body.value,
        privacy: false
      });
    }
  } else {
    return await model.Notes.create({
      note_content: body.value,
      privacy: false
    });
  }
}
async function getNotes(author) {
  const commonNotes = await model.Notes.findAll({ where: { privacy: false } });
  if (author) {
    const user = await model.User.findOne({ where: { email: author.email } });
    const personalNotes = await model.Notes.findAll({
      where: { author: user.user_id }
    });
    return await { personalNotes, commonNotes };
  } else {
    return await { commonNotes };
  }
}
async function readNote(noteId) {
  return await model.Notes.findOne({ where: { id: noteId } });
}

module.exports = { getNotes, readNote, addNote, deleteNote, editNote };
