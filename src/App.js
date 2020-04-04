import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Rules from './pages/Rules/Rules';
import { Layout } from './components/Layout';
import Check from './pages/Check/Check';
import Result from './pages/Result/Result';
import Landing from './pages/Landing/Landing';
import Report from './pages/Report/Report';
import Sources from './pages/Sources/Sources';
import Imprint from "./pages/Imprint/Imprint";
import DSGVO from "./pages/DSGVO/DSGVO";
import authentication from './utils/react-azure-adb2c'
import Voting from "./pages/Voting/Voting";

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route exact path="/report" component={authentication.required(Report)} />
          <Route exact path="/voting" component={authentication.required(Voting)} />
          <Route path="/result">
            <Result />
          </Route>  

          <Route path="/teamMapSrc/web/index.htm" onEnter={() => window.location.reload()} />
   
          <Route path="/check">
            <Check />
          </Route>
          <Route path="/sources">
            <Sources />
          </Route>
          <Route path="/imprint">
            <Imprint />
          </Route>
          <Route path="/dsgvo">
            <DSGVO />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
