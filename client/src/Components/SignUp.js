import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Registration Failed!❌");
    } else {
      window.alert("Registration Sucessfull!❤");
      history.push("/login");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="white-box py-5 signup-container my-5 d-flex align-items-center justify-content-center flex-column signup-container">
          <h2 className="form-title">Sign Up</h2>
          <form method="POST" className="register-form" id="register-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                onChange={handleInputs}
                value={user.name}
                placeholder="Enter your Name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                onChange={handleInputs}
                value={user.email}
                placeholder="Enter your E-mail"
                className="form-control"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="off"
                onChange={handleInputs}
                value={user.phone}
                placeholder="Enter your Phone No."
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="column g-3 mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputPassword6" className="col-form-label">
                  Password
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  onChange={handleInputs}
                  value={user.password}
                  placeholder="Create a new password"
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
            <div className="column g-3 mb-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputPassword6" className="col-form-label">
                  Confirm Password
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  onChange={handleInputs}
                  value={user.cpassword}
                  placeholder="Re-type the Password "
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  Should match to password.
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn my-2 btn-primary"
              onClick={postData}
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
