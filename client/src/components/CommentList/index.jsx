import "./CommentList.css";

import ProfileImage from "../../assets/images/profile.jpg";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return (
      <div className="comment-list-container">
        <div className="comment-content">
          <h3 className="comment-list-header">No Comments Yet</h3>
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
                <div className="comment-profile-image">
                  <img src={comment.commentAuthor.profilePicture}></img>
                </div>
                <div className="comment-content">
                  <h5>
                    {comment.commentAuthor.username}
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
