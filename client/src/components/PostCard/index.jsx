import "./PostCard.css";

import CardOverlay from "../CardOverlay";

const PostCard = ({ postName, postAuthor, postId, imageUrl }) => {
  return (
    <div className="card-container">
      <img className="card-image" src={imageUrl}></img>
      <CardOverlay
        postName={postName}
        postAuthor={postAuthor}
        postId={postId}
      />
    </div>
  );
};

export default PostCard;
