import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {FilmType} from '../../types/film-type';

type AppProps = {
  title: string,
  genre: string,
  date: number,
  films: FilmType[]
}

function App({title, genre, date, films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = {AppRoute.Main} exact>
          <Main
            title = {title}
            genre = {genre}
            date = {date}
            films = {films}
          />
        </Route>
        <Route path = {AppRoute.SignIn} exact>
          <SignIn/>
        </Route>
        <PrivateRoute
          path = {AppRoute.MyList}
          exact
          render = {() => <MyList films = {films}/>}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route path = {AppRoute.Film} exact>
          <Film
            films = {films}
          />
        </Route>
        <Route path = {AppRoute.AddReview} exact>
          <AddReview films = {films}/>
        </Route>
        <Route path = {AppRoute.Player} exact>
          <Player
            films = {films}
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
