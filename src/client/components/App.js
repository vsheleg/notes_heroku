import React, { useState, useEffect, useCallback } from "react";
import NoteList from "./NoteList/NoteList";
import { Redirect } from "react-router-dom";
import AddButton from "./Button/AddButton";
import AsideMenu from "../pages/AsideMenu";
import "./App.css";
import noteService from "../services/note.service.js";

export default function App({ onDefineHeader, typeOfNotes }) {
  const [notes, setNotes] = useState([]);
  const [redirect, setRedirect] = useState(false);
  onDefineHeader(window.location.pathname);

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
  }, [typeOfNotes, redirect]);

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
    return <Redirect to="/login" from="/notes" />;
  }
  if (typeOfNotes === "all") {
    return (
      <div id="container">
        <div id="aside">
          <hr />
          <AsideMenu />
          <hr />
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
  } else if (typeOfNotes === "personal") {
    return (
      <div id="container">
        <div id="aside">
          <hr />
          <AsideMenu />
          <hr />
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
  return <div id="container"></div>;
}
