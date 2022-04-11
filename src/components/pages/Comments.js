import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

const Comments = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  });

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
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
        const response = await axios.get("http://localhost:5000/token");
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
        {/* Page Konten */}
        <div className="container-fluid pb-4">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>All Comment</h4>
                    <hr />
                  </div>
                  <div className="table-responsive">
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Comments</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Orlynz</td>
                          <td>Hahahahahaha</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Orlynz</td>
                          <td>Hahahahahaha</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Orlynz</td>
                          <td>Hahahahahaha</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
