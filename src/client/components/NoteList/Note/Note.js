import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import noteService from "../../../services/note.service";
import { Popover } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { Modal } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import "typeface-roboto";
import "./Note.css";
import "../../../pages/signup/signup.css";

export default function Note({ note, onDelete, typeOfNotes, access }) {
  const [editInput, setEditInput] = useState(false);
  const [content, setContent] = useState("");
  const [popover, setPopover] = useState(false);
  const [title, setTitle] = useState(false);
  const editInputRef = useRef(null);
  document.title = "Notes";
  console.log(popover);
  const updateItems = () => {
    noteService.loadNote(note).then(response => {
      setContent(response.content);
      setTitle(response.title);
    });
  };

  useEffect(() => {
    updateItems();
  }, [editInput, typeOfNotes, popover, title]);

  function deleteItem() {
    onDelete(note);
  }
  function shareNote() {
    setPopover(true);
    const link = `https://notes-app0.herokuapp.com/shared-note/${note}`;
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = link;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
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

  if (!access) {
    return (
      <div className="note-section">
        <div className="note">
        <span id="title">{title || note}</span>
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
          <span id="title">{title || note}</span>
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
              <DoneIcon
                className="addNoteInput"
                color="primary"
                onClick={editItem}
              />
            </IconButton>
            <IconButton edge="end">
              <CloseSharpIcon
                color="error"
                className="closeEditItem"
                onClick={closeEditItem}
              />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
    );
  }
  return (
    <div className="note-section">
      <div className="note">
        <span id="title">{title || note}</span>
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
            {popover ? (
              <Modal>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                >
                  Copied!
                </Popover>
              </Modal>
            ) : null}
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
