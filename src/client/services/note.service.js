import request from "./apiService/index";
const ROUTER_PREFIX = "notes";
const ROUTES = {
  READ: "/read",
  LOADAll: "/readAll",
  EDIT: "/edit",
  DELETE: "/delete",
  ADD: "/add"
};

function addNote(content, typeOfNotes) {
  return request.post(ROUTER_PREFIX + ROUTES.ADD + "/" + typeOfNotes, content);
}

function loadAllNotes(typeOfNotes) {
  return request.get(ROUTER_PREFIX + ROUTES.LOADAll + "/" + typeOfNotes);
}
function loadNote(title, typeOfNotes) {
  return request.get(
    ROUTER_PREFIX + ROUTES.READ + "/" + title + "/" + typeOfNotes
  );
}
function editNote(content, title, typeOfNotes) {
  return request.post(
    ROUTER_PREFIX + ROUTES.EDIT + "/" + title + "/" + typeOfNotes,
    content
  );
}

function deleteNote(title, typeOfNotes) {
  return request.deleteData(
    ROUTER_PREFIX + ROUTES.DELETE + "/" + title + "/" + typeOfNotes
  );
}

export default { addNote, deleteNote, editNote, loadNote, loadAllNotes };
