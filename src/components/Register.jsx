import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { LoginUser, reset } from "../features/authSlice";
import axios from "axios";
import { IoCaretBackCircle } from "react-icons/io5";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    password: password,
    confPassword: confPassword,
  };
  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // setMsg(error.response.data.msg);
        console.log(error);
      }
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <button onClick={() => navigate(-1)} className="button is-info mb-5">
            <IoCaretBackCircle />
            Back
          </button>
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={register} className="box">
                {/* {isError && <p className="has-text-centered">{message}</p>} */}
                <h1 className="title is-2">Register</h1>
                <div className="field">
                  <label className="label">Nama</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama"
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
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
