import { useQuery } from "@apollo/client";
import { useState } from "react";
import PostList from "../../components/PostList";
import HomeNavbar from "../../components/HomeNavbar";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import Welcome from "../../assets/images/welcome.svg";
import "./Home.css";
import { QUERY_POSTS } from "../../utils/queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const [loginActive, setLoginAcative] = useState(true);
  const [signUpActive, setSignUpActive] = useState(false);

  const handleLoginClick = () => {
    setLoginAcative(true);
    setSignUpActive(false);
  };

  const handleSignUpClick = () => {
    setLoginAcative(false);
    setSignUpActive(true);
  };

  return (
    <main>
      <div className="layout-container">
        <div className="showcase-container">
          <img
            className="showcase-image"
            src="https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F6546c288ec94f60c653a8b9b%2F2023-11-12T00%3A02%3A36.317Z_cbcfb226-9f5a-413d-9212-53aa08409840?alt=media&token=3c8c0822-a34a-4a4c-a718-1d9456431a60"
          />
        </div>
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
      <div className="layout-container">
        {loading ? <div>Loading...</div> : <PostList posts={posts} />}
      </div>
    </main>
  );
};

export default Home;
