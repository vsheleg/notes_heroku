import React from "react";

import "./Note/Note.css";
import Note from "./Note/Note";

function NoteList({ notes, onDelete, onAdd, onEdit, access, type }) {
  const listNotes = notes.map(elem => (
    <li key={elem}>
      <Note
        type={type}
        note={elem}
        onDelete={onDelete}
        onAdd={onAdd}
        onEdit={onEdit}
        access={access}
      />
    </li>
  ));
  if (type === "fullscreen") {
    return (
      <Note
        type={type}
        note={notes[0]}
        onDelete={onDelete}
        onAdd={onAdd}
        onEdit={onEdit}
        access={access}
      />
    );
  } else {
    return <ul>{listNotes}</ul>;
  }
}

export default NoteList;
