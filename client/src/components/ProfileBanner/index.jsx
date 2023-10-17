import "./ProfileBanner.css";
import profileImage from "../../assets/images/profile.jpg";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FOLLOW } from "../../utils/mutations";
import { IS_USER_FOLLOWED } from "../../utils/queries";
import Auth from "../../utils/auth";

const ProfileBanner = ({ user, userRating }) => {
  const userId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

  const [addFollow] = useMutation(ADD_FOLLOW);

  const { data: followData } = useQuery(IS_USER_FOLLOWED, {
    variables: { userId: userId, followedId: user._id },
  });

  const handleAddFollow = (followedId) => {
    addFollow({ variables: { userId, followedId } });
  };

  console.log(Auth.getProfile().data);

  return (
    <div className="profile-banner">
      <div className="profile-container">
        <img
          className="profile-banner-image"
          src={profileImage}
          alt="profile image"
        />
        <div className="text-info">
          <div className="banner-username">
            <div className="username">{user.username}</div>
            {userId !== user._id && !followData?.isUserFollowed ? (
              <button
                className="follow-btn"
                onClick={() => handleAddFollow(user._id)}
              >
                <span className="follow">Follow</span>
                <span className="mobile-follow">+</span>
              </button>
            ) : null}
          </div>
          <div className="banner-account-info">
            <p className="general-info">
              Following 10K blockheads <span className="pipe1"> | </span>
              <br className="break1"></br>
              {user.posts.length} squares shared
              <span className="pipe2"> | </span>
              <br className="break2"></br>
              {Math.round(userRating)} / 5 Square Rating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
