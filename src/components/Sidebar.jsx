import React, { useContext } from "react";
import { postStore } from "../store/PostStore";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { sideBarFn, sideBarTagActive } = useContext(postStore);
  
  return (
    <div>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: "280px", height: "100%" }}
      >
        <hr />
          <h1 className="fs-4 text-center">Sidebar</h1>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" onClick={() => sideBarFn("home")}>
            <Link
              to={"/"}
              className={`nav-link text-white ${
                sideBarTagActive === "home" && "active"
              }`}
              aria-current="page"
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              Home
            </Link>
          </li>
          <li onClick={() => sideBarFn("dashboard")}>
            <Link
              to={"/dashboard"}
              className={`nav-link text-white ${
                sideBarTagActive === "dashboard" && "active"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Dashboard
            </Link>
          </li>
        </ul>
        <hr />
      
      </div>
    </div>
  );
};

export default Sidebar;
