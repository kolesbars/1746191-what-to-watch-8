import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {films} from './mocks/films';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {CreateAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {fetchFilmsAction, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {requireAuthorization} from './store/action';

const promo = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: 2014,
};

const api = CreateAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());

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
