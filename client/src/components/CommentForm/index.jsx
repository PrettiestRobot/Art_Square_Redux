import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "./CommentForm.css";

import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_SINGLE_POST } from "../../utils/queries";

import Auth from "../../utils/auth";

const CommentForm = ({ thisPostId }) => {
  const [formState, setFormState] = useState({
    commentText: "",
  });

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

      console.log("Post created:", response.data.addPost);

      setFormState({
        commentText: "",
      });
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="comment-form-container">
      <h4>What are your thoughts on this post?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 60 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/60
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form className="comment-form" onSubmit={handleFormSubmit}>
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={formState.commentText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
