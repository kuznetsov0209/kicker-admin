import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "@material-ui/core/styles/defaultTheme";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import localeRu from "date-fns/locale/ru";
import Games from "../views/Games";
import Players from "../views/Players";
import Tournaments from "../views/Tournaments";
import Tournament from "../views/Tournament";
import AppBar from "./AppBar";
import Container from "@material-ui/core/Container";

import "./App.css";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      spacing: {
        marginTop: defaultTheme.spacing(4)
      }
    }
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeRu}>
          <HashRouter>
            <div className="App">
              <AppBar />
              <Container>
                <Switch>
                  <Route exact path="/games" component={Games} />
                  <Route exact path="/players" component={Players} />
                  <Route exact path="/tournaments" component={Tournaments} />
                  <Route exact path="/tournaments/:id" component={Tournament} />
                  <Redirect to="/players" />
                </Switch>
              </Container>
            </div>
          </HashRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

export default App;
