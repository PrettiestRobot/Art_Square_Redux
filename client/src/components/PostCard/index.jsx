import "./PostCard.css";

import CardOverlay from "../CardOverlay";

const PostCard = ({
  postName,
  postAuthor,
  postId,
  imageUrl,
  postAuthorId,
  authId,
  openSinglePostModal,
  modalPostId,
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
        openSinglePostModal={openSinglePostModal}
        modalPostId={modalPostId}
      />
    </div>
  );
};

export default PostCard;
