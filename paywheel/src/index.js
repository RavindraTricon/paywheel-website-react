import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-overrides.css';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJmC_aYOXGMurI5rn-cX6cCJ2P5td4yeA",
  authDomain: "schedular-27ac2.firebaseapp.com",
  databaseURL: "https://schedular-27ac2.firebaseio.com",
  projectId: "schedular-27ac2",
  storageBucket: "schedular-27ac2.appspot.com",
  messagingSenderId: "416610625120",
  appId: "1:416610625120:web:d43eb3b2859328143c8505",
  measurementId: "G-68G2WEZMLD"
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
