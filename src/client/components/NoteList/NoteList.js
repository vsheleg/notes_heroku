import React from "react";

import "./Note/Note.css";
import Note from "./Note/Note";

function NoteList({ notes, onDelete, onAdd, onEdit, typeOfNotes, access }) {
  const listNotes = notes.map(elem => (
    <li key={elem}>
      <Note
        note={elem}
        onDelete={onDelete}
        onAdd={onAdd}
        onEdit={onEdit}
        access={access}
        typeOfNotes={typeOfNotes}
      />
    </li>
  ));
  return <ul>{listNotes}</ul>;
}

export default NoteList;
