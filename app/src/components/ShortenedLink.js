import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
      {/* <Switch
        edge="end"
        inputProps={{
          "aria-labelledby": "switch-list-label-bluetooth",
        }}
      /> */}
    </ListItem>
  );
}
