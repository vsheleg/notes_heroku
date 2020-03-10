import React, { useEffect } from "react";
import { useState } from "react";
import { MenuList } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const Menu = styled(MenuList)({
  padding: "10 30px"
});
const Item = styled(MenuItem)({});

export default function AsideMenu({}) {
  const [allNotes, setAllNotes] = useState(false);
  const [myNotes, setMyNotes] = useState(false);

  useEffect(() => {
    setMyNotes(false);
    setAllNotes(false);
  });

  function redirectAllNotes() {
    setAllNotes(true);
  }
  function redirectMyNotes() {
    setMyNotes(true);
  }
  if (allNotes) {
    return <Redirect to="/notes" from="/my-notes" />;
  }
  if (myNotes) {
    return <Redirect to="/my-notes" from="/notes" />;
  }
  return (
    <Menu color="primary" variant="menu">
      <Item className="MenuItem" onClick={redirectMyNotes}>
        My Notes
      </Item>
      <Item className="MenuItem" onClick={redirectAllNotes}>
        All Notes
      </Item>
    </Menu>
  );
}
