import "./ProfileBanner.css";
import { useState } from "react";
import editButton from "../../assets/images/edit-button.svg";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FOLLOW,
  REMOVE_FOLLOW,
  UPDATE_PROFILE_PICTURE,
} from "../../utils/mutations";
import { IS_USER_FOLLOWED } from "../../utils/queries";
import Auth from "../../utils/auth";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const ProfileBanner = ({ user, userRating }) => {
  const userId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

  //file state for firebase
  const [selectedFile, setSelectedFile] = useState(null);
  //firebase upload logic
  const uploadImage = async (file) => {
    try {
      const storageRef = ref(
        storage,
        `images/${userId}/profile_pictures/${new Date().toISOString()}_${v4()}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    }
  };

  const [addFollow] = useMutation(ADD_FOLLOW, {
    refetchQueries: [IS_USER_FOLLOWED],
  });
  const [removeFollow] = useMutation(REMOVE_FOLLOW, {
    refetchQueries: [IS_USER_FOLLOWED],
  });

  const { data: followData } = useQuery(IS_USER_FOLLOWED, {
    variables: { userId: userId, followedId: user._id },
  });

  const handleAddFollow = (followedId) => {
    addFollow({ variables: { userId, followedId } });
  };
  const handleRemoveFollow = (followedId) => {
    removeFollow({ variables: { userId, followedId } });
  };
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);

  const handleSelectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const imageUrl = await uploadImage(selectedFile);

      const { data } = await updateProfilePicture({
        variables: {
          userId: user._id,
          newProfilePicture: imageUrl,
        },
      });
      setIsModalActive(false);
      console.log("Updated User:", data.updateProfilePicture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    console.log("Toggling modal...");
    setIsModalActive(!isModalActive);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      setIsModalActive(false);
    }
  };

  return (
    <>
      <div className="profile-banner">
        <div className="profile-container">
          <div className="profile-button-container">
            {userId && userId !== user._id ? (
              <div>
                {followData?.isUserFollowed ? (
                  <button
                    className="follow-button"
                    onClick={() => handleRemoveFollow(user._id)}
                  >
                    <div className="follow-left">Unfollow</div>
                    <div className="follow-right">-</div>
                  </button>
                ) : (
                  <button
                    className="follow-button"
                    onClick={() => handleAddFollow(user._id)}
                  >
                    <div className="follow-left">Follow</div>
                    <div className="follow-right">+</div>
                  </button>
                )}
              </div>
            ) : null}
          </div>

          <div className="profile-image-container">
            {userId && userId === user._id ? (
              <button
                className="edit-profile-image-button"
                onClick={toggleModal}
              >
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
            </div>
            {/* <div className="banner-account-info">
              <p className="general-info">
                Following {user.followed.length} blockheads
                <span className="pipe1"> | </span>
                <br className="break1"></br>
                {user.posts.length} squares shared
                <span className="pipe2"> | </span>
                <br className="break2"></br>
                {Math.round(userRating)} / 5 Square Rating
              </p>
            </div> */}
            <div className="banner-account-info">
              <p>
                Following <span>{user.followed.length}</span> blockheads
              </p>
              <p>
                <span>{user.posts.length}</span> squares shared
              </p>
              <p>{Math.round(userRating)} / 5 Square Rating</p>
            </div>
          </div>
        </div>

        <div
          className={`profile-image-form-modal ${
            isModalActive ? "modal-active" : ""
          }`}
          onClick={closeModal}
        >
          <div className="profile-image-form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
              ></input>
              <button type="submit">Update Profile Picture</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
