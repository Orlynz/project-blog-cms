import React, { useState } from "react";
import axios from "axios";
import image from "../assets/images/6343825.jpg";
import { useHistory } from "react-router-dom";
import { API_URL } from "../utils/constans";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const Login = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      await axios.post(API_URL + "/api/users/login", data);
      history.push("/Home");
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div className="body">
      <div className="container" id="container">
        <div className="cover">
          <div>
            <img src={image} alt="" />
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={Login}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-danger">{msg}</p>
                  <div className="button input-box">
                    <input type="submit" value="Sumbit" />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account? <a href="/Register">Sigup now</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
