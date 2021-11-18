import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getFilmList} from '../../store/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';


type Props = {
  children: JSX.Element,
}

function ComponentWithFilmChecking ({children}: Props): JSX.Element {
  const {id} = useParams<{id: string}>();
  const currentId = +id;

  const filmList = useSelector(getFilmList);

  const filmListArrayId = filmList.map((film) => film.id);
  // eslint-disable-next-line no-console
  console.log(filmListArrayId);
  return filmListArrayId.some((filmId) => currentId === filmId)
    ? children
    : (<NotFoundScreen/>);
}

export default ComponentWithFilmChecking;
