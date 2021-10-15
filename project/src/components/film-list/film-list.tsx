import {useState} from 'react';
import {FilmType} from '../../types/film-type';
import FilmCard from '../../components/film-card/film-card';

type FilmListProps = {
  films: FilmType[]
}

function FilmList(props: FilmListProps): JSX.Element {

  const [, setActiveFilm] = useState(0);

  return (
    <>
      {props.films.map((film, id) => {
        const keyValue = `${film.id}`;
        return (
          <FilmCard
            film = {film}
            key={keyValue}
            setActiveFilm = {setActiveFilm}
          />
        );
      })}
    </>);
}

export {FilmList};
