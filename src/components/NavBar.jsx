import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import ThemeToggle from "./ThemeToggle";
import Connections from "./Connections";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch =useDispatch();
  const navigate=useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout",{},{ withCredentials: true });//no response needed for logout
      dispatch(removeUser())
      return navigate("/login")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          {" "}
          🧑‍💻Dev-In
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <div className="hidden md:flex gap-4 items-center">
          <Link to={"/connections"}>Connections</Link>
          <Link to={"/requests"}>Requests</Link>
          <Link to={"/profile"}>Profile</Link>
          </div>
          <div className="md:w-auto">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="photo url" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests"> Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
