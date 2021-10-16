import {FilmType} from '../../types/film-type';
import {Link} from 'react-router-dom';

type FilmsCardProps = {
  film: FilmType
  setActiveFilm: (id: number) => void
}

function FilmCard(props: FilmsCardProps): JSX.Element {
  const {film} = props;
  const {name, previewImage} = film;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter = {() => {
      props.setActiveFilm(film.id);
    }}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/:${film.id}`}>{name}</Link>
      </h3>
    </article>);
}

export default FilmCard;
