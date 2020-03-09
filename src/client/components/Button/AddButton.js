import React, { useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";

import "./AddButton.css";
import { Input, ButtonGroup } from "@material-ui/core";

export default function AddButton({ onAdd }) {
  const textInputRef = useRef(null);

  function addNote() {
    onAdd(textInputRef.current.value);
  }
  return (
    <ButtonGroup
      className="buttonGroup"
      variant="contained"
      color="default"
      aria-label="contained default button group"
    >
      <Input
        variant="outlined"
        className="addNoteInput"
        name="addNote"
        inputRef={textInputRef}
        placeholder="Add new note"
        inputProps={{ "aria-label": "description" }}
      />

      <IconButton id="outlined-basic" color="primary" onClick={addNote}>
        <PostAddIcon />
      </IconButton>
    </ButtonGroup>
  );
}
