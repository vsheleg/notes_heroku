const BASEURI = "https://calm-river-32384.herokuapp.com/";
const KEY = "note-token";

async function request(path, params = {}) {
  const token = await localStorage.getItem(KEY);
  return fetch(BASEURI + path, {
    ...params,
    mode: "no-cors",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      ...(params.headers || {})
    }
  }).then(response => {
    if (response.status !== 403) {
      return response.json();
    } else {
      return { error: response };
    }
  });
}
function deleteData(url) {
  return request(url, {
    method: "delete"
  });
}

function get(url) {
  return request(url);
}

function post(url, data) {
  return request(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export default { get, post, deleteData };
