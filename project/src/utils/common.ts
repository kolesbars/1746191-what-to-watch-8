import {FilmType, FilmFromServerType} from '../types/film-type';

const FilterFilmsByGenre = (filmsList: FilmType[] , genre: string): FilmType[] => {
  if (genre === 'All genres') {
    return filmsList;
  }

  return filmsList.filter((film) => film.genre === genre);
};

function adaptToClient(film: FilmFromServerType): FilmType {

  const adaptedFilm = Object.assign (
    {},
    film,
    {
      'posterImage': film['poster_image'],
      'previewImage': film['preview_image'],
      'backgroundImage': film['background_image'],
      'backgroundColor': film['background_color'],
      'videoLink': film['video_link'],
      'previewVideoLink': film['preview_video_link'],
      'scoresCount': film['scores_count'],
      'runTime': film['run_time'],
      'isFavorite': film['is_favorite'],
    },
  );

  return adaptedFilm;
}

export {FilterFilmsByGenre, adaptToClient};

