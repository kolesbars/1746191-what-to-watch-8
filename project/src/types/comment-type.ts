export type GetCommentType = {
  'id': number,
  'user': {
    'id': number,
    'name': string,
  },
  'rating': number,
  'comment': string,
  'date': string,
};

export type PostCommentType = {
  rating: number,
  comment: string,
}
