import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import PrivateRoute from './core/components/PrivateRoute';
import GlobalNotification from './core/components/GlobalNotification';
import GlobalMessage from './core/components/GlobalMessage';
import './App.css';

import HomePage from './HomePage';
import UserPage from './features/user/UserPage';

const NoMatch = () => <div>Can't find any route</div>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main">
            <GlobalMessage />
            <GlobalNotification />
            <Switch>
              <Route path="/user" component={UserPage} />
              <PrivateRoute path="/" component={HomePage} />
              <Route component={NoMatch} />
            </Switch>Î
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
