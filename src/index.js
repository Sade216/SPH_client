//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom' 
//Темы
import './index.css';
import './Components/UI/Themes/dark.css';
// import './Components/UI/Themes/light.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@toast-ui/editor/dist/toastui-editor.css';
//Компоненты
import App from './Components/App';

import {Provider} from 'react-redux'

import {setupStore} from './Redux/store/index'

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);