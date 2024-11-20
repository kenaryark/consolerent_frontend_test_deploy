import React from "react";
import { NavLink } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome } from "react-icons/io5";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/"}>
              <IoHome /> Home
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to={"/tenants"}>
                <IoPricetag /> Sewa
              </NavLink>
            </li>
          )}
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {user && user.role === "user" && (
          <>
            <p className="menu-label">Settings</p>
            <ul className="menu-list">
              <li>
                <li>
                  <NavLink to={`/users/edit/${user.uuid}`}>
                    <IoPerson /> Edit Data
                  </NavLink>
                </li>
              </li>
            </ul>
          </>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
