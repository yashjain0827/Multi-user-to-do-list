import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const loggedinuser = JSON.parse(sessionStorage.getItem("user"));
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-dark py-3">
      <div className=" d-flex justify-content-between align-items-center mx-3">
        <h1 className="text-white mb-0">ToDo List</h1>
        <div className="user-nav d-flex align-items-center">
          <h2 className="text-white me-4 mb-0">
            {loggedinuser.role} - {loggedinuser.userName}
          </h2>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
