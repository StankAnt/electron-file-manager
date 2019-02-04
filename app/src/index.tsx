import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import Home from './containers/Home';

import './index.scss';

const store = configureStore();

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'app');
document.body.appendChild(mainElement);

let App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

App = hot(module)(App);

ReactDOM.render(<App />, mainElement);
