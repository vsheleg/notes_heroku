import React, { useState, useEffect, useCallback } from "react";
import NoteList from "./NoteList/NoteList";
import { Redirect } from "react-router-dom";

import AsideMenu from "../pages/AsideMenu";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { IconButton } from "@material-ui/core";
import "./App.css";
import noteService from "../services/note.service.js";
import { isCompositeComponentWithType } from "react-dom/test-utils";
const KEY = "note-token";

export default function App({ onDefineHeader, typeOfNotes }) {
  const [personalNotes, setPersonalNotes] = useState([]);
  const [commonNotes, setCommonNotes] = useState([]);
  const [loggedUser, setLoggedUser] = useState(true);
  const [selectedNote, setSelectedNote] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [viewOfNotes, setViewOfNotes] = useState("preview");
  const [personalTitles, setPersonalTitles] = useState([]);
  const [commonTitles, setCommonTitles] = useState([]);
  console.log(commonNotes, personalNotes);
  if (window.location.pathname === "/" && loggedUser) {
    onDefineHeader("/notes");
  } else {
    onDefineHeader(window.location.pathname);
  }
  function isLoggedUser() {
    const token = localStorage.getItem(KEY);
    setLoggedUser(Boolean(token));
  }

  const updateItems = () => {
    let result = noteService.loadAllNotes();
    result.then(response => {
      if (response.error) {
        alert(response.error.statusText); //Forbidden
      } else {
        if (response.personal) {
          setPersonalNotes(response.personal.map(elem => elem.id));
          setPersonalTitles(response.personal.map(elem => elem.title));
        }

        setCommonNotes(response.common.map(elem => elem.id));
        setCommonTitles(response.common.map(elem => elem.title));
      }
    });
  };
  useEffect(() => {
    updateItems();
    isLoggedUser();
  }, [typeOfNotes, loggedUser, selectedNote, viewOfNotes]);

  async function deleteNote(note, title) {
    console.log(typeof note);
    console.log(note, title);
    console.log(commonNotes, personalNotes);
    await noteService.deleteNote(note);
    setCommonNotes(commonNotes.filter(elem => elem !== Number(note)));
    setPersonalNotes(personalNotes.filter(elem => elem !== Number(note)));
    setCommonTitles(commonTitles.filter(elem => elem !== title));
    setPersonalTitles(personalTitles.filter(elem => elem !== title));

    console.log(commonNotes, personalNotes);
  }
  function selectNote(note) {
    setSelectedNote(note);
    setViewOfNotes("fullscreen");
  }
  function logout() {
    setRedirect(true);
  }
  async function addNote(note, privacy) {
    const elem = await noteService.addNote({
      value: note.content,
      title: note.title,
      privacy: privacy
    });
    if (!privacy) {
      setCommonNotes(commonNotes.concat(elem.note.id));
      setCommonTitles(commonTitles.concat(elem.note.title));
    } else {
      setPersonalNotes(personalNotes.concat(elem.note.id));
      setPersonalTitles(personalTitles.concat(elem.note.title));
    }
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }
  if (!loggedUser) {
    return (
      <div id="container">
        {typeOfNotes === "all" ? (
          <div>
            <NoteList
              type={viewOfNotes}
              access={loggedUser}
              notes={commonNotes}
              onDelete={deleteNote}
            />
            <IconButton onClick={logout}>
              <KeyboardReturnIcon color="primary" />
            </IconButton>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
  if (selectedNote) {
    return (
      <div id="container">
        <div id="aside">
          <AsideMenu
            addNote={addNote}
            onSelect={selectNote}
            commonNotes={commonTitles}
            personalNotes={personalTitles}
            access={loggedUser}
          />
        </div>
        <div id="content">
          <NoteList
            type={viewOfNotes}
            access={loggedUser}
            notes={[selectedNote]}
            onDelete={deleteNote}
          />
        </div>
      </div>
    );
  }
  return (
    <div id="container">
      <div id="aside">
        <AsideMenu
          addNote={addNote}
          onSelect={selectNote}
          commonNotes={commonTitles}
          personalNotes={personalTitles}
          access={loggedUser}
        />
      </div>
      <div id="content">
        {typeOfNotes === "all" ? (
          <NoteList
            type={viewOfNotes}
            access={loggedUser}
            notes={commonNotes.concat(personalNotes)}
            onDelete={deleteNote}
          />
        ) : (
          <NoteList
            type={viewOfNotes}
            access={loggedUser}
            notes={personalNotes}
            onDelete={deleteNote}
          />
        )}
      </div>
    </div>
  );
}
