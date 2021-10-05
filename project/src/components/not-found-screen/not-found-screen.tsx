import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default NotFoundScreen;
