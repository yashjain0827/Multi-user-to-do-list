import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setuser] = useState([]);
  const [company, setcompany] = useState([]);
  const [islogedin, setislogedin] = useState(false);
  const [role, setrole] = useState([]);
  const [loggedinuser, setloggedinuser] = useState(null);

  useEffect(() => {
    const getuser = async () => {
      let url = "http://localhost:8000/users";
      let response = await fetch(url);
      let data = await response.json();
      setuser(data);
    };

    getuser();
    const getcompany = async () => {
      let url = "http://localhost:8000/company";
      let response = await fetch(url);
      let data = await response.json();
      setcompany(data);
    };
    getcompany();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    let loggedinuser = user.find((u) => {
      return (
        u.userName === username &&
        u.password === password &&
        (u.role === "super_admin" ||
          (u.role === "user" &&
            company.find(
              (com) => com.id === u.companyid && com.companyToken === token
            )))
      );
    });
    if (loggedinuser) {
      if (loggedinuser.role === "super_admin") {
        setislogedin(true);
        setloggedinuser(loggedinuser);
        setrole(loggedinuser.role);
      }
      if (loggedinuser.role === "user") {
        setislogedin(true);
        setrole(loggedinuser.role);
        setloggedinuser(loggedinuser);
      }
    } else {
      alert("Invalid User Name or Password or company token");
    }
  };
  if (islogedin && role === "user") {
    sessionStorage.setItem("user", JSON.stringify(loggedinuser));
    return <Navigate to="/user" />;
  }
  if (islogedin && role === "super_admin") {
    sessionStorage.setItem("user", JSON.stringify(loggedinuser));

    return <Navigate to="/admin" />;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center">welcome to my todo application</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Company Token
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
