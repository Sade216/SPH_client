//React
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom' 
//Темы
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@toast-ui/editor/dist/toastui-editor.css';
//Компоненты
import App from './Components/App';

import {Provider} from 'react-redux'

import {setupStore} from './Redux/store/index'

import ThemeSelector, {CHOSEN_THEME} from './Components/UI/Themes/ThemeSelector'

const store = setupStore();


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeSelector>
          <App />
        </ThemeSelector>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);