import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute, APIRoute} from '../../const';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import RouteForGuests from '../private-route/route-for-guests';
import {useSelector} from 'react-redux';
import {getFilmList} from '../../store/selectors';
import browserHistory from '../../browser-history';
import {FilmType} from '../../types/film-type';
import {adaptToClient} from '../../utils/common';
import {toast} from 'react-toastify';
import {AxiosInstance} from 'axios';

const CHANGE_STATUS_FAIL_MESSAGE = 'Необходимо авторизоваться';

type AppProps = {
  api: AxiosInstance,
}

function App({api}: AppProps): JSX.Element {
  const filmList = useSelector(getFilmList);

  const changeFilmStatus = async (id: number, filmStatus: boolean, cb: (data: boolean) => void) => {
    let status;
    filmStatus === true ? status = 0 : status = 1;
    try {
      const {data} = await api.post<FilmType>(`${APIRoute.Favorite}/${id}/${status}`);
      cb(adaptToClient(data).isFavorite);
    } catch {
      toast.info(CHANGE_STATUS_FAIL_MESSAGE);
    }
  };

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path = {AppRoute.Main} exact>
          <Main
            api = {api}
            films = {filmList}
            changeStatusFunction = {changeFilmStatus}
          />
        </Route>
        <RouteForGuests
          path = {AppRoute.SignIn}
          exact
          render = {() =>(<SignIn/>)}
        >
        </RouteForGuests>
        <PrivateRoute
          path = {AppRoute.MyList}
          exact
          render = {() =>
            (
              <MyList
                api={api}
              />)}
        >
        </PrivateRoute>
        <PrivateRoute
          path = {AppRoute.AddReview}
          exact
          render = {() =>
            (
              <AddReview
                api = {api}
              />)}
        >
        </PrivateRoute>
        <Route path = {AppRoute.Film} exact>
          <Film
            api = {api}
            changeStatusFunction = {changeFilmStatus}
          />
        </Route>
        <Route path = {`${AppRoute.Player}/:id`} exact>
          <Player/>
        </Route>
        <Route path = {AppRoute.NotFoundScreen}>
          <NotFoundScreen/>
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
