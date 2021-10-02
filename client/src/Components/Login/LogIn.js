import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../../App";

const LogIn = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logInUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid  Credentials !");
    } else {
      window.alert("Login  Sucessfull!");
      dispatch({ type: "USER", payload: true });
      history.push("/");
    }
  };

  return (
    <>
      <section className="login">
        <div className="white-box py-5 signup-container my-5 d-flex align-items-center justify-content-center flex-column signup-container">
          <h2 className="form-title">Log In</h2>
          <form method="POST" className="register-form" id="register-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your E-mail"
                className="form-control"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="column g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="password" className="col-form-label">
                  Password
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
            </div>
            <div className="login-btns d-flex align-items-center">
              <button
                type="button"
                className="btn my-2 me-2 btn-primary"
                onClick={logInUser}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LogIn;
