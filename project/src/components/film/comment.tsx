import {GetCommentType} from '../../types/comment-type';
import dayjs from 'dayjs';

type CommentProps = {
  commentData: GetCommentType;
}

function Comment ({commentData}: CommentProps):JSX.Element {
  const {user, rating, comment, date} = commentData;
  const commentDate = dayjs(date).format('MMMM D, YYYY');

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">{commentDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>);
}

export default Comment;
