import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_USER_BY_ID } from "../../utils/queries";
import { v4 } from "uuid";

import Auth from "../../utils/auth";
import "./PostForm.css";

const PostForm = ({ userId }) => {
  const [formState, setFormState] = useState({
    postName: "",
    imageUrl: "",
  });

  //file state for firebase
  const [selectedFile, setSelectedFile] = useState(null);
  //firebase upload logic
  const uploadImage = async (file) => {
    try {
      const storageRef = ref(
        storage,
        `images/${userId}/${new Date().toISOString()}_${v4()}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    }
  };

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

  const handleSelectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: QUERY_USER_BY_ID, variables: { id: userId } }],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(selectedFile);

      const response = await addPost({
        variables: {
          postName: formState.postName,
          imageUrl: imageUrl,
          userId: Auth.getProfile().data._id,
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

  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    console.log("Toggling modal...");
    setIsModalActive(!isModalActive);
  };

  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      setIsModalActive(false);
    }
  };

  return (
    <div className="form-post-component">
      <div className="primary-post-btn-container">
        <button className="btn post-btn primary-post-btn" onClick={toggleModal}>
          Add New Post
        </button>
      </div>
      <div
        className={`form-post-modal ${isModalActive ? "modal-active" : " "}`}
        onClick={closeModal}
      >
        <div className="form-post-container">
          {Auth.loggedIn() ? (
            <>
              <p
                className={`count-validation ${
                  characterCount === 0 || error ? "hidden" : ""
                } ${characterCount === 60 || error ? "text-danger" : ""}`}
              >
                Character Count: {characterCount}/60
              </p>
              <form className="form-add-post" onSubmit={handleFormSubmit}>
                <textarea
                  name="postName"
                  placeholder="Here's a new post..."
                  value={formState.postName}
                  className="post-form-input"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                ></textarea>
                {/* <input
                  name="imageUrl"
                  placeholder="imageUrl..."
                  value={formState.imageUrl}
                  className="post-form-input"
                  onChange={handleChange}
                ></input> */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectFile}
                ></input>

                <button className="btn post-btn" type="submit">
                  Add Post
                </button>

                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                  </div>
                )}
              </form>
            </>
          ) : (
            <p className="post-form-login">
              You need to be logged in to share your posts. Please{" "}
              <Link to="/login">login</Link> or{" "}
              <Link to="/signup">signup.</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
