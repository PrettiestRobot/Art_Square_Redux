import "./ProfileBanner.css";
import { useState } from "react";
import profileImage from "../../assets/images/profile.jpg";
import editButton from "../../assets/images/edit-button.svg";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_FOLLOW, UPDATE_PROFILE_PICTURE } from "../../utils/mutations";
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

  const [profilePicture, setProfilePicture] = useState("");
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateProfilePicture({
        variables: {
          userId: user._id,
          newProfilePicture: profilePicture,
        },
      });

      console.log("Updated User:", data.updateProfilePicture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  console.log(user);

  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    console.log("Toggling modal...");
    setIsModalActive(!isModalActive);
  };

  return (
    <div className="profile-banner">
      <div className="profile-container">
        <div className="profile-image-container">
          {userId && userId === user._id ? (
            <button className="edit-profile-image-button" onClick={toggleModal}>
              <img className="edit-button-image" src={editButton}></img>
            </button>
          ) : null}
          <div className="profile-banner-image">
            <img src={user.profilePicture} alt="profile image" />
          </div>
        </div>

        <div className="text-info">
          <div className="banner-username">
            <div className="username">{user.username}</div>
            {userId && userId !== user._id && !followData?.isUserFollowed ? (
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
              Following {user.followed.length} blockheads
              <span className="pipe1"> | </span>
              <br className="break1"></br>
              {user.posts.length} squares shared
              <span className="pipe2"> | </span>
              <br className="break2"></br>
              {Math.round(userRating)} / 5 Square Rating
            </p>
          </div>
        </div>
      </div>

      <div
        className={`profile-image-form-container ${
          isModalActive ? "modal-active" : ""
        }`}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Profile Picture URL"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          <button type="submit">Update Profile Picture</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileBanner;
