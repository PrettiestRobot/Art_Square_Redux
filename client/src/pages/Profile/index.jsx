import "./Profile.css";
import PostList from "../../components/PostList";
import ProfileBanner from "../../components/ProfileBanner";
import PostForm from "../../components/PostForm";
import SinglePostModal from "../../components/SinglePost";
import FollowList from "../../components/FollowList";
import SectionTag from "../../components/SectionTag";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_BY_ID } from "../../utils/queries";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";

const Profile = () => {
  const [singlePostModal, setSinglePostModal] = useState(false);
  const [spPostId, setSpPostId] = useState("");

  const { userId } = useParams();
  const { data, loading, error } = useQuery(QUERY_USER_BY_ID, {
    variables: { id: userId },
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.userById || {};
  const userPosts = user?.posts || [];
  const followed = user?.followed || [];
  const followedIds = followed.map((follow) => follow._id);

  //calculate a users overal rating
  const totalRating = user.posts.reduce(
    (sum, post) => sum + post.averageRating,
    0
  );
  const averageRating = totalRating / user.posts.length;
  const currentUser = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";

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

  //modal logic

  const openSinglePostModal = (event) => {
    const thisPostId = event.currentTarget.getAttribute("data-post-id");
    setSinglePostModal(true);
    setSpPostId(thisPostId);
  };

  const closeSinglePostModal = (event) => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      setSinglePostModal(false);
    }
  };

  return (
    <div className={`profile-page ${singlePostModal ? "sp-modal-active" : ""}`}>
      <div className="layout-container">
        <ProfileBanner user={user} userRating={averageRating} />
      </div>
      {followedIds.length === 0 ? null : (
        <div className="layout-container">
          <SectionTag tagName="Followed Blockheads" />
        </div>
      )}
      {followedIds.length === 0 ? null : (
        <div className="layout-container">
          <FollowList FollowedIds={followedIds} />
        </div>
      )}
      {currentUser && currentUser === userId ? (
        <div className="layout-container">
          <PostForm userId={userId} />
        </div>
      ) : null}
      <div className="layout-container">
        <SectionTag tagName={`Posts by ${user.username}`} />
      </div>
      <div className="layout-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PostList
            openSinglePostModal={openSinglePostModal}
            posts={posts.reverse()}
          />
        )}
      </div>

      {!singlePostModal ? null : (
        <SinglePostModal closeModal={closeSinglePostModal} postId={spPostId} />
      )}
    </div>
  );
};

export default Profile;
