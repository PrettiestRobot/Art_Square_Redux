import { useQuery } from "@apollo/client";

import PostList from "../../components/PostList";
import Welcome from "../../assets/images/welcome.svg";
import "./Home.css";
import { QUERY_POSTS } from "../../utils/queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <>
      <main>
        <div className="home-header">
          <img className="welcome" src={Welcome} />
          <div className="header-buttons">
            <Link className="home-btn sign-up-btn" to="/signup">
              Sign Up
            </Link>
            <Link className="home-btn login-btn" to="/login">
              Log In
            </Link>
          </div>
        </div>
        <div className="layout-container">
          {loading ? <div>Loading...</div> : <PostList posts={posts} />}
        </div>
      </main>
      <div className="bg">
        <div className="bg-image">
          <img src="https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>

        <div className="bg-solid"></div>
      </div>
    </>
  );
};

export default Home;
