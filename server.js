const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  notesRouter = require("./routes/note.router"),
  userRouter = require("./routes/user.router");
const path = require("path");
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.static(__dirname + "./build"));
app.use(express.static(path.join(__dirname, "./build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/", function(req, res) {
  res.end("");
});

app.use("/user/", userRouter);
app.use("/notes/", notesRouter);
app.listen(port);
