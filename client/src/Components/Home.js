import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const [showDoctor, setShowDoctor] = useState(false);
  const homePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.name);
      setShowDoctor(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    homePage();
  });
  return (
    <div className="home">
      <div className="d-flex white-box align-items-center justify-content-center flex-column">
        <p>WELCOME, {user}</p>
        <h1>Find the Best Doctor Here</h1>
        {showDoctor ? (
          <NavLink
            className="btn btn-primary my-3 "
            to="/doctorsearch"
            role="button"
          >
            Search Your Doctor
          </NavLink>
        ) : (
          <>
            <NavLink className="btn btn-primary my-3 " to="/signup" role="button">
              Sign Up for Getting Started
            </NavLink>
            <p className="fs-6">
              Already a user? &nbsp;
              <NavLink to="/login">Click Here</NavLink>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
