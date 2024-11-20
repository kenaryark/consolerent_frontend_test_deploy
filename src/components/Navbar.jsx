import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset, getMe } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isLoggingOut) {
      dispatch(getMe());
    }
  }, [dispatch, isLoggingOut]);

  const logout = async () => {
    setIsLoggingOut(true); // Tandai bahwa proses logout sedang berlangsung
    await dispatch(LogOut()).unwrap(); // Tunggu hingga logout selesai
    dispatch(reset()); // Reset state auth setelah logout
    setIsLoggingOut(false); // Reset status logout
    navigate("/"); // Arahkan ke halaman login setelah logout
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
        style={{ width: "100%" }}>
        <div className="navbar-brand ">
          <NavLink to="/" className="navbar-item">
            {/* <img src={logo} width="112" height="28" alt="logo" /> */}
            Consolerent
          </NavLink>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {user ? (
                  <button onClick={logout} className="button is-light">
                    Log Out
                  </button>
                ) : (
                  <button onClick={login} className="button is-light">
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
