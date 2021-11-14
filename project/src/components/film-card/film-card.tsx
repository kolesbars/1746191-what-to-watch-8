import {FilmType} from '../../types/film-type';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import VideoPlayer from './videoplayer';
import {updateFilmId} from '../../store/action';
import {useDispatch} from 'react-redux';

type FilmsCardProps = {
  film: FilmType
  activeFilm: number
  setActiveFilm: (id: number) => void
}

function FilmCard(props: FilmsCardProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage, previewVideoLink} = film;

  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [timeOutForMouseEnter, setTimeOutForMouseEnter] = useState(setTimeout(() => null, 1000));

  const dispatch = useDispatch();

  const onUpdateFilmId = (currentFilmId: number) => {
    dispatch(updateFilmId(currentFilmId));
  };

  useEffect(() => {
    if (isMouseEnter) {
      setIsVideo(true);
    }

    return () => {
      setIsVideo(false);
      clearTimeout(timeOutForMouseEnter);
    };
  }, [isMouseEnter, timeOutForMouseEnter]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter = {() => {
        props.setActiveFilm(id);
        const TimeOutId = setTimeout(() => {
          setIsMouseEnter(true);
        }, 1000);
        setTimeOutForMouseEnter(TimeOutId);
      }}

      onMouseLeave = {() => {
        props.setActiveFilm(0);
        clearTimeout(timeOutForMouseEnter);
        setIsMouseEnter(false);
      }}

      onClick = {(evt) => {
        evt.preventDefault();
        onUpdateFilmId(id);
      }}
    >
      <div className="small-film-card__image">
        {isVideo ?
          <VideoPlayer
            src = {previewVideoLink}
            isPlaing = {id === props.activeFilm}
          /> :
          <img src={previewImage} alt={name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{name}</Link>
      </h3>
    </article>);
}

export default FilmCard;

