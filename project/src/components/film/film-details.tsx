import {FilmType} from '../../types/film-type';
import {useState} from 'react';

type FilmDetailsProps = {
  data: FilmType
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
  const {data} = props;
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

          <p className="film-card__starring"><strong>Starring: {starring.join(',')}</strong></p>
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
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed films in years.</p>

              <footer className="review__details">
                <cite className="review__author">Kate Muir</cite>
                <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,9</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">Andersons films are too precious for some, but for those of us willing to lose ourselves in them, theyre a delight. The Grand Budapest Hotel is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

              <footer className="review__details">
                <cite className="review__author">Bill Goodykoontz</cite>
                <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,0</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">I didnt find it amusing, and while I can appreciate the creativity, its an hour and 40 minutes I wish I could take back.</p>

              <footer className="review__details">
                <cite className="review__author">Amanda Greever</cite>
                <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,0</div>
          </div>
        </div>
        <div className="film-card__reviews-col">
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

              <footer className="review__details">
                <cite className="review__author">Matthew Lickona</cite>
                <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">7,2</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

              <footer className="review__details">
                <cite className="review__author">Paula Fleri-Soler</cite>
                <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">7,6</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

              <footer className="review__details">
                <cite className="review__author">Paula Fleri-Soler</cite>
                <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">7,0</div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default FilmDetails;
