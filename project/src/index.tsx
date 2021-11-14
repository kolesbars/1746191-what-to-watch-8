import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {CreateAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {fetchFilmsAction, checkAuthAction} from './store/api-actions';
import {requireAuthorization} from './store/action';
import {configureStore} from '@reduxjs/toolkit';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const promo = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
};

const api = CreateAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
},
);

(store.dispatch)(checkAuthAction());
(store.dispatch)(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <ToastContainer/>
      <App
        title = {promo.title}
        genre = {promo.genre}
        date = {promo.date}
        api = {api}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
