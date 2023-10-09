import { Link } from "react-router-dom";
import NavBrand from "../../assets/images/desktop_brand.svg";
import "./Navbar.css";
import Auth from "../../utils/auth";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
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
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-lg btn-info m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
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
