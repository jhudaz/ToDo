import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Login from './containers/login';
import ToDos from './containers/todos';
// import Edit from './containers/edit';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/ToDos" component={ToDos} />
              {/* <Route path="/Edit" component={Edit} /> */}
              {/* <Route path="/Create" component={Edit} /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default App;
