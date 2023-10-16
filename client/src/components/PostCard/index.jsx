import "./PostCard.css";

import CardOverlay from "../CardOverlay";

const PostCard = ({
  postName,
  postAuthor,
  postId,
  imageUrl,
  postAuthorId,
  authId,
}) => {
  return (
    <div className="card-container">
      <img className="card-image" src={imageUrl}></img>
      <CardOverlay
        postName={postName}
        postAuthor={postAuthor}
        postId={postId}
        postAuthorId={postAuthorId}
        authId={authId}
      />
    </div>
  );
};

export default PostCard;
