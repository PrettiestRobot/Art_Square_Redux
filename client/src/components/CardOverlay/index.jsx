import "./CardOverlay.css";
import Rating from "../Rating";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../utils/queries";

import ProfileImage from "../../assets/images/profile.jpg";
import ExpandButton from "../../assets/images/expand.svg";

const CardOverlay = ({ postName, postAuthor, postId }) => {
  const { data, loading, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const post = data.post;

  return (
    <div className="card-overlay">
      <div className="card-user-info">
        <a href="" className="card-profile-info">
          <div className="card-user-image">
            <img src={ProfileImage}></img>
          </div>
          <div className="card-user-username">{postAuthor}</div>
        </a>
        <div className="card-expand-button">
          <img src={ExpandButton}></img>
        </div>
      </div>
      <h3 className="card-post-average">{`${Math.round(
        post.averageRating
      )}/5`}</h3>
      <Rating postId={postId} />
    </div>
  );
};

export default CardOverlay;
