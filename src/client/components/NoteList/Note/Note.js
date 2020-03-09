import React, { useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import noteService from "../../../services/note.service";
import Button from "@material-ui/core/Button";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import "typeface-roboto";
import "./Note.css";
import "../../../pages/signup/signup.css";

export default function Note({ note, onDelete }) {
  const [editInput, setEditInput] = useState(false);
  const [content, setContent] = useState("");
  const textInput = useRef(null);
  document.title = "Notes";

  const updateItems = () => {
    noteService.loadNote(note).then(setContent);
  };

  useEffect(() => {
    updateItems();
  }, [editInput]);

  function deleteItem() {
    onDelete(note);
  }

  async function editItem() {
    if (editInput) {
      const newValue = textInput.current.value;
      await noteService.editNote({ val: newValue }, note);
      setContent(newValue);
      setEditInput(false);
    } else {
      setEditInput(true);
    }
  }

  return (
    <div>
      <div className="note">
        <span id="title">{note}</span>
        <hr id="title-line" />
        <div className="note-content">{content}</div>

        <ButtonGroup
          id="button-group"
          variant="contained"
          color="primary"
          edge="end"
          aria-label="contained primary button group"
          size="small"
        >
          <IconButton
            className="icon-button"
            edge="end"
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
        </ButtonGroup>
        {editInput ? (
          <input type="text" name="editNote" id="editNote" ref={textInput} />
        ) : null}
      </div>
    </div>
  );
}
