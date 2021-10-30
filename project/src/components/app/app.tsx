import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../const';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';

type AppProps = {
  title: string,
  genre: string,
  date: number,
}

const mapStateToProps = ({filmList}: State) => ({
  filmList,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppProps;

function App({title, genre, date, filmList}: ConnectedComponentProps): JSX.Element {
  return (
    <BrowserRouter>
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
        <Route path = {AppRoute.Film} exact>
          <Film
            films = {filmList}
          />
        </Route>
        <Route path = {AppRoute.AddReview} exact>
          <AddReview films = {filmList}/>
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

export {App};
export default connector(App);
