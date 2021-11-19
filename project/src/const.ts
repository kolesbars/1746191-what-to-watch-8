export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film ='/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player',
  NotFoundScreen = '/notfound'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  Favorite = '/favorite'
}

export const emptyFilm = {
  'id': 1,
  'name': '',
  'posterImage': '',
  'previewImage': '',
  'backgroundImage': '',
  'backgroundColor': '',
  'videoLink': '',
  'previewVideoLink': '',
  'description': '',
  'rating': 0,
  'scoresCount': 0,
  'director': '',
  'starring': [''],
  'runTime': 0,
  'genre': 'Comedy',
  'released': 0,
  'isFavorite': false};

export const emptyComment = {
  'id': 0,
  'user': {
    'id': 0,
    'name': '',
  },
  'rating': 0,
  'comment': '',
  'date': '',
};
