import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../const';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {useSelector} from 'react-redux';
import {getFilmList} from '../../store/selectors';
import browserHistory from '../../browser-history';

type AppProps = {
  title: string,
  genre: string,
  date: number,
}

function App({title, genre, date}: AppProps): JSX.Element {
  const filmList = useSelector(getFilmList);

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path = {AppRoute.Main} exact>
          <Main
            title = {title}
            promoGenre = {genre}
            date = {date}
            films = {filmList}
          />
        </Route>
        <Route path = {AppRoute.SignIn} exact>
          <SignIn/>
        </Route>
        <PrivateRoute
          path = {AppRoute.MyList}
          exact
          render = {() => <MyList films = {filmList}/>}
        >
        </PrivateRoute>
        <PrivateRoute
          path = {AppRoute.AddReview}
          exact
          render = {() => <AddReview films = {filmList}/>}
        >
        </PrivateRoute>
        <Route path = {AppRoute.Film} exact>
          <Film
            films = {filmList}
          />
        </Route>
        <Route path = {AppRoute.Player} exact>
          <Player
            films = {filmList}
          />
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
