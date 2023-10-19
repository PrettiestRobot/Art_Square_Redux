// Import the `useParams()` hook
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";

import { QUERY_SINGLE_POST } from "../../utils/queries";

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  console.log(post);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="single-post-page">
      <div className="single-post">
        <div className="single-post-container">
          <h3 className="single-post-header">
            {post.postName} <br />
            <span className="single-post-sub-head">
              Posted on {post.createdAt}
            </span>
          </h3>
          <div className="single-post-image-container">
            <img className="single-post-image" src={post.imageUrl}></img>
          </div>
        </div>

        <div className="comments-container">
          <CommentList comments={post.comments} />
          <CommentForm thisPostId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
