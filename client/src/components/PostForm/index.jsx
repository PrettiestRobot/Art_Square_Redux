import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";

import Auth from "../../utils/auth";

const PostForm = () => {
  const [formState, setFormState] = useState({
    postName: "",
    imageUrl: "",
  });

  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    if (name === "postName" && value.length <= 60) {
      setCharacterCount(value.length);
    }
  };

  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [QUERY_POSTS, "getPosts"],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addPost({
        variables: {
          postName: formState.postName,
          postAuthor: Auth.getProfile().data.username,
          imageUrl: formState.imageUrl,
        },
      });

      console.log("Post created:", response.data.addPost);

      setFormState({
        postName: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 60 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/60
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="postName"
                placeholder="Here's a new post..."
                value={formState.postName}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
              <input
                name="imageUrl"
                placeholder="imageUrl..."
                value={formState.imageUrl}
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
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

export default PostForm;
