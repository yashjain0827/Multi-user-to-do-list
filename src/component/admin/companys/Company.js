import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Company({ company, setcompanyes }) {
  const [user, setuser] = useState([]);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setuser(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletecompany = async () => {
    let c = window.confirm("Are you sure you want to delete this company?");
    if (c) {
      try {
        const response = await fetch(
          `http://localhost:8000/company/${company.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setcompanyes((prev) => prev.filter((c) => c.id !== company.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleUsers = (company) => {
    navigate(`/admin/adminusers`, { state: company });
  };
  const count = user.filter((user) => user.companyid === company.id);
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{company.companyName}</div>
          {company.companyToken}
        </div>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handleUsers(company)}
        >
          User
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => deletecompany(company.id)}
        >
          Delete
        </button>
        <span className="badge text-bg-primary rounded-pill">
          {count.length}
        </span>
      </li>
    </div>
  );
}
