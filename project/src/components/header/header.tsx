import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useSelector, useDispatch} from 'react-redux';
import {getAuthorizationStatus} from '../../store/selectors';
import {logoutAction} from '../../store/api-actions';

type HeaderProps = {
  element?: JSX.Element
}

function Header ({element}: HeaderProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <header
      className={`page-header ${element ? 'user-page__head' : 'film-card__head'}`}
    >
      <div className="logo">
        <Link className="logo__link" to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {element && element}
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to="/myList">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </Link>
          </div>
        </li>
        <li className="user-block__item">
          {authorizationStatus === AuthorizationStatus.Auth ?
            <Link
              className="user-block__link"
              to="/"
              onClick={(evt) => {
                evt.preventDefault();
                logout();
              }}
            >
                  Sign out
            </Link> :
            <Link className="user-block__link" to="/login">Sign in</Link>}
        </li>
      </ul>
    </header>
  );
}

export default Header;
