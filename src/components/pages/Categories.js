import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import { Button } from "react-bootstrap";

const Categories = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [category, setCategory] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllCategory();
    refreshToken();
    getUsers();
  }, []);

  const getAllCategory = async () => {
    const category = await axios.get("http://localhost:2020/api/category/");
    setCategory(category.data);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:2020/api/category/${id}`);
    getAllCategory();
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:2020/api/users/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // setName(decoded.name);
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
        // setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get(
      "http://localhost:2020/api/users/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };

  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        {/* Page Konten */}
        <div className="container pb-4">
          <ul class="breadcrumb">
            <li>
              <a href="/Home">
                <i className="fa fa-home me-2"></i>Home
              </a>
            </li>
            <li>
              <i className="fas fa-folder me-2"></i>Category
            </li>
          </ul>
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4
                  style={{
                    float: "left",
                  }}
                >
                  All Category
                </h4>
                <Button
                  href="/AddCategory"
                  variant="outline-dark"
                  style={{
                    float: "right",
                  }}
                  className="fw-bold"
                  type="submit"
                >
                  <i className="fas fa-plus-circle me-2"></i>ADD CATEGORY
                </Button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Judul</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((categories, index) => (
                      <tr key={categories.id}>
                        <td>{index + 1}</td>
                        <td>{categories.name}</td>
                        <td>
                          <a href={`/EditCategory/${categories.id}`}>
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                            onClick={() => deleteCategory(categories.id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
