import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ShortenedLink({ el, idx }) {
  return (
    <ListItem>
      <ListItemIcon>{idx + 1}</ListItemIcon>
      <ListItemText
        id="switch-list-label-bluetooth"
        primary={
          <span
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {el[0]}{" "}
            <KeyboardArrowRightIcon
              style={{ marginLeft: 10, marginRight: 10 }}
            />{" "}
            {el[1]}
          </span>
        }
      />
    </ListItem>
  );
}
