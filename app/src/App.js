import "./App.scss";
import Main from "./views/Main";
import Grid from "@mui/material/Grid";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const prefersDarkMode = false; //useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className="App">
        <Grid item lg={5} md={12}>
          <Main />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
