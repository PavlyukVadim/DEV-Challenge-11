import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import './index.css';

ReactDOM.render((
  <HashRouter>
    <div>
		  <Header/>
    </div>
  </HashRouter>
), document.getElementById('root'));
