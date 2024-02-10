import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "./CommentForm.css";
import Send from "../../assets/images/send-button.svg";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_SINGLE_POST } from "../../utils/queries";

import Auth from "../../utils/auth";

const CommentForm = ({ thisPostId }) => {
  const [formState, setFormState] = useState({
    commentText: "",
  });

  const currentUser = Auth.loggedIn()
    ? Auth.getProfile().data.profilePicture
    : "";

  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    if (name === "commentText" && value.length <= 60) {
      setCharacterCount(value.length);
    }
  };

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [QUERY_SINGLE_POST, "getSinglePost"],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addComment({
        variables: {
          postId: thisPostId,
          commentText: formState.commentText,
          commentAuthor: Auth.getProfile().data._id,
          username: Auth.getProfile().data.username,
        },
      });

      console.log("comment created:", response.data.addComment);

      setFormState({
        commentText: "",
      });
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  return (
    // <div className="comment-form-component">
    //   {Auth.loggedIn() ? (
    //     <div className="comment-form-container">
    //       <form className="comment-form" onSubmit={handleFormSubmit}>
    //         <div className="comment-input-container">
    //           <div className="current-user-image">
    //             <img src={currentUser} />
    //           </div>
    //           <textarea
    //             name="commentText"
    //             placeholder="Add your comment..."
    //             value={formState.commentText}
    //             className="form-input"
    //             style={{ lineHeight: "1.5", resize: "vertical" }}
    //             onChange={handleChange}
    //           ></textarea>
    //           <button className="send-button" type="submit">
    //             <img src={Send} />
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   ) : (
    //     <div className="comment-form-container">
    //       <p>You need to be logged in to share your posts.</p>
    //       <p>
    //         Please <Link to="/">login</Link> or <Link to="/">signup.</Link>
    //       </p>
    //     </div>
    //   )}
    // </div>
    <>
      {Auth.loggedIn() ? (
        <form className="comment-form" onSubmit={handleFormSubmit}>
          <div className="comment-form-user-image-container">
            <img
              className="comment-form-user-image-container"
              src={currentUser}
            />
          </div>
          <textarea
            name="commentText"
            placeholder="   Add your comment..."
            value={formState.commentText}
            className="comment-form-input"
            onChange={handleChange}
          ></textarea>
          <button className="comment-submit-button" type="submit">
            <img className="comment-submit-button-icon" src={Send} />
          </button>
        </form>
      ) : (
        <div className="comment-form-validation">
          <p>You need to be logged in to share your posts.</p>
          <p>
            Please{" "}
            <Link className="validation-link" to="/">
              login
            </Link>{" "}
            or{" "}
            <Link className="validation-link" to="/">
              signup.
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default CommentForm;
