import { useQuery } from "@apollo/client";
import { useState } from "react";
import PostList from "../../components/PostList";
import HomeNavbar from "../../components/HomeNavbar";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import SinglePostModal from "../../components/SinglePost";
import SectionTag from "../../components/SectionTag";
import FeatureGallery from "../../components/FeaturedGallery";
import "./Home.css";
import { QUERY_POSTS } from "../../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const [loginActive, setLoginAcative] = useState(true);
  const [signUpActive, setSignUpActive] = useState(false);

  const [singlePostModal, setSinglePostModal] = useState(false);
  const [spPostId, setSpPostId] = useState("");

  const handleLoginClick = () => {
    setLoginAcative(true);
    setSignUpActive(false);
  };

  const handleSignUpClick = () => {
    setLoginAcative(false);
    setSignUpActive(true);
  };

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
    <main>
      <div className="layout-container" id="home-main">
        <FeatureGallery />
        <div className="home-container">
          <HomeNavbar />
          <div className="home-form-container">
            <div className="home-form">
              <div className="home-form-header">
                <button
                  className={`form-selector ${
                    loginActive ? "active" : "inactive"
                  }`}
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button
                  className={`form-selector ${
                    signUpActive ? "active" : "inactive"
                  }`}
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
              <div className="form-slider-container">
                <div
                  className={`form-slider ${loginActive ? "login" : "signup"}`}
                >
                  <SignUpForm />
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container home-gallery">
        <div className="layout-container">
          <SectionTag tagName="Art Board" />
        </div>
        <div className="layout-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} openSinglePostModal={openSinglePostModal} />
          )}
        </div>
      </div>

      {!singlePostModal ? null : (
        <SinglePostModal closeModal={closeSinglePostModal} postId={spPostId} />
      )}
    </main>
  );
};

export default Home;
