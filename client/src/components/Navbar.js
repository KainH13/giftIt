import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const logout = (e) => {
    axios
      .post(
        "http://localhost:8000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar navbar-light bg-light sticky-top">
      <div className="container-fluid justify-content-start">
        <h1 className="navbar-brand text-secondary m-1">Gift It :)</h1>
        <div className="nav m-1">
          <Link className="nav-link" to="/home">
            Home
          </Link>
          <Link
            className="nav-link"
            to={`/edit/${localStorage.getItem("userID")}`}
          >
            Edit Profile
          </Link>
          <Link className="nav-link" to={`/search`}>
            Find Connections
          </Link>
          <button className="btn btn-outline-danger ms-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
