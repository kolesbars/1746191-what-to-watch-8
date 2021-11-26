import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {rootReducer} from './store/root-reduser';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {fetchFilmsAction, checkAuthAction} from './store/api-actions';
import {requireAuthorization} from './store/action';
import {configureStore} from '@reduxjs/toolkit';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
},
);

(store.dispatch)(fetchFilmsAction());

const renderApp = async() => {
  await (store.dispatch)(checkAuthAction());
  ReactDOM.render(
    <React.StrictMode>
      <Provider store= {store}>
        <ToastContainer/>
        <App
          api = {api}
        />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'));
};

renderApp();

