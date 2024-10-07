import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Companyform({ setcompanyes, companyes }) {
  const [compname, setcompname] = useState("");
  const [comptoken, setcomptoken] = useState("");

  // useEffect(() => {
  //   fetchcompany();
  // }, []);

  // const fetchcompany = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/company");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await response.json();
  //     setcompanyes(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  function onInputChange(e) {
    setcompname(e.target.value);
  }

  function onInputChange1(e) {
    setcomptoken(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    if (compname.trim() && comptoken.trim()) {
      let newitem = {
        id: uuidv4(),
        companyName: compname,
        companyToken: comptoken,
      };
      fetch(`http://localhost:8000/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newitem),
      }).then((result) => {
        result.json();
      });
      setcompanyes([...companyes, newitem]);
      setcompname("");
      setcomptoken("");
    } else {
      alert("Input can't be empty");
      setcompname("");
      setcomptoken("");
    }
  }

  return (
    <div className="container my-3">
      <h1 className="mb-4 text-center">All Companies</h1>

      <form onSubmit={onFormSubmit} className="row g-3 justify-content-center">
        <div className="col-auto">
          <input
            type="text"
            placeholder="Enter company name.."
            className="form-control"
            value={compname}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            placeholder="Enter company token.."
            className="form-control"
            value={comptoken}
            onChange={onInputChange1}
            required
          />
        </div>
        <div className="col-auto ">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
