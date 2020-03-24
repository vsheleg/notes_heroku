import React, { useEffect } from "react";
import { useState } from "react";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { MenuItem } from "@material-ui/core";
import { List, ListItem, ListItemIcon } from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import AddButton from "../components/Button/AddButton";
import { Drawer, ListItemText, Collapse, Divider } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import "./AsideMenu.css";
import "../components/Button/AddButton.css";
import noteService from "../services/note.service";

export default function AsideMenu({
  access,
  commonNotes,
  personalNotes,
  onSelect,
  addNote
}) {
  const [openAllNotes, setOpenAllNotes] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [openMyNotes, setOpenMyNotes] = useState(false);
  const [selectedNote, setSelectedNote] = useState(false);
  const [notes, setNotes] = useState({});

  function handleSelectNote(event) {
    for (let key in notes) {
      for (let i = 0; i < notes[key].length; i++) {
        if (event.target.innerText === notes[key][i].title) {
          setSelectedNote(notes[key][i].id, notes[key][i].title);
          onSelect(notes[key][i].id);
        }
      }
    }
  }
  async function updateItems() {
    let result = noteService.loadAllNotes();
    result.then(response => {
      setNotes(response);
    });
  }
  useEffect(() => {
    updateItems();
  }, [commonNotes, personalNotes]);
  function handleAllNotes() {
    setOpenAllNotes(!openAllNotes);
  }
  function handleMyNotes() {
    setOpenMyNotes(!openMyNotes);
  }
  function logout() {
    setRedirect(true);
  }
  function handleHome() {
    setOpenAllNotes(false);
    setOpenMyNotes(false);

    onSelect("all");
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }

  if (access) {
    const listPersonalNotes = personalNotes.map(elem => (
      <ListItem
        className="menu-elem"
        key={elem}
        button
        onClick={handleSelectNote}
      >
        <ListItemText inset primary={elem} />
      </ListItem>
    ));
    const listAllNotes = commonNotes.map(elem => (
      <ListItem
        className="menu-elem"
        key={elem}
        button
        onClick={handleSelectNote}
      >
        <ListItemText inset primary={elem} />
      </ListItem>
    ));

    return (
      <Drawer variant="permanent" className="menu-container">
        <MenuItem className="header-menu"></MenuItem>
        <hr />
        <List disablePadding>
          <ListItem button>
            <AddButton onAdd={addNote} />
          </ListItem>
          <ListItem button onClick={handleHome}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleMyNotes}>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="My Notes" />

            {openMyNotes ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openMyNotes} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {listPersonalNotes}
            </List>
          </Collapse>
          <ListItem button onClick={handleAllNotes}>
            <ListItemIcon>
              <GroupIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Notes" />
            {openAllNotes ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openAllNotes} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {listAllNotes}
            </List>
          </Collapse>

          <ListItem button onClick={logout}>
            <ListItemIcon color="primary" onClick={logout}>
              <KeyboardReturnIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
