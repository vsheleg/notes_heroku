import React, { useState, useEffect, useCallback } from "react";
import { Redirect, useParams } from "react-router-dom";
import noteService from "../services/note.service";
import "../components/NoteList/Note/Note.css";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { IconButton } from "@material-ui/core";
import "./NotePage.css";

export default function NotePage({ onDefineHeader }) {
  const [redirect, setRedirect] = useState(false);
  const [content, setContent] = useState("");
  const { id, typeOfNotes } = useParams();
  onDefineHeader("/shared-note");

  const updateItems = () => {
    noteService.loadNote(id, typeOfNotes).then(setContent);
  };

  useEffect(() => {
    updateItems();
  }, []);

  function returnToNotes() {
    setRedirect(true);
  }
  if (redirect) {
    const link =
      "https://notes-app0.herokuapp.com/shared-note/:id/:typeOfNotes";
    let text = document.createElement("textarea");
    document.body.appendChild(text);
    text.value = link;
    text.select();
    document.execCommand("copy");
    document.body.removeChild(text);
  }
  return (
    <div className="shared-note">
      <div className="note-section">
        <div className="note">
          <span id="title">{id}</span>
          <hr id="title-line" />
          <div className="note-content"> {content}</div>
        </div>
      </div>
      <IconButton
        size="medium"
        variant="outlined"
        color="primary"
        onClick={returnToNotes}
      >
        <KeyboardReturnIcon />
      </IconButton>
    </div>
  );
}
