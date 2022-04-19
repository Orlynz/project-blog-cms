import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

const Profile = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:2020/api/users/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setEmail(decoded.email);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "http://localhost:2020/api/users/token"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        <div className="container pb-4">
          <div className="row g-2">
            <div className="col-lg-4 col-xlg-3 col-md-5">
              <div className="card">
                <div className="card-body">
                  <div className="m-t-30 center text-center">
                    <img
                      src="https://wwbmmc.ca/wp-content/uploads/2020/12/kisspng-computer-icons-avatar-icon-design-male-teacher-5ade176c636ed2.2763610715245044284073.png"
                      className="rounded-circle"
                      width="200"
                    />
                    <h2 className=" m-t-10">{name}</h2>
                    <br />
                    <h6 className="card-subtitle">
                      <i>"bwa bwaaa bwa bwa baw waaaaaaaaaaaa"</i>
                    </h6>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <small className="text-muted">Email</small>
                  <h6>{email}</h6>
                  <small className="text-muted p-t-30 db">Phone</small>
                  <h6>+62 xxx xxx xxx</h6>
                  <small className="text-muted p-t-30 db">Address</small>
                  <h6>Semarang</h6>
                  <hr />
                  <div className="text-center">
                    <a>
                      <i className="fab fa-facebook-f fs-4 me-5"></i>
                    </a>
                    <a>
                      <i className="fab fa-twitter fs-4 me-5"></i>
                    </a>
                    <a>
                      <i className="fab fa-youtube fs-4"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-7">
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>Edit Profile</h4>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <form className="form-horizontal form-material mx-2">
                    <div className="form-group pb-2">
                      <label className="col-md-12">Full Name</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="Name..."
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label for="example-email" className="col-md-12">
                        Email
                      </label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          required
                          placeholder="Email..."
                          className="form-control form-control-line"
                          name="example-email"
                          id="example-email"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Password</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          required
                          placeholder="Pasword..."
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Phone No</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          required
                          placeholder="+62 XXXXXXXX"
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Address</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          required
                          placeholder="Address..."
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Message</label>
                      <div className="col-md-12">
                        <textarea
                          rows="3"
                          required
                          placeholder="Message..."
                          className="form-control form-control-line"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <div className="col-sm-12">
                        <button className="btn btn-outline-dark float-end fw-bold">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
