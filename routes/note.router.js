const express = require("express");
const controller = require("../controller/note.controller");
const middleware = require("../middleware");
const notesRouter = express.Router();

notesRouter.use(middleware.resolveUser);
notesRouter.use(middleware.validateUser);

notesRouter.delete("/delete/:noteId", controller.deleteNote);
notesRouter.get("/read/:noteId", controller.readNote);
notesRouter.get("/readAll", controller.getNotes);
notesRouter.post("/edit/:noteId", controller.editNote);
notesRouter.post("/add", controller.addNote);

module.exports = notesRouter;