// Import the `useParams()` hook
import "./SinglePost.css";
import { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import Heart from "../../assets/images/heart-rating.svg";
import BrokenHeart from "../../assets/images/broken-heart-rating.svg";

import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import Auth from "../../utils/auth";
import { QUERY_SINGLE_POST } from "../../utils/queries";
import { ADD_TAG_TO_POST } from "../../utils/mutations";

const SinglePost = ({ closeModal, postId }) => {
  const [tagInput, setTagInput] = useState("");
  const [addTagToPost, { error }] = useMutation(ADD_TAG_TO_POST, {
    refetchQueries: [QUERY_SINGLE_POST, "getSinglePost"],
  });
  //query single post from url parameter
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  const postAuthor = post?.postAuthor?._id || "";
  const currentUser = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    const trimmedTagInput = tagInput.trim();
    if (!trimmedTagInput) {
      alert("Please enter a tag");
      return;
    }

    const tags = trimmedTagInput.split(",").map((tag) => tag.trim());
    //create a promise for each tag to be added to the post
    const mutationPromises = tags.map((tag) =>
      addTagToPost({
        variables: { postId: postId, tag: tag },
      })
    );
    try {
      //wait for all promises to be resolved
      await Promise.all(mutationPromises);
    } catch (err) {
      console.error("Error creating post:", err);
    }
    setTagInput("");
  };

  useEffect(() => {
    let timer;
    const modal = document.querySelector(".sp-modal");
    const spContainer = document.querySelector(".sp-container");
    if (modal) {
      // Add a slight delay before adding the class to allow the DOM to update
      timer = setTimeout(() => {
        modal.classList.add("sp-modal-visible");
        spContainer.classList.add("sp-modal-visible");
      }, 10); // A delay of 10 milliseconds
    }
    return () => {
      if (modal) {
        modal.classList.remove("sp-modal-visible");
        spContainer.classList.remove("sp-modal-visible");
      }
      clearTimeout(timer); // Clear the timeout if the component unmounts before the class is added
    };
  }, []);

  return (
    <div className="sp-modal" onClick={closeModal}>
      <div className="sp-container">
        <div className="sp-image-container">
          <img className="sp-image" src={post.imageUrl}></img>
        </div>
        <div className="sp-container-column">
          <div className="sp-header">
            <div className="sp-header-left">
              <div className="sp-post-author">
                <div className="sp-author-image-container">
                  <img src={post.postAuthor.profilePicture} />
                </div>
                <h4>{post.postAuthor.username}</h4>
              </div>
            </div>
            <h3 className="sp-title">{post.postName}</h3>
            <div className="sp-header-right">
              <div className="sp-icon-box">
                <img src={post.averageRating >= 2 ? Heart : BrokenHeart} />
              </div>
              <div className="sp-card-post-average">{`${Math.round(
                post.averageRating
              )}/5`}</div>
            </div>
          </div>
          {/* <div className="tag-form-container">
            <div className="tags-container">
              {post.tags.map((tag) => (
                <button className="tag" key={tag}>
                  {tag}
                </button>
              ))}
            </div>
            {currentUser && currentUser === postAuthor ? (
              <form className="form-tags" onSubmit={handleTagSubmit}>
                <button type="submit">Add Tags</button>
                <input
                  type="text"
                  value={tagInput}
                  placeholder="Enter tags separated by commas"
                  onChange={(e) => setTagInput(e.target.value)}
                ></input>
              </form>
            ) : null}
          </div> */}

          <CommentList comments={post.comments} />
          <CommentForm thisPostId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
