import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import About from './pages/About/About';
import './i18n';
import Rules from './pages/Rules/Rules';
import { Layout } from './components/Layout';
import Check from './pages/Check/Check';
import Result from './pages/Result/Result';
import Landing from './pages/Landing/Landing';
import Report from './pages/Report/Report';
import Imprint from "./pages/Imprint/Imprint";
import DSGVO from "./pages/DSGVO/DSGVO";
import Voting from "./pages/Voting/Voting";
import Admin from "./pages/Admin/Admin";
import Auth from "./components/Auth";
import {InstanceType} from "./utils/authProvider";

function App() {
  return (
    <Suspense fallback={null}>
      <Layout>
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/rules">
              <Rules />
            </Route>
            <Route path="/report">
              <Auth type={InstanceType.COMMUNITY}>
                <Report/>
              </Auth>
            </Route>
            <Route path="/voting">
              <Auth type={InstanceType.COMMUNITY}>
                <Voting/>
              </Auth>
            </Route>
            <Route path="/admin">
              <Auth type={InstanceType.ADMIN}>
                <Admin/>
              </Auth>
            </Route>
            <Route path="/result">
              <Result />
            </Route>
            <Route path="/check">
              <Check />
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
    </Suspense>
  );
}

export default App;
