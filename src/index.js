import React from 'react';
import ReactDOM from 'react-dom';
import PasswordGenerator from './passwordGenerator';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<PasswordGenerator />, document.getElementById('root'));

serviceWorker.unregister();
