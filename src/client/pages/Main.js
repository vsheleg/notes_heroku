import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";
import App from "../components/App";
import Signin from "./login/login";
import Signup from "./signup/signup";
import Header from "./Header";
import NotesHeader from "./NotesHeader";
import NotePage from "./NotePage";

import "./main.css";

export default function Main({}) {
  const [header, setHeader] = useState("");

  function defineHeader(header) {
    if (header === "/notes") {
      setHeader("Notes");
    } else if (header === "/my-notes") {
      setHeader("My Notes");
    } else if (header === "/shared-note") {
      setHeader("Notes");
    } else {
      setHeader("home");
    }
    document.title = header;
  }
  if (header === "Notes" || header === "My Notes") {
    return (
      <Router>
        <NotesHeader />
        <Switch>
          <Route path="/signup">
            <Signup onDefineHeader={defineHeader} />
          </Route>
          <Route exact path="/login">
            <Signin onDefineHeader={defineHeader} />
          </Route>
          <Route path="/notes">
            <App typeOfNotes="all" onDefineHeader={defineHeader} />
          </Route>
          <Route path="/my-notes">
            <App typeOfNotes="personal" onDefineHeader={defineHeader} />
          </Route>
          <Route path="/shared-note/:id/:typeOfNotes">
            <NotePage onDefineHeader={defineHeader} />
          </Route>
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup">
          <Signup onDefineHeader={defineHeader} />
        </Route>
        <Route exact path="/login">
          <Signin onDefineHeader={defineHeader} />
        </Route>
        <Route path="/notes">
          <App typeOfNotes="all" onDefineHeader={defineHeader} />
        </Route>
        <Route path="/my-notes">
          <App typeOfNotes="personal" onDefineHeader={defineHeader} />
        </Route>
        <Route path="/shared-note/:id/:typeOfNotes">
          <NotePage onDefineHeader={defineHeader} />
        </Route>
      </Switch>
    </Router>
  );
}
