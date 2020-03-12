import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import noteService from "../../../services/note.service";
import ShareIcon from "@material-ui/icons/Share";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import "typeface-roboto";
import "./Note.css";
import "../../../pages/signup/signup.css";

export default function Note({ note, onDelete, typeOfNotes, access }) {
  const [editInput, setEditInput] = useState(false);
  const [redirect, setRedirect] = useState(false); //redirect to shared note
  const [content, setContent] = useState("");
  const editDivRef = useRef(null);
  document.title = "Notes";

  const updateItems = () => {
    noteService.loadNote(note, typeOfNotes).then(setContent);
  };

  useEffect(() => {
    updateItems();
  }, [editInput, typeOfNotes]);

  function deleteItem() {
    onDelete(note);
  }
  function shareNote() {
    setRedirect(true);
  }

  async function editItem() {
    if (editInput) {
      const newValue = editDivRef.current.value;
      console.log(newValue);
      await noteService.editNote({ val: newValue }, note, typeOfNotes);
      setContent(newValue);
      setEditInput(false);
    } else {
      setEditInput(true);
    }
  }
  if (redirect) {
    const link = `https://notes-app0.herokuapp.com/shared-note/${note}/${typeOfNotes}`;
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = link;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  if (!access) {
    return (
      <div className="note-section">
        <div className="note">
          <span id="title">{note}</span>
          <hr id="title-line" />
          <div className="note-content">{content}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="note-section">
      <div className="note">
        <span id="title">{note}</span>
        <hr id="title-line" />
        <div className="note-content">
          {editInput ? (
            <input
              type="text"
              placeholder="Enter new note"
              name="editNote"
              id="editNote"
              ref={editDivRef}
            />
          ) : (
            content
          )}
        </div>
        <div id="button-group">
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
            size="small"
          >
            <IconButton
              className="icon-button"
              color="default"
              onClick={editItem}
              name="edit"
            >
              <EditTwoToneIcon />
            </IconButton>
            <IconButton
              className="icon-button"
              aria-label="delete"
              color="default"
              onClick={deleteItem}
              edge="end"
              name="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={shareNote}
              className="icon-button"
              color="default"
              edge="end"
              name="share"
            >
              <ShareIcon />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
