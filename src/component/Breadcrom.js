import React from "react";
import { useNavigate } from "react-router-dom";

const breadcrumb = {
  backgroundColor: "white",
  border: "1px solid rgba(0, 0, 0, 0.125)",
  borderRadius: "0.37rem",
};

function Breadcrumb({ crumbs }) {
  const navigate = useNavigate();

  function isLast(index) {
    return index === crumbs.length - 1;
  }
  const handleCrumbClick = (crumb, ci) => {
    if (!isLast(ci)) {
      navigate(`${crumb.path}`);
    }
  };
  return (
    <nav className="breadcrumb-container">
      <ol className="breadcrumb " style={breadcrumb}>
        {crumbs.map((crumb, ci) => {
          const disabled = isLast(ci)
            ? "breadcrumb-item active"
            : "breadcrumb-item";

          return (
            <li key={ci} className="crumbClasses ">
              <button
                className={`btn btn-link ${disabled}`}
                onClick={() => handleCrumbClick(crumb, ci)}
              >
                {crumb.title}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
