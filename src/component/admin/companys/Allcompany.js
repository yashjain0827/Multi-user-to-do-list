import React from "react";
import Company from "./Company";
export default function Allcompany({ companyes, setcompanyes }) {
  return (
    <div>
      <ol className="list-group list-group-numbered">
        {companyes.map((company) => (
          <Company
            key={company.id}
            company={company}
            setcompanyes={setcompanyes}
            companyes={companyes}
          />
        ))}
      </ol>
    </div>
  );
}
