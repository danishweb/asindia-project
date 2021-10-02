import { createContext, useReducer } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import DoctorSearch from "./Components/DoctorSearch/DoctorSearch";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/Login/LogIn";
import { Switch, Route } from "react-router-dom";
import "./Styles/app.css";
import LogOut from "./Components/LogOut";
import { initialState, reducer } from "./reducer/UseReducer";

// Context API
export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/doctorsearch" exact>
            <DoctorSearch />
          </Route>
          <Route path="/login" exact>
            <LogIn />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/logout" exact>
            <LogOut />
          </Route>
        </Switch>
      </userContext.Provider>
    </>
  );
};

export default App;
