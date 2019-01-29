import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Home from './containers/Home';

import './index.scss';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'app');
document.body.appendChild(mainElement);

let App = () => <Home />;

App = hot(module)(App);

ReactDOM.render(<App />, mainElement);
