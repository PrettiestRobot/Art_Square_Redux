import "./CardOverlay.css";
import Rating from "../Rating";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST, QUERY_USER_BY_ID } from "../../utils/queries";
import { Link } from "react-router-dom";

import ProfileImage from "../../assets/images/profile.jpg";
import ExpandButton from "../../assets/images/expand.svg";

const CardOverlay = ({ postAuthor, postId, postAuthorId, authId }) => {
  const { data, loading, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const post = data.post;

  return (
    <div className="card-overlay">
      <div className="card-user-info">
        <Link to={`/profile/${postAuthorId}`} className="card-profile-info">
          <div className="card-user-image">
            <img src={post.postAuthor.profilePicture}></img>
          </div>
          <div className="card-user-username">{postAuthor}</div>
        </Link>
        <Link to={`/posts/${postId}`} className="card-expand-button">
          <img src={ExpandButton}></img>
        </Link>
      </div>
      <h3 className="card-post-average">{`${Math.round(
        post.averageRating
      )}/5`}</h3>
      {authId === postAuthorId ? (
        <div className="card-post-edit">
          <Link to={`/posts/${postId}/edit`}>Edit</Link>
        </div>
      ) : (
        <Rating postId={postId} />
      )}
    </div>
  );
};

export default CardOverlay;
