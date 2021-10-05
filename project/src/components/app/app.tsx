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

type Promo = {
  title: string,
  genre: string,
  date: number,
}

function App({title, genre, date}: Promo): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = {AppRoute.Main} exact>
          <Main
            title = {title}
            genre = {genre}
            date = {date}
          />
        </Route>
        <Route path = {AppRoute.SignIn} exact>
          <SignIn/>
        </Route>
        <PrivateRoute
          path = {AppRoute.MyList}
          exact
          render = {() => <MyList/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route path = {AppRoute.Film} exact>
          <Film/>
        </Route>
        <Route path = {AppRoute.AddReview} exact>
          <AddReview/>
        </Route>
        <Route path = {AppRoute.Player} exact>
          <Player/>
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
