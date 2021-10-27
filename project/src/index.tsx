import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {films} from './mocks/films';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const promo = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <App
        title = {promo.title}
        genre = {promo.genre}
        date = {promo.date}
        films = {films}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
