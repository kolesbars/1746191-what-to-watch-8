import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promo = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      title = {promo.title}
      genre = {promo.genre}
      date = {promo.date}
    />
  </React.StrictMode>,
  document.getElementById('root'));
