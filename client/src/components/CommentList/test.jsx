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
      <div className="comment-list-container">
        <div className="comment-list">
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="comment-container">
                <Link
                  to={`/profile/${comment.commentAuthor._id}`}
                  className="comment-profile-image"
                >
                  <img src={comment.commentAuthor.profilePicture}></img>
                </Link>
                <div className="comment-content">
                  <h5>
                    <Link to={`/profile/${comment.commentAuthor._id}`}>
                      {comment.commentAuthor.username}
                    </Link>
                    <span className="comment-date">{comment.createdAt}</span>
                  </h5>
                  <div className="comment-text-box">
                    <p className="card-body">{comment.commentText}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CommentList;
