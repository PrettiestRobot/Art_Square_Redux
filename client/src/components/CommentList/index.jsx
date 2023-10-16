import "./CommentList.css";

import ProfileImage from "../../assets/images/profile.jpg";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="comment-list-header">No Comments Yet</h3>;
  }

  // return (
  //   <>
  //     <h3 className="comment-list-header">Comments</h3>
  //     <div className="comment-list-container">
  //       {comments &&
  //         comments.map((comment) => (
  //           <div key={comment._id} className="comments-container">
  //             <div className="comment-content">
  //               <div className="comment-profile-container">
  //                 <div className="comment-profile-image">
  //                   <img src={ProfileImage}></img>
  //                 </div>
  //                 <div className="comment-profile">
  //                   <h5 className="">
  //                     {comment.username} <br></br>
  //                     <span className="comment-date">{comment.createdAt}</span>
  //                   </h5>
  //                 </div>
  //               </div>
  //               <div className="comment-text-box">
  //                 <p className="card-body">{comment.commentText}</p>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //     </div>
  //   </>
  // );

  return (
    <>
      <h3 className="comment-list-header">Comments</h3>
      <div className="comment-list-container">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="comment-container">
              <div className="comment-profile-image">
                <img src={ProfileImage}></img>
              </div>
              <div className="comment-content">
                <h5>
                  {comment.username} <br></br>
                  <span className="comment-date">{comment.createdAt}</span>
                </h5>
                <div className="comment-text-box">
                  <p className="card-body">{comment.commentText}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
