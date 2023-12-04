import { Link } from "react-router-dom";
import "./PostList.css";
import PostCard from "../PostCard";
import Auth from "../../utils/auth";

const PostList = ({ openSinglePostModal, posts }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  const authId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="gallery-item">
              <PostCard
                postName={post.postName}
                postAuthor={post.postAuthor.username}
                postAuthorId={post.postAuthor._id}
                imageUrl={post.imageUrl}
                postId={post._id}
                authId={authId}
                openSinglePostModal={openSinglePostModal}
                modalPostId={post._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
