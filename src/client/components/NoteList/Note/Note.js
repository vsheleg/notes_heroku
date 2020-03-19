import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import noteService from "../../../services/note.service";
import { Popover } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import DoneIcon from "@material-ui/icons/Done";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import "typeface-roboto";
import "./Note.css";
import "../../../pages/signup/signup.css";

export default function Note({ note, onDelete, typeOfNotes, access, type }) {
  const [editInput, setEditInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(false);
  const editInputRef = useRef(null);
  const iconRef = useRef();
  document.title = "Notes";
  console.log("content is " + content);
  console.log(editInput);
  const updateItems = () => {
    noteService.loadNote(note).then(response => {
      setContent(response.content);
      setTitle(response.title);
    });
  };
  useEffect(() => {
    updateItems();
  }, [editInput, typeOfNotes, type, note]);

  function deleteItem() {
    onDelete(note, title);
  }
  function shareNote() {
    setAnchorEl(iconRef.current);
    const link = `https://notes-app0.herokuapp.com/${note}`;
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = link;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setTimeout(closePopover, 500);
  }
  function closePopover() {
    setAnchorEl(null);
  }
  function closeEditItem() {
    setEditInput(false);
  }
  function showEditItem() {
    setEditInput(true);
  }
  /*function onEditChange(e) {
    const { value } = e.target;
    setContent(value);
  }
*/
  async function editItem() {
    console.log(editInput);
    const newValue = editInputRef.current.value;

    await noteService.editNote({ val: newValue }, note);
    setContent(newValue);
    closeEditItem();
    console.log(editInput);
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
  if (type === "preview") {
    return (
      <div className="note-section">
        <div className="note">
          <span id="title">{title || note}</span>
          <hr id="title-line" />
          {editInput ? (
            <div>
              <div className="note-content">
                <input
                  type="text"
                  placeholder="Enter new note"
                  name="editNote"
                  id="editNote"
                  ref={editInputRef}
                />
              </div>
              <ButtonGroup
                variant="contained"
                color="primary"
                size="small"
                aria-label="contained primary button group"
              >
                <IconButton edge="end" className="edit-icon" onClick={editItem}>
                  <DoneIcon size="small" color="primary" />
                </IconButton>
                <IconButton
                  edge="end"
                  className="edit-icon"
                  onClick={closeEditItem}
                >
                  <CloseSharpIcon color="error" size="small" />
                </IconButton>
              </ButtonGroup>
            </div>
          ) : (
            <div>
              <div className="note-content">{content}</div>
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
                  ref={iconRef}
                  onClick={shareNote}
                  className="icon-button"
                  color="default"
                  edge="end"
                  name="share"
                >
                  <ShareIcon />
                  <Popover
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
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
                </IconButton>
              </ButtonGroup>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="fullscreen-note">
      <span id="fullscreen-title">{title || note}</span>
      <hr />
      {editInput ? (
        <div>
          <div className="fullscreen-content">
            <input
              type="text"
              placeholder="Enter new note"
              name="editNote"
              id="editNote"
              autoFocus
              ref={editInputRef}
            />
          </div>

          <ButtonGroup
            variant="contained"
            color="primary"
            size="small"
            aria-label="contained primary button group"
          >
            <IconButton edge="end" className="edit-icon" onClick={editItem}>
              <DoneIcon size="small" color="primary" />
            </IconButton>
            <IconButton
              edge="end"
              className="edit-icon"
              onClick={closeEditItem}
            >
              <CloseSharpIcon color="error" size="small" />
            </IconButton>
          </ButtonGroup>
        </div>
      ) : (
        <div>
          <div className="fullscreen-content">{content}</div>
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
              ref={iconRef}
              onClick={shareNote}
              className="icon-button"
              color="default"
              edge="end"
              name="share"
            >
              <ShareIcon />
              <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
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
            </IconButton>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}
