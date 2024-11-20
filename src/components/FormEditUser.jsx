import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCaretBackCircle } from "react-icons/io5";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  // const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `https://consolerentapideploytest-production.up.railway.app/api/users/${id}`
        );
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          console.error("Failed to get user", error);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://consolerentapideploytest-production.up.railway.app/api/users/${id}`,
        {
          name: name,
          email: email,
          password: password,
          confPassword: confPassword,
          role: role,
        }
      );
      user.role === "admin" ? navigate("/users") : navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Failed to update user", error);
      }
    }
  };
  return (
    <div>
      {user && user.role === "admin" && (
        <button onClick={() => navigate(-1)} className="button is-info mb-5">
          <IoCaretBackCircle />
          Back
        </button>
      )}
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              {/* <p className="has-text-centered">{msg}</p> */}
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>

              {user && user.role === "admin" && (
                <div className="field">
                  <label className="label">Role</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
