import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        {user && (
          <div className="column is-2 ">
            <Sidebar />
          </div>
        )}
        <div
          className={`column ${user ? "has-background-black" : "is-full"}`} // Atur kolom agar penuh jika user logout
          style={{ overflowY: "auto" }}>
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
