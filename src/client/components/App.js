import React, { useState, useEffect, useCallback } from "react";
import NoteList from "./NoteList/NoteList";
import { Redirect } from "react-router-dom";
import AddButton from "./Button/AddButton";
import AsideMenu from "../pages/AsideMenu";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { IconButton } from "@material-ui/core";
import "./App.css";
import noteService from "../services/note.service.js";
const KEY = "note-token";

export default function App({ onDefineHeader, typeOfNotes }) {
  const [personalNotes, setPersonalNotes] = useState([]);
  const [commonNotes, setCommonNotes] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [loggedUser, setLoggedUser] = useState(true);
  onDefineHeader(window.location.pathname);

  function isLoggedUser() {
    const token = localStorage.getItem(KEY);
    setLoggedUser(Boolean(token));
  }
  const updateItems = () => {
    let result = noteService.loadAllNotes();
    result.then(response => {
      if (response.error) {
        alert(response.error.statusText); //Forbidden
        setRedirect(true); //redirects to login
      } else {
        setPersonalNotes(response.personal);
        setCommonNotes(response.common);
      }
    });
  };
  useEffect(() => {
    updateItems();
    isLoggedUser();
  }, [typeOfNotes, redirect, loggedUser]);

  async function deleteNote(note) {
    await noteService.deleteNote(note);
    if (typeOfNotes === "all") {
      setCommonNotes(commonNotes.filter(elem => elem !== note));
    } else {
      setPersonalNotes(personalNotes.filter(elem => elem !== note));
    }
  }

  async function addNote(note) {
    const elem = await noteService.addNote({
      value: note,
      privacy: typeOfNotes
    });
    if (typeOfNotes === "all") {
      setCommonNotes(commonNotes.concat(elem.note.id));
    } else {
      setPersonalNotes(commonNotes.concat(elem.note.id));
    }
  }
  function logout() {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }
  if (typeOfNotes === "all") {
    if (!loggedUser) {
      return (
        <div id="container">
          <NoteList
            access={loggedUser}
            notes={commonNotes}
            onDelete={deleteNote}
          />
          <IconButton
            size="medium"
            variant="outlined"
            color="primary"
            onClick={logout}
          >
            <KeyboardReturnIcon />
          </IconButton>
        </div>
      );
    }
    return (
      <div id="container">
        <div id="aside">
          <AsideMenu access={loggedUser} />
        </div>
        <div id="content">
          <input
            type="button"
            onClick={logout}
            name="exit"
            className="primary"
            id="logout"
          />
          <AddButton onAdd={addNote} />
          <NoteList
            access={loggedUser}
            notes={commonNotes}
            onDelete={deleteNote}
          />
        </div>
      </div>
    );
  }
  if (typeOfNotes === "personal") {
    return (
      <div id="container">
        <div id="aside">
          <AsideMenu access={loggedUser} />
        </div>
        <div id="content">
          <input
            type="button"
            onClick={logout}
            name="exit"
            className="primary"
            id="logout"
          />
          <AddButton onAdd={addNote} />
          <NoteList
            typeOfNotes={typeOfNotes}
            notes={personalNotes}
            access={loggedUser}
            onDelete={deleteNote}
          />
        </div>
      </div>
    );
  }
  return <div id="app-container"></div>;
}
