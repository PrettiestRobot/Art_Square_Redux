import "./CommentList.css";
import { Link } from "react-router-dom";

const CommentList = ({ comments = [] }) => {
  console.log(comments);
  if (!comments.length) {
    return (
      <div className="comment-list-container">
        <div className="comment-null-container">
          <h3 className="comment-null">No Comments Yet</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className="comment-list">
        {comments &&
          comments.map((comment) => (
            <li key={comment._id} className="comment">
              <Link
                to={`/profile/${comment.commentAuthor._id}`}
                className="comment-author-image-container"
              >
                <img
                  className="comment-author-image"
                  src={comment.commentAuthor.profilePicture}
                ></img>
              </Link>
              <div className="comment-contents">
                <h5 className="comment-head">
                  <Link to={`/profile/${comment.commentAuthor._id}`}>
                    {comment.commentAuthor.username}
                  </Link>
                  <span className="comment-date">{comment.createdAt}</span>
                </h5>

                <p className="comment-body">{comment.commentText}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CommentList;
