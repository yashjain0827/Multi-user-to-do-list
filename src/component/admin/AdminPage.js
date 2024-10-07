import React from "react";
import Allcompany from "./companys/Allcompany";
import Companyform from "./companys/Companyform";
import { useState, useEffect } from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrom";

export default function AdminPage() {
  const [companyes, setcompanyes] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/company");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setcompanyes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="bg-dark text-white d-flex flex-column align-item-center w-100 "
      style={{ minHeight: "100vh" }}
    >
      <div>
        <Header></Header>
      </div>
      <div>
        <Breadcrumb crumbs={[{ title: "comanylist", path: "/admin" }]} />
      </div>
      <div>
        <Companyform
          companyes={companyes}
          setcompanyes={setcompanyes}
        ></Companyform>
      </div>

      <div className="container">
        <Allcompany
          companyes={companyes}
          setcompanyes={setcompanyes}
        ></Allcompany>
      </div>
    </div>
  );
}
