import React from "react";
export default function User({ user, setuser }) {
  const deleteuser = async () => {
    let c = window.confirm("Are you sure you want to delete this user?");
    if (c) {
      try {
        const response = await fetch(`http://localhost:8000/users/${user.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setuser((prev) => prev.filter((c) => c.id !== user.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto ">
          <div className="fw-bold">{user.userName}</div>
          {user.password}
        </div>

        <button className="btn btn-secondary mx-2" onClick={() => deleteuser()}>
          Delete
        </button>
      </li>
    </div>
  );
}
