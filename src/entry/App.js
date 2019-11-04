import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import localeRu from "date-fns/locale/ru";
import Games from "../views/Games";
import Players from "../views/Players";
import Tournaments from "../views/Tournaments";
import Tournament from "../views/Tournament";
import AppBar from "./AppBar";

import "./App.css";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeRu}>
        <HashRouter>
          <div className="App">
            <AppBar />
            <Switch>
              <Container maxWidth="lg">
                <Route exact path="/games" component={Games} />
                <Route exact path="/players" component={Players} />
                <Route exact path="/tournaments" component={Tournaments} />
                <Route exact path="/tournaments/:id" component={Tournament} />
                <Redirect to="/players" />
              </Container>
            </Switch>
          </div>
        </HashRouter>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
