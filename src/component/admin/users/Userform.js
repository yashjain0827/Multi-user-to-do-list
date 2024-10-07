import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Userform({ user, setuser, company }) {
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");

  function onInputChange(e) {
    setusername(e.target.value);
  }

  function onInputChange1(e) {
    setpass(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    if (username.trim() && pass.trim()) {
      let newitem = {
        id: uuidv4(),
        userName: username,
        password: pass,
        companyid: company.id,
        role: "user",
      };
      fetch(`http://localhost:8000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newitem),
      }).then((result) => {
        result.json();
      });
      setuser([...user, newitem]);
      setusername("");
      setpass("");
    } else {
      alert("input cant be empty");
      setusername("");
      setpass("");
    }
  }

  return (
    <div className="container my-3">
      <h1 className="mb-4 text-center">All Users of :{company.companyName}</h1>

      <form onSubmit={onFormSubmit} className="row g-3 justify-content-center">
        <div className="col-auto">
          <input
            type="text"
            id="username"
            placeholder="Enter username..."
            className="form-control"
            value={username}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="col-auto">
          <input
            type="password"
            id="password"
            placeholder="Enter password.."
            className="form-control"
            value={pass}
            onChange={onInputChange1}
            required
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
