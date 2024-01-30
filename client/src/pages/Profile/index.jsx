import "./Profile.css";
import PostList from "../../components/PostList";
import ProfileBanner from "../../components/ProfileBanner";
import PostForm from "../../components/PostForm";
import SinglePostModal from "../../components/SinglePost";
import FollowList from "../../components/FollowList";
import SectionTag from "../../components/SectionTag";
import ExploreGallery from "../../components/ExploreGallery";
import SearchGallery from "../../components/Search";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_BY_ID } from "../../utils/queries";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";

const Profile = () => {
  const [singlePostModal, setSinglePostModal] = useState(false);
  const [spPostId, setSpPostId] = useState("");
  const [gallerySelectorState, setGallerySelectorState] =
    useState("post-gallery");

  const [postGalleryActive, setPostGalleryActive] = useState(true);
  const [exploreGalleryActive, setExploreGalleryActive] = useState(false);
  const [searchGalleryActive, setSearchGalleryActive] = useState(false);

  const handlePostGalleryClick = () => {
    setPostGalleryActive(true);
    setExploreGalleryActive(false);
    setSearchGalleryActive(false);
    setGallerySelectorState("post-gallery");
  };

  const handleExploreGalleryClick = () => {
    setPostGalleryActive(false);
    setExploreGalleryActive(true);
    setSearchGalleryActive(false);
    setGallerySelectorState("explore-gallery");
  };

  const handleSearchGalleryClick = () => {
    setPostGalleryActive(false);
    setExploreGalleryActive(false);
    setSearchGalleryActive(true);
    setGallerySelectorState("search-gallery");
  };

  const { userId } = useParams();

  useEffect(() => {
    setPostGalleryActive(true);
    setExploreGalleryActive(false);
    setSearchGalleryActive(false);
  }, [userId]);

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
    <div className="main-container">
      <div
        className={`profile-page ${singlePostModal ? "sp-modal-active" : ""}`}
      >
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
          <div className="layout-container gallery-selectors">
            <div
              className={`gallery-selectors-bg ${gallerySelectorState}`}
              id="gallery-selectors-bg"
            ></div>
            <button
              className={`gallery-selector ${
                postGalleryActive ? "active" : "inactive"
              }`}
              onClick={handlePostGalleryClick}
            >
              Your Posts
            </button>
            <button
              className={`gallery-selector ${
                exploreGalleryActive ? "active" : "inactive"
              }`}
              onClick={handleExploreGalleryClick}
            >
              Explore
            </button>
            <button
              className={`gallery-selector ${
                searchGalleryActive ? "active" : "inactive"
              }`}
              onClick={handleSearchGalleryClick}
            >
              Search
            </button>
          </div>
        ) : (
          <div className="layout-container">
            <SectionTag tagName={`Posts by ${user.username}`} />
          </div>
        )}

        {postGalleryActive ? (
          <div className="layout-container-column">
            {currentUser && currentUser === userId ? (
              <div className="layout-container">
                <PostForm userId={userId} />
              </div>
            ) : null}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="layout-container">
                <PostList
                  openSinglePostModal={openSinglePostModal}
                  posts={posts.reverse()}
                />
              </div>
            )}
          </div>
        ) : null}

        {exploreGalleryActive ? (
          <div className="layout-container">
            <ExploreGallery openSinglePostModal={openSinglePostModal} />
          </div>
        ) : null}

        {searchGalleryActive ? (
          <div className="layout-container">
            <SearchGallery openSinglePostModal={openSinglePostModal} />
          </div>
        ) : null}

        {!singlePostModal ? null : (
          <SinglePostModal
            closeModal={closeSinglePostModal}
            postId={spPostId}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
