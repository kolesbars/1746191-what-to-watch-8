import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import {useSelector} from 'react-redux';
import {getAuthorizationStatus} from '../../store/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render} = props;

  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
