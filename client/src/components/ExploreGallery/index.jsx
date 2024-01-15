import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import "./ExploreGallery.css";
import PostCard from "../PostCard";
import Auth from "../../utils/auth";

const ExploreGallery = ({ openSinglePostModal }) => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  const authId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

  const filteredPosts = posts.filter((post) => post.postAuthor._id !== authId);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="gallery">
          <div className="gallery-grid">
            {filteredPosts &&
              filteredPosts.map((post) => (
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
      )}
    </>
  );
};

export default ExploreGallery;
