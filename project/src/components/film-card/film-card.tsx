import {FilmType} from '../../types/film-type';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import VideoPlayer from './videoplayer';

type FilmsCardProps = {
  film: FilmType
  activeFilm: number
  setActiveFilm: (id: number) => void
}

function FilmCard(props: FilmsCardProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage, previewVideoLink} = film;

  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [cardView, setCardView] = useState(<img src={previewImage} alt={name} width="280" height="175" />);

  useEffect(() => {
    if (isMouseEnter) {
      setCardView(
        <VideoPlayer
          src = {previewVideoLink}
          isPlaing = {id === props.activeFilm}
        />);
    } else {
      setCardView(<img src={previewImage} alt={name} width="280" height="175" />);
    }
  }, [isMouseEnter]);

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter = {() => {
      props.setActiveFilm(film.id);
      setTimeout(() => {
        setIsMouseEnter(true);
      }, 1000);
    }}

    onMouseLeave = {() => {
      setTimeout(() => {
        setIsMouseEnter(false);
      }, 1000);
    }}
    >
      <div className="small-film-card__image">
        {cardView}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{name}</Link>
      </h3>
    </article>);
}

export default FilmCard;

