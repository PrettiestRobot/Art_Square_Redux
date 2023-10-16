import "./Profile.css";
import PostList from "../../components/PostList";
import ProfileBanner from "../../components/ProfileBanner";
import { useQuery } from "@apollo/client";
import { QUERY_USER_BY_ID } from "../../utils/queries";
import { useParams } from "react-router-dom";

import ProfileImage from "../../assets/images/profile.jpg";

const Profile = () => {
  const { userId } = useParams();
  const { data, loading, error } = useQuery(QUERY_USER_BY_ID, {
    variables: { id: userId },
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.userById || {};
  const userPosts = user.posts || [];

  //calculate a users overal rating
  const totalRating = user.posts.reduce(
    (sum, post) => sum + post.averageRating,
    0
  );
  const averageRating = totalRating / user.posts.length;

  console.log(averageRating);

  //adjust posts to fit the predefined props of PostList
  const posts = userPosts.map((post) => ({
    _id: post._id,
    postName: post.postName,
    postAuthor: {
      username: user.username,
      _id: user._id,
    },
    imageUrl: post.imageUrl,
    postId: post._id,
  }));

  return (
    <div>
      <div className="user">
        <div className="layout-container">
          <ProfileBanner user={user} userRating={averageRating} />
        </div>
        <div className="layout-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts.reverse()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
