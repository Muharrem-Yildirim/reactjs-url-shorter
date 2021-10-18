import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";

import ShortenedLinkList from "../components/ShortenedLinkList";
import CenteredButton from "../styles/CenteredButton";

import { saveHistory, clearHistory } from "../utils";
import axios from "../axios";

import validator from "validator";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef(null);
    this.state = {
      shortenedResponse: null,
      canPressShorten: true,
      isInteractedWithInput: false,
      // shortenedResponse: { shortenedLink: "" },
    };
  }

  onClickShorten = () => {
    const listRef = this.listRef.current;

    if (listRef === null) return;

    this.setState((prevState) => {
      return {
        ...prevState,
        waitingResponse: true,
        shortenedResponse: null,
      };
    });

    axios
      .post("/short", { url: this.state.url })
      .then(({ data }) => {
        saveHistory([data.originalUrl, data.shortUrl]);

        this.setState((prevState) => {
          return {
            ...prevState,
            url: "",
            waitingResponse: false,
            isInteractedWithInput: false,
            shortenedResponse: data,
          };
        });

        listRef.reload();
      })
      .catch((err) => {
        alert(
          err.response?.data?.message ||
            err.response.data ||
            "Unknown error occured."
        );

        this.setState((prevState) => {
          return {
            ...prevState,
            waitingResponse: false,
            isInteractedWithInput: true,
          };
        });
      });
  };

  onClickClear = () => {
    const listRef = this.listRef.current;

    if (listRef === null) return;

    clearHistory();

    listRef.reload();
  };

  getHistory = () => {
    return JSON.parse(localStorage.getItem("shorten_history")) || [];
  };

  onInputChange = ({ target }) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [target.name]: target.value.replace(" ", ""),
        isInteractedWithInput: true,
      };
    });
  };

  render() {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6">Please enter url to short link.</Typography>
          <TextField
            fullWidth
            style={{ marginTop: 10 }}
            placeholder="https://example.com"
            disabled={this.state.waitingResponse}
            onChange={this.onInputChange}
            value={this.state.url || ""}
            name="url"
            error={
              !validator.isURL(this.state.url || "") &&
              this.state.isInteractedWithInput &&
              this.state.url !== ""
            }
            helperText={
              !validator.isURL(this.state.url || "") &&
              this.state.isInteractedWithInput &&
              this.state.url !== "" &&
              "Link is not valid."
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {this.state.shortenedResponse?.shortUrl}
                  <Button
                    style={{ marginLeft: 5 }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        this.state.shortenedResponse?.shortUrl
                      );
                    }}
                    disabled={
                      this.state.shortenedResponse?.shortUrl === undefined
                    }
                  >
                    Copy
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
        <CardActions>
          <CenteredButton
            variant="contained"
            color="primary"
            style={{ marginBottom: 20 }}
            onClick={this.onClickShorten}
            disabled={
              this.state.waitingResponse ||
              !validator.isURL(this.state.url || "")
            }
          >
            Shorten
          </CenteredButton>
        </CardActions>
        <Divider />
        <CardContent>
          <ShortenedLinkList
            ref={this.listRef}
            onClickClear={this.onClickClear}
          />
        </CardContent>
      </Card>
    );
  }
}
