import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app';
import { Provider } from 'react-redux';
import store from './store.js';
function Main() {
  return (

      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>

  );
}

ReactDOM.render(<Main />, document.getElementById('root'));