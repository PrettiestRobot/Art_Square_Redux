// Import the `useParams()` hook
import "./SinglePost.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Heart from "../../assets/images/heart-rating.svg";
import BrokenHeart from "../../assets/images/broken-heart-rating.svg";
import TagsButton from "../../assets/images/tags-button.svg";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import Auth from "../../utils/auth";
import { QUERY_SINGLE_POST } from "../../utils/queries";
import { ADD_TAG_TO_POST, REMOVE_TAG_FROM_POST } from "../../utils/mutations";
import NavBrand from "../../assets/images/desktop_brand.svg";
import { Link } from "react-router-dom";

const SinglePost = ({ closeModal, postId }) => {
  const [tagInput, setTagInput] = useState("");
  const [tagListToggle, setTagListToggle] = useState(false);

  useEffect(() => {
    let timer;
    const modal = document.querySelector(".show-card-modal");
    const spContainer = document.querySelector(".show-card-container");
    if (modal) {
      // Add a slight delay before adding the class to allow the DOM to update
      timer = setTimeout(() => {
        modal.classList.add("show-card-modal-visible");
        spContainer.classList.add("show-card-modal-visible");
      }, 10); // A delay of 10 milliseconds
    }
    return () => {
      if (modal) {
        modal.classList.remove("show-card-modal-visible");
        spContainer.classList.remove("show-card-modal-visible");
      }
      clearTimeout(timer); // Clear the timeout if the component unmounts before the class is added
    };
  }, []);

  const [addTagToPost, { error: addTagError }] = useMutation(ADD_TAG_TO_POST, {
    refetchQueries: [{ query: QUERY_SINGLE_POST, variables: { postId } }],
  });

  const [removeTagFromPost, { error: removeTagError }] = useMutation(
    REMOVE_TAG_FROM_POST,
    {
      refetchQueries: [{ query: QUERY_SINGLE_POST, variables: { postId } }],
    }
  );
  //query single post from url parameter
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  console.log(data.post);

  const postAuthor = post?.postAuthor?._id || "";
  const currentUser = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemoveTag = async (event) => {
    const tagId = event.currentTarget.getAttribute("data-tag-id");

    try {
      await removeTagFromPost({
        variables: { postId, tagId },
      });
    } catch (error) {
      console.error("Error removing tag:", error);
    }
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    const trimmedTagInput = tagInput.trim();
    if (!trimmedTagInput) {
      alert("Please enter a tag");
      return;
    }

    const tags = trimmedTagInput.split(",").map((tag) => tag.trim());
    console.log(tags);

    // Use Promise.all to asynchronously add each tag to the post
    await Promise.all(
      tags.map(async (tag) => {
        try {
          // Add the current tag to the post
          await addTagToPost({
            variables: { postId, tag: tag },
          });
        } catch (error) {
          console.error("Error adding tag:", error, addTagError);
        }
      })
    );

    setTagInput("");
  };

  const handleTagButton = (e) => {
    setTagListToggle(!tagListToggle);
  };

  return (
    <div className="show-card-modal" onClick={closeModal}>
      <div className="show-card-mobile-nav">
        <div className="nav-contents">
          <div className="nav-left">
            <Link to="/">
              <img className="nav-brand" src={NavBrand} alt="Art Square Logo" />
            </Link>
          </div>
          <div className="nav-right">
            <button className="nav-btn" onClick={closeModal}>
              Back
            </button>
          </div>
        </div>
      </div>
      <div className="show-card-container">
        <div className="show-card-header">
          <div className="show-card-header-left">
            <div className="show-card-header-left-image-container">
              <img
                className="show-card-header-left-image"
                src={post.postAuthor.profilePicture}
              />
            </div>
            <h4 className="show-card-header-left-username">
              {post.postAuthor.username}
            </h4>
          </div>
          <div className="show-card-header-title">
            <h3>{post.postName}</h3>
          </div>
          <div className="show-card-header-right">
            <div className="show-card-rating-icon-box">
              <img
                className="show-card-rating-icon"
                src={post.averageRating >= 2 ? Heart : BrokenHeart}
              />
            </div>
            <div className="show-card-average">{`${Math.round(
              post.averageRating
            )}/5`}</div>
          </div>
        </div>
        <div className="show-card-image-container">
          <div className="tags-container">
            <div
              className={`tag-form-container ${
                tagListToggle ? "tag-active" : ""
              }`}
              id="tag-form-container"
            >
              <div className="tag-list-container">
                <div
                  className={`tags-list ${tagListToggle ? "tag-active" : ""}`}
                >
                  {post.tags.map((tag) => (
                    <div className="tag" key={tag}>
                      {tag.tagName}
                      <div
                        className="tag-delete"
                        data-tag-id={tag._id}
                        onClick={handleRemoveTag}
                      >
                        x
                      </div>
                    </div>
                  ))}
                </div>
                <div className="tags-button-container">
                  <img src={TagsButton} onClick={handleTagButton} />
                </div>
              </div>

              {currentUser && currentUser === postAuthor ? (
                <form
                  className={`form-tags ${tagListToggle ? "tag-active" : ""}`}
                  onSubmit={handleTagSubmit}
                >
                  <button type="submit">Tag</button>
                  <input
                    type="text"
                    value={tagInput}
                    placeholder="Enter tags separated by commas"
                    onChange={(e) => setTagInput(e.target.value)}
                  ></input>
                </form>
              ) : null}
            </div>
          </div>
          <img className="show-card-image" src={post.imageUrl} />
        </div>
        <div className="show-card-comment-list">
          <CommentList comments={post.comments} />
        </div>
        <div className="show-card-comment-form">
          <CommentForm thisPostId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
