import "./PostCard.css";
import CardOverlay from "../CardOverlay";

const PostCard = ({ postName, postAuthor }) => {
  return (
    <>
      <div className="card-container">
        <img src="https://placehold.co/250"></img>
        <CardOverlay postName={postName} postAuthor={postAuthor} />
      </div>
    </>
  );
};

export default PostCard;
