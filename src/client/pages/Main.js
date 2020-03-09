import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import App from "../components/App";
import Signin from "./login/login";
import Signup from "./signup/signup";
import Header from "./Header";
import NotesHeader from "./NotesHeader";

import "./main.css";

export default function Main({}) {
  const [header, setHeader] = useState("");
  document.title = "Home";

  function defineHeader(header) {
    if (header === "/notes") {
      setHeader("notes");
    } else {
      setHeader("home");
    }
  }
  if (header === "notes") {
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
            <App onDefineHeader={defineHeader} />
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
          <App onDefineHeader={defineHeader} />
        </Route>
      </Switch>
    </Router>
  );
}
