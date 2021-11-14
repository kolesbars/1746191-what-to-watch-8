import {FilmType} from '../../types/film-type';
import {GetCommentType} from '../../types/comment-type';
import {useState} from 'react';
import Comment from './comment';

type FilmDetailsProps = {
  data: FilmType,
  comments: GetCommentType[]
}

const getRatingName = (rating: number) => {
  if (rating < 3) {
    return 'Bad';
  } else if (rating < 5) {
    return 'Normal';
  } else if (rating < 8) {
    return 'Good';
  } else if (rating < 10) {
    return 'Very good';
  }
  return 'Awesome';
};

const getRunTime = (time: number): string => {
  if (time > 60) {
    return `${Math.floor(time/60)}h ${time%60}m`;
  }
  return `${time}m`;
};

function FilmDetails(props: FilmDetailsProps): JSX.Element {
  const {data, comments} = props;
  const {rating, scoresCount, description, director, starring, runTime, genre, released} = data;

  const [currentTab, setTab] = useState('Overview');

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={`film-nav__item ${currentTab === 'Overview' ? 'film-nav__item--active' : ''}`}
            onClick={(evt) => {
              evt.preventDefault();
              setTab('Overview');
            }}
          >
            <a href="{url}" className="film-nav__link">Overview</a>
          </li>
          <li
            className={`film-nav__item ${currentTab === 'Details' ? 'film-nav__item--active' : ''}`}
            onClick={(evt) => {
              evt.preventDefault();
              setTab('Details');
            }}
          >
            <a href="{url}" className="film-nav__link">Details</a>
          </li>
          <li
            className={`film-nav__item ${currentTab === 'Reviews' ? 'film-nav__item--active' : ''}`}
            onClick={(evt) => {
              evt.preventDefault();
              setTab('Reviews');
            }}
          >
            <a href="{url}" className="film-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>

      {currentTab === 'Overview' &&
      <>
        <div className="film-rating">
          <div className="film-rating__score">{rating}</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">{getRatingName(rating)}</span>
            <span className="film-rating__count">{scoresCount} ratings</span>
          </p>
        </div>

        <div className="film-card__text">
          {description}

          <p className="film-card__director"><strong>Director: {director}</strong></p>

          <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
        </div>
      </>}

      {currentTab === 'Details' &&
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">{director}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {starring.join(',')}
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{getRunTime(runTime)}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value">{genre}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{released}</span>
          </p>
        </div>
      </div>}

      {currentTab === 'Reviews' &&
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          {comments.filter((e,i )=> !(i%2)).map((comment) => {
            const keyValue = comment.id;
            return (
              <Comment
                key = {keyValue}
                commentData = {comment}
              />);
          })}
        </div>
        <div className="film-card__reviews-col">
          {comments.filter((e,i )=> (i%2)).map((comment) => {
            const keyValue = comment.id;
            return (
              <Comment
                key = {keyValue}
                commentData = {comment}
              />);
          })}
        </div>
      </div>}
    </div>
  );
}

export default FilmDetails;
