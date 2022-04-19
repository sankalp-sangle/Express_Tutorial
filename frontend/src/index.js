import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './store/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const AppWrapper = () => {
  /*const store = createStore(() => ({
    isUserAuthenticated: false,
    id: 0
  }));*/
  let store = createStore(rootReducer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
