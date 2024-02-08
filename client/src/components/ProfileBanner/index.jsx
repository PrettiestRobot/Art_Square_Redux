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
import Heart from "../../assets/images/heart-rating.svg";
import BrokenHeart from "../../assets/images/broken-heart-rating.svg";

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

  // return (
  //   <>
  //     <div className="profile-banner">
  //       <div className="profile-container">
  //         {userId && userId !== user._id ? (
  //           <div className="profile-button-container">
  //             {followData?.isUserFollowed ? (
  //               <button
  //                 className="follow-button"
  //                 id="follow-button"
  //                 onClick={() => handleRemoveFollow(user._id)}
  //               >
  //                 <div className="follow-left">Unfollow</div>
  //                 <div className="follow-right">-</div>
  //               </button>
  //             ) : (
  //               <button
  //                 className="follow-button"
  //                 id="follow-button"
  //                 onClick={() => handleAddFollow(user._id)}
  //               >
  //                 <div className="follow-left">Follow</div>
  //                 <div className="follow-right">+</div>
  //               </button>
  //             )}
  //           </div>
  //         ) : null}

  //         <div className="profile-image-container">
  //           {userId && userId === user._id ? (
  //             <button
  //               className="edit-profile-image-button"
  //               onClick={toggleModal}
  //             >
  //               <img className="edit-button-image" src={editButton}></img>
  //             </button>
  //           ) : null}
  //           <div className="profile-banner-image">
  //             <img src={user.profilePicture} alt="profile image" />
  //           </div>
  //         </div>

  //         <div className="text-info">
  //           <div className="banner-username">
  //             <div className="username">{user.username}</div>
  //           </div>
  //           <div className="banner-account-info">
  //             <p>
  //               Following <span className="bold">{user.followed.length}</span>{" "}
  //               blockheads
  //             </p>
  //             <p>
  //               <span className="bold">{user.posts.length}</span> squares shared
  //             </p>
  //             <div className="profile-rating">
  //               <div className="profile-icon-box">
  //                 <img src={userRating >= 2 ? Heart : BrokenHeart} />
  //               </div>
  //               <p>
  //                 <span className="bold">{Math.round(userRating)}/5</span>{" "}
  //                 Square Rating
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div
  //         className={`profile-image-form-modal ${
  //           isModalActive ? "modal-active" : ""
  //         }`}
  //         onClick={closeModal}
  //       >
  //         <div className="profile-image-form-container">
  //           <form onSubmit={handleSubmit}>
  //             <input
  //               className="profile-image-update-form-input"
  //               type="file"
  //               accept="image/*"
  //               onChange={handleSelectFile}
  //             ></input>
  //             <button
  //               className="profile-image-update-form-button"
  //               type="submit"
  //             >
  //               Update Profile Picture
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className="profile-banner">
        {userId && userId !== user._id ? (
          <div className="profile-follow-button-container">
            {followData?.isUserFollowed ? (
              <button
                className="follow-button"
                id="follow-button"
                onClick={() => handleRemoveFollow(user._id)}
              >
                <div className="follow-left">Unfollow</div>
                <div className="follow-right">-</div>
              </button>
            ) : (
              <button
                className="follow-button"
                id="follow-button"
                onClick={() => handleAddFollow(user._id)}
              >
                <div className="follow-left">Follow</div>
                <div className="follow-right">+</div>
              </button>
            )}
          </div>
        ) : null}
        <div className="profile-banner-image-container">
          {userId && userId === user._id ? (
            <button className="edit-profile-image-button" onClick={toggleModal}>
              <img className="edit-button-image" src={editButton}></img>
            </button>
          ) : null}

          <img
            className="profile-banner-image"
            src={user.profilePicture}
            alt="profile image"
          />
        </div>
        <div className="profile-banner-username">{user.username}</div>
        <ul className="profile-banner-metrics-container">
          <li className="profile-banner-metrics-item">
            <span>following</span>
            <span className="span-bold">{user.followed.length}</span>
            <span>blockheads</span>
          </li>
          <li className="profile-banner-metrics-item">
            <span>shared</span>
            <span className="span-bold">{user.posts.length}</span>
            <span>squares</span>
          </li>
          <li className="profile-banner-metrics-item">
            <div className="profile-rating-metric">
              <span className="span-bold">{Math.round(userRating)}/5</span>
              <img
                className="profile-rating-icon-box"
                src={userRating >= 2 ? Heart : BrokenHeart}
              />
            </div>
            <span>rating</span>
          </li>
        </ul>

        <div
          className={`profile-image-edit-form-modal ${
            isModalActive ? "modal-active" : ""
          }`}
          onClick={closeModal}
        >
          <div className="profile-image-form-container">
            <form onSubmit={handleSubmit}>
              <input
                className="profile-image-update-form-input"
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
              ></input>
              <button
                className="profile-image-update-form-button"
                type="submit"
              >
                Update Profile Picture
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
