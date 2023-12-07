import "./CardOverlay.css";
import Rating from "../Rating";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST, QUERY_USER_BY_ID } from "../../utils/queries";
import { Link } from "react-router-dom";

import ExpandButton from "../../assets/images/expand.svg";
import Heart from "../../assets/images/heart-rating.svg";
import BrokenHeart from "../../assets/images/broken-heart-rating.svg";

const CardOverlay = ({
  postAuthor,
  postId,
  postAuthorId,
  authId,
  openSinglePostModal,
  modalPostId,
}) => {
  const { data, loading, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const post = data.post;

  return (
    <>
      <div className="card-overlay">
        <div className="card-user-info">
          <Link to={`/profile/${postAuthorId}`} className="card-profile-info">
            <div className="card-user-image">
              <img src={post.postAuthor.profilePicture}></img>
            </div>
            <div className="card-user-username">{postAuthor}</div>
          </Link>
          <div
            onClick={openSinglePostModal}
            className="card-expand-button"
            data-post-id={modalPostId}
          >
            <img src={ExpandButton}></img>
          </div>
        </div>
        <div className="card-post-average-container">
          <div className="average-icon">
            <div
              className={`average-icon-container ${
                post.averageRating <= 2 ? "nay" : "yay"
              } `}
            >
              <div className="icon-box">
                <img src={Heart} />
              </div>
              <div className="icon-box">
                <img src={BrokenHeart} />
              </div>
            </div>
          </div>
          <div className="card-post-average">{`${Math.round(
            post.averageRating
          )}/5`}</div>
        </div>
        {authId === postAuthorId ? null : <Rating postId={postId} />}
      </div>
    </>
  );
};

export default CardOverlay;
