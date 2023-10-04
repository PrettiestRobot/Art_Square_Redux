import { Link } from "react-router-dom";
import "./PostList.css";
import PostCard from "../PostCard";

// const PostList = ({ posts, title }) => {
//   if (!posts.length) {
//     return <h3>No Posts Yet</h3>;
//   }

//   return (
//     <div>
//       <h3>{title}</h3>
//       {posts &&
//         posts.map((post) => (
//           <div key={post._id} className="card mb-3">
//             <h4 className="card-header bg-primary text-light p-2 m-0">
//               {post.postAuthor} <br />
//               <span style={{ fontSize: "1rem" }}>
//                 had this post on {post.createdAt}
//               </span>
//             </h4>
//             <div className="card-body bg-light p-2">
//               <p>{post.postName}</p>
//             </div>
//             <Link
//               className="btn btn-primary btn-block btn-squared"
//               to={`/posts/${post._id}`}
//             >
//               Join the discussion on this post.
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default PostList;

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="gallery-item">
              <PostCard postName={post.postName} postAuthor={post.postAuthor} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
