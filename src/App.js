import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// App Insights
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";

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
import authentication from 'react-azure-adb2c';
import Voting from "./pages/Voting/Voting";
import Admin from "./pages/Admin/Admin";

const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
var appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'aebb34ec-a08b-4f46-a982-cc9683a9ee25',
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory }
        }
    }
});
appInsights.loadAppInsights();

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
            <Route exact path="/report" component={authentication.required(Report)} />
            <Route exact path="/voting" component={authentication.required(Voting)} />
            <Route exact path="/admin">
              <Admin/>
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
