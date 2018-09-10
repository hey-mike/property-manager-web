import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';
import GlobalMessage from './core/components/GlobalMessage';
import GlobalNotification from './core/components/GlobalNotification';
import PrivateRoute from './core/components/PrivateRoute';
import HomePage from './features/home/HomePage';
import UserPage from './features/user/UserPage';
import rootReducer from './rootReducer';



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
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
