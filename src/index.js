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
import AuthContext from './Contexts/UserContext';
import MusicContext from './Contexts/MusicContext'
import ChatContext from './Contexts/ChatContext'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <MusicContext>
          <ChatContext>
            <App />
          </ChatContext>
        </MusicContext>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);