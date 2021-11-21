import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import {useSelector} from 'react-redux';
import {getAuthorizationStatus} from '../../store/selectors';

type RouteForGuestsProps = RouteProps & {
  render: () => JSX.Element;
}

function RouteForGuests(props: RouteForGuestsProps): JSX.Element {
  const {exact, path, render} = props;

  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.NoAuth
          ? render()
          : <Redirect to={AppRoute.Main} />
      )}
    />
  );
}

export default RouteForGuests;
