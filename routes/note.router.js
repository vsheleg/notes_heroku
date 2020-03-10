const express = require("express");
const controller = require("../controller/note.controller");
const middleware = require("../middleware");
const notesRouter = express.Router();

notesRouter.use(middleware.resolveUser);
notesRouter.use(middleware.validateUser);

notesRouter.delete("/delete/:noteId/:typeOfNotes", controller.deleteNote);
notesRouter.get("/read/:noteId/:typeOfNotes", controller.readNote);
notesRouter.get("/readAll/:typeOfNotes", controller.getNotes);
notesRouter.post("/edit/:noteId/:typeOfNotes", controller.editNote);
notesRouter.post("/add/:typeOfNotes", controller.addNote);

module.exports = notesRouter;
