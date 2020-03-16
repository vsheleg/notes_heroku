import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import noteService from "../../../services/note.service";
import ShareIcon from "@material-ui/icons/Share";
import DoneIcon from "@material-ui/icons/Done";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import "typeface-roboto";
import "./Note.css";
import "../../../pages/signup/signup.css";

export default function Note({ note, onDelete, typeOfNotes, access }) {
  const [editInput, setEditInput] = useState(false);
  const [redirect, setRedirect] = useState(false); //redirect to shared note
  const [content, setContent] = useState("");
  const editInputRef = useRef(null);
  document.title = "Notes";

  const updateItems = () => {
    noteService.loadNote(note).then(setContent);
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
  function closeEditItem() {
    setEditInput(false);
  }
  function showEditItem() {
    if (!editInput) {
      setEditInput(true);
    }
  }
  async function editItem() {
    const newValue = editInputRef.current.value;
    await noteService.editNote({ val: newValue }, note);
    setContent(newValue);
    setEditInput(false);
  }
  if (redirect) {
    const link = `https://notes-app0.herokuapp.com/shared-note/${note}`;
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
  if (editInput) {
    return (
      <div className="note-section">
        <div className="note">
          <span id="title">{note}</span>
          <hr id="title-line" />
          <div className="note-content">
            <input
              type="text"
              placeholder="Enter new note"
              name="editNote"
              id="editNote"
              autoFocus
              value={content}
              ref={editInputRef}
            />
          </div>
          <ButtonGroup
            variant="contained"
            color="primary"
            size="small"
            aria-label="contained primary button group"
          >
            <IconButton edge="end">
              <DoneIcon color="primary" onClick={editItem} />
            </IconButton>
            <IconButton edge="end">
              <CloseSharpIcon color="error" onClick={closeEditItem} />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
    );
  }
  return (
    <div className="note-section">
      <div className="note">
        <span id="title">{note}</span>
        <hr id="title-line" />
        <div className="note-content">{content}</div>
        <div id="button-group">
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
            size="small"
          >
            <IconButton
              className="icon-button"
              onClick={showEditItem}
              color="default"
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
