import { Link } from "react-router-dom";
import NavBrand from "../../assets/images/desktop_brand.svg";
import "./Navbar.css";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER_BY_ID } from "../../utils/queries";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const userId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";
  let data, loading, error;

  if (userId) {
    const queryResults = useQuery(QUERY_USER_BY_ID, {
      variables: { id: userId },
      fetchPolicy: "network-only",
    });

    data = queryResults.data;
    loading = queryResults.loading;
    error = queryResults.error;
  } else {
    data = null;
    loading = false;
    error = null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.userById || {};

  return (
    <>
      <nav>
        <div className="nav-contents">
          <div className="nav-left">
            <Link to="/">
              <img className="nav-brand" src={NavBrand} alt="Art Square Logo" />
            </Link>
          </div>
          <div className="nav-right">
            {Auth.loggedIn() ? (
              <>
                <span>Hey there, {Auth.getProfile().data.username}!</span>
                <Link className="nav-profile-picture" to={`/profile/${userId}`}>
                  <img src={user.profilePicture} alt="User profile" />
                </Link>
                <button className="nav-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-btn login-nav" to="/login">
                  Log In
                </Link>
                <Link className="nav-btn " to="/signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
