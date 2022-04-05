import React from 'react';
import {Route} from 'react-router-dom';
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Add from "./pages/Add"
import Detail from "./pages/Detail"
import Edit from "./pages/Edit"
import NotFound from "./pages/NotFound"
import { ConnectedRouter } from 'connected-react-router';
import history from './history';

function App() {
  return (
      <ConnectedRouter history={history}>
          <Route path="/edit/:id" component={Edit} />
          <Route path="/book/:id" component={Detail} />
          <Route path="/add" component={Add} />
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
      </ConnectedRouter>
  );
}

export default App;
