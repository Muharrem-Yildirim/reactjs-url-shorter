import "./App.scss";
import Main from "./components/Main";
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
      <div className="App">
        <Grid sm={5}>
          <Main />
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
