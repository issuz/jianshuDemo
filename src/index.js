import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Globalstyle } from './style';
import { GlobalFontstyle } from '../src/statics/iconfont/iconfont';

const app = (
  <div>
    <App />
    <Globalstyle />
    <GlobalFontstyle />
  </div>
)

ReactDOM.render(app, document.getElementById('root'));

