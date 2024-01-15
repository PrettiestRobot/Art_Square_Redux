import "./FollowList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Heart from "../../assets/images/heart-rating.svg";
import BrokenHeart from "../../assets/images/broken-heart-rating.svg";
import { QUERY_FOLLOWED_USERS } from "../../utils/queries";

const FollowList = ({ FollowedIds = [] }) => {
  // Use the useQuery hook to fetch data
  const { data, loading, error } = useQuery(QUERY_FOLLOWED_USERS, {
    variables: { ids: FollowedIds },
    skip: FollowedIds.length === 0,
  });

  //loop through data, average the ratings of data.posts each object in data.followedUsers and push a new object to followedUsersAudited
  const followedUsersAudited = data?.followedUsers.map((user) => {
    if (user.posts.length === 0) {
      return {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
        posts: user.posts,
        averageRating: "No posts",
      };
    }

    const totalRating = user.posts.reduce(
      (sum, post) => sum + post.averageRating,
      0
    );
    const averageRating = totalRating / user.posts.length;

    return {
      _id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      posts: user.posts,
      averageRating: averageRating,
    };
  });

  console.log(followedUsersAudited);

  // Handle loading state
  if (loading) {
    return <div>Loading followed users...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if data is available and has followed users
  const hasFollowedUsers = data?.followedUsers?.length > 0;

  // Handle case where there are no followed users
  if (!hasFollowedUsers) {
    return <div className="follow-list-header">No Followed Users</div>;
  }

  // Render the list of followed users
  return (
    <div className="follow-list">
      <div className="follow-list-grid">
        {followedUsersAudited.map((user) => (
          <Link
            to={`/profile/${user._id}`}
            key={user._id}
            className="followed-user-card"
          >
            <div className="followed-user-card-left">
              <img src={user.profilePicture} />
            </div>
            <div className="follower-icon-box">
              <img src={user.averageRating >= 2 ? Heart : BrokenHeart} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowList;
