import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../App";

const LogOut = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const logOutPage = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.status === 200) {
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
      dispatch({ type: "USER", payload: false });
    }
  };
  useEffect(() => {
    logOutPage();
  });

  return <div></div>;
};

export default LogOut;
