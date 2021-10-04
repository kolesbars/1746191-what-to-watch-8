import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promo = {
  tytle: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: '2014',
};

ReactDOM.render(
  <React.StrictMode>
    <App
      tytle = {promo.tytle}
      genre = {promo.genre}
      date = {promo.date}
    />
  </React.StrictMode>,
  document.getElementById('root'));
