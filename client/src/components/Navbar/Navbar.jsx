import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NavBrand from "../../assets/images/desktop_brand.svg";
import SearchBar from "../common/SearchBar";
import Button from "../common/Button";
import FormLogin from "../common/FormLogin";
import FormSignUp from "../common/FormSignUp";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <nav>
        <div className="nav-contents">
          <div className="nav-left">
            <img className="nav-brand" src={NavBrand} alt="Art Square Logo" />
            <SearchBar />
          </div>
          <div className="nav-right">
            <Button
              text="Login"
              className="login-btn"
              onClick={() => setShowLoginModal(true)}
            />
            <Button
              text="Sign Up"
              className="signup-btn"
              onClick={() => setShowSignUpModal(true)}
            />
          </div>
        </div>
      </nav>

      <FormLogin
        handleModalClose={() => setShowLoginModal(false)}
        isActive={showLoginModal}
      />

      <FormSignUp
        handleModalClose={() => setShowSignUpModal(false)}
        isActive={showSignUpModal}
      />
    </>
  );
};

export default Navbar;
