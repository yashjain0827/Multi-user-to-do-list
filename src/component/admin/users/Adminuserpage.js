import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Userform from "./Userform";
import Alluser from "./Alluser";
import Header from "../../Header";
import Breadcrumb from "../../Breadcrom";

export default function Adminuserpage() {
  const [user, setuser] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const filterduser = data.filter((u) => u.companyid === state.id);
        setuser(filterduser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [state.id]);

  return (
    <div className="bg-dark text-white" style={{ minHeight: "100vh" }}>
      <div>
        <Header></Header>
      </div>
      <div>
        <Breadcrumb
          crumbs={[
            { title: "comanylist", path: "/admin" },
            { title: "userlist", path: "/admin/adminusers" },
          ]}
        />
      </div>
      <div>
        <Userform user={user} setuser={setuser} company={state}></Userform>
      </div>

      <div>
        <Alluser user={user} setuser={setuser}></Alluser>
      </div>
    </div>
  );
}
