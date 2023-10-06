import { Link } from "react-router-dom";
import "./PostList.css";
import PostCard from "../PostCard";

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="gallery-item">
              <PostCard
                postName={post.postName}
                postAuthor={post.postAuthor}
                imageUrl={post.imageUrl}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
