import "./FollowList.css";
import { Link } from "react-router-dom";
import { useState, useLayoutEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import Heart from "../../assets/images/heart-rating.svg";
import BrokenHeart from "../../assets/images/broken-heart-rating.svg";
import { QUERY_FOLLOWED_USERS } from "../../utils/queries";

const FollowList = ({ FollowedIds = [] }) => {
  const [rightFollowButtonActive, setRightFollowButtonActive] = useState(true);
  const [leftFollowButtonActive, setLeftFollowButtonActive] = useState(true);
  const [scrollWidth, setScrollWidth] = useState(0);

  const [scrollPosition, setScrollPosition] = useState(0);

  const followListGridRef = useRef();

  // Scrolloing functionality
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;

    setScrollPosition(newScrollPosition);

    followListGridRef.current.scrollLeft = newScrollPosition;
  };

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

  useLayoutEffect(() => {
    if (followListGridRef.current) {
      setScrollWidth(followListGridRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (followListGridRef.current) {
        setScrollWidth(followListGridRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [followedUsersAudited]);

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
      <div className="follow-list-button ">
        <div
          className={`follow-button-left ${
            leftFollowButtonActive ? "follow-button-active" : ""
          }`}
          onClick={() => handleScroll(-scrollWidth / 2)}
        >
          &lt;
        </div>
      </div>
      <div
        className="follow-list-grid follow-list-snaps-inline"
        ref={followListGridRef}
      >
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
      <div className="follow-list-button ">
        <div
          className={`follow-button-right ${
            rightFollowButtonActive ? "follow-button-active" : ""
          }`}
          onClick={() => handleScroll(scrollWidth / 2)}
        >
          &gt;
        </div>
      </div>
    </div>
  );
};

export default FollowList;
