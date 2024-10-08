import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";
import "./SignUpForm.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="form-component">
      {error && (
        <div className="error-message-container">
          <div className="error-message">{error.message}</div>
        </div>
      )}
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Your Username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Your Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Your Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button
          className="form-button form-submit"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
