import React, { useState, useEffect, useRef } from "react";
import { Dialog, Button, IconButton } from "@material-ui/core";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import "./AddButton.css";
import {
  Input,
  ButtonGroup,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

export default function AddButton({ onAdd }) {
  const textInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const [dialog, setDialog] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  function addNote() {
    onAdd(
      {
        content: textInputRef.current.value,
        title: titleInputRef.current.value
      },
      privacy
    );
    setDialog(false);
  }
  function handleClose() {
    setDialog(false);
  }
  function handleClickModal() {
    setDialog(true);
  }
  function handleChange(event) {
    if (event.target.value === "private") {
      setPrivacy(true);
    } else {
      setPrivacy(false);
    }
  }
  return (
    <div>
      <Button
        startIcon={<PostAddOutlinedIcon />}
        color="primary"
        variant="contained"
        onClick={handleClickModal}
      >
        Add new note
      </Button>
      <Dialog open={dialog} className="modal">
        <DialogTitle>
          Add new note
          <IconButton
            color="primary"
            size="medium"
            className="closeModal"
            onClick={handleClose}
          >
            <CancelPresentationIcon />
          </IconButton>
        </DialogTitle>
        <RadioGroup aria-label="gender" name="privacy" onChange={handleChange}>
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="private"
          />
          <FormControlLabel value="public" control={<Radio />} label="public" />
        </RadioGroup>
        <Input
          variant="outlined"
          name="addNote"
          inputRef={titleInputRef}
          className="add-button"
          placeholder="Add title"
          inputProps={{ "aria-label": "description" }}
        />
        <Input
          variant="outlined"
          name="addNote"
          inputRef={textInputRef}
          className="add-button add-content"
          placeholder="Add new note"
          inputProps={{ "aria-label": "description" }}
        />
        <IconButton id="outlined-basic" color="primary" onClick={addNote}>
          <PostAddIcon />
        </IconButton>
      </Dialog>
    </div>
  );
}
