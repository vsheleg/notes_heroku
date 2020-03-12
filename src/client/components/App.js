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
  const [notes, setNotes] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [loggedUser, setLoggedUser] = useState(true);
  onDefineHeader(window.location.pathname);

  function isLoggedUser() {
    const token = localStorage.getItem(KEY);
    setLoggedUser(Boolean(token));
  }
  const updateItems = () => {
    let result = noteService.loadAllNotes(typeOfNotes);
    result.then(response => {
      if (response.error) {
        alert(response.error.statusText); //Forbidden
        setRedirect(true); //redirects to login
      } else {
        setNotes(response);
      }
    });
  };
  useEffect(() => {
    updateItems();
    isLoggedUser();
  }, [typeOfNotes, redirect, loggedUser]);

  async function deleteNote(note) {
    await noteService.deleteNote(note, typeOfNotes);
    setNotes(notes.filter(elem => elem !== note));
  }

  async function addNote(note) {
    const elem = await noteService.addNote({ value: note }, typeOfNotes);
    setNotes(notes.concat(elem.note.id));
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
            typeOfNotes={typeOfNotes}
            notes={notes}
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
            typeOfNotes={typeOfNotes}
            notes={notes}
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
            notes={notes}
            onDelete={deleteNote}
          />
        </div>
      </div>
    );
  }
  return <div id="app-container"></div>;
}
