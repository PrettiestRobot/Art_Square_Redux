import "./PostCard.css";
import CardOverlay from "../CardOverlay";

const PostCard = ({ postName, postAuthor, imageUrl }) => {
  return (
    <>
      <div className="card-container">
        <img src={imageUrl}></img>
        <CardOverlay postName={postName} postAuthor={postAuthor} />
      </div>
    </>
  );
};

export default PostCard;
