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
  Popover,
  Radio,
  TextareaAutosize,
  TextField,
  Checkbox
} from "@material-ui/core";

export default function AddButton({ onAdd }) {
  const [anchorContentEl, setAnchorContentEl] = useState(null);
  const [anchorRadioEl, setAnchorRadioEl] = useState(null);
  const [anchorTitleEl, setAnchorTitleEl] = useState(null);
  const textInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const radioPublicRef = useRef(null);
  const checkboxRef = useRef(null);
  const radioPrivateRef = useRef(null);
  const [dialog, setDialog] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  function addNote() {
    if (validatePrivacy() && validateTextFields()) {
      onAdd(
        {
          content: textInputRef.current.value,
          title: titleInputRef.current.value
        },
        privacy
      );
      setDialog(false);
    }
  }
  function handleClose() {
    setDialog(false);
  }
  function handleClickModal() {
    setDialog(true);
  }
  function handleChange(event) {
    if (event.target.checked) {
      setPrivacy(true);
    } else {
      setPrivacy(false);
    }
  }
  function closeContentPopover() {
    setAnchorContentEl(null);
  }
  function closeRadioPopover() {
    setAnchorRadioEl(null);
  }
  function closeTitlePopover() {
    setAnchorTitleEl(null);
  }
  function validatePrivacy() {
    return true;
  }
  function validateTextFields() {
    let result = false;
    if (textInputRef.current.value) {
    } else {
      setAnchorContentEl(textInputRef.current);
      setTimeout(closeContentPopover, 1000);
      result = false;
      return result;
    }
    if (titleInputRef.current.value) {
      result = true;
    } else {
      setAnchorTitleEl(titleInputRef.current);
      setTimeout(closeTitlePopover, 1000);
      result = false;
    }
    return result;
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
      <Dialog open={dialog}>
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
        <FormControlLabel
          inputRef={checkboxRef}
          control={
            <Checkbox
              checked={privacy}
              onChange={handleChange}
              name="privacy"
            />
          }
          label="Secret"
        />
        <Popover
          anchorEl={anchorRadioEl}
          open={Boolean(anchorRadioEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          Please define privacy of note
        </Popover>
        <Input
          variant="outlined"
          name="addNote"
          inputRef={titleInputRef}
          className="add-button"
          placeholder="Add title"
          inputProps={{ "aria-label": "description" }}
        />
        <Popover
          anchorEl={anchorTitleEl}
          open={Boolean(anchorTitleEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          Please enter note title
        </Popover>
        <TextareaAutosize
          rowsMin="10"
          variant="outlined"
          name="addNote"
          inputRef={textInputRef}
          className="add-button add-content"
          placeholder="Add new note"
          inputProps={{ "aria-label": "description" }}
        />
        <Popover
          anchorEl={anchorContentEl}
          open={Boolean(anchorContentEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          Please enter note content
        </Popover>
        <IconButton id="outlined-basic" color="primary" onClick={addNote}>
          <PostAddIcon />
        </IconButton>
      </Dialog>
    </div>
  );
}
