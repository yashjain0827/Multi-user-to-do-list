import React from "react";
import User from "./User";
export default function Alluser({ user, setuser }) {
  return (
    <div className="container">
      <ul className="list-group">
        {user.map((u) => (
          <User key={u.id} user={u} setuser={setuser} />
        ))}
      </ul>
    </div>
  );
}
