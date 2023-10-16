import "./ProfileBanner.css";
import profileImage from "../../assets/images/profile.jpg";

const ProfileBanner = ({ user, userRating }) => {
  console.log(user);

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
            <button className="follow-btn">
              <span className="follow">Follow</span>
              <span className="mobile-follow">+</span>
            </button>
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
