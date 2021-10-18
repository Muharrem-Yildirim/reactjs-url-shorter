import * as React from "react";
import { List, Typography, ListSubheader } from "@mui/material";
import { getHistory } from "../utils";
import ShortenedLink from "./ShortenedLink";
import CenteredButton from "../styles/CenteredButton";

const ShortenedLinkList = React.forwardRef((props, ref) => {
  const [history, setHistory] = React.useState(getHistory());
  const listRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    reload() {
      setHistory(getHistory());

      scrollToBottom();
    },
  }));

  React.useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listRef.current != null) listRef.current.scrollTop = 99999;
    }, 100);
  };

  return history.length === 0 ? (
    <Typography variant="p" align="center" style={{ display: "block" }}>
      Shortened links history is empty.
    </Typography>
  ) : (
    <div style={{ width: "100%", position: "relative" }}>
      <List
        sx={{
          width: "100%",
          maxHeight: "200px",
          overflow: "auto",
          bgcolor: "background.paper",
        }}
        ref={listRef}
        subheader={<ListSubheader>Shortened links history</ListSubheader>}
      >
        {history.map(function (el, idx) {
          return <ShortenedLink el={el} idx={idx} />;
        })}
      </List>
      <div
        style={{
          width: "100%",
          marginTop: 20,
          marginBottom: 5,
          display: "flex",
        }}
      >
        <CenteredButton
          variant="contained"
          color="secondary"
          onClick={props.onClickClear}
          size="sm"
        >
          Clear History
        </CenteredButton>
      </div>
    </div>
  );
});

export default ShortenedLinkList;
