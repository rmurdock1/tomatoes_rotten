import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import moviereducer from './reducers/moviereducer';
import { watchForSearch, watchForLoadSingle } from './reducers/sagas';
import thunk from 'redux-thunk';

let store;
window.React = React;

const sagaMiddleware = createSagaMiddleware();
const persistedState = localStorage.getItem('reduxState');
if (persistedState) {
  const parsedState = JSON.parse(persistedState);
  if (parsedState.movies) {
    parsedState.movies = new Immutable.List(parsedState.movies);
  }
  const immutableState = new Immutable.Map(parsedState);

  store = createStore(moviereducer, immutableState, composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)));
} else {
  store = createStore(moviereducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)));
}

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
sagaMiddleware.run(watchForSearch);
sagaMiddleware.run(watchForLoadSingle);


  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('root')
  );
