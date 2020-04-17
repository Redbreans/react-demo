import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Settings from 'pages/Settings';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { config } from 'utils/request';
import './App.css';
import Demo from './pages/Demo';
import SettingsStore from './stores/Settings';
import UserStore from './stores/User';
import 'antd-mobile/dist/antd-mobile.css'

const user = new UserStore();
const settings = new SettingsStore();

config.url(url => `${settings.apiServer}${url}`);

class App extends Component {
  render() {
    return (
      <Provider user={user} settings={settings}>
        <Fragment>
          {process.env.NODE_ENV === 'development' ? <DevTools noPanel /> : null}
          <Router>
            <Switch>
              <Route exact path="/" component={Demo} />
              <Route exact path="//settings" component={Settings} />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
