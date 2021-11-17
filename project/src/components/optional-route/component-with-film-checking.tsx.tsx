import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getFilmList} from '../../store/selectors';
import {FC} from 'react';
import NotFoundScreen from '../../components/not-found-screen/not-found-screen';

type Props = {
  children: React.ReactNode | React.ReactChild,
}

function ComponentWithFilmChecking ({children}: Props): FC<Props> | JSX.Element | React.ReactNode{
  const {id} = useParams<{id: string}>();
  const currentId = +id;

  const filmList = useSelector(getFilmList);

  const filmListArrayId = filmList.map((film) => film.id);

  return filmListArrayId.some((filmId) => filmId === currentId) ? {children} : <NotFoundScreen/>;
}

export default ComponentWithFilmChecking;
