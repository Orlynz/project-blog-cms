import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import { Button } from "react-bootstrap";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const Posts = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [post, setPost] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllPost();
    refreshToken();
    getUsers();
  }, []);

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

  const getAllPost = async () => {
    const posts = await axios.get("http://localhost:2020/api/post/");
    setPost(posts.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:2020/api/post/${id}`);
    getAllPost();
  };
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
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
              <i className="fas fa-pencil-alt me-2"></i>Post
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
                  All Post
                </h4>
                <Button
                  href="/AddPost"
                  variant="outline-dark"
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  className="fw-bold"
                >
                  <i className="fas fa-plus-circle me-2"></i>ADD POST
                </Button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table id="example" className="table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Gambar</th>
                      <th>Nama</th>
                      <th>Judul</th>
                      <th>Konten</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.map((blog, index) => (
                      <tr key={blog.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`http://localhost:2020/${blog.image}`}
                            width="100"
                            alt=""
                          />
                        </td>
                        <td>{blog.name}</td>
                        <td>{blog.title.slice(0, 15)}..</td>
                        <td>
                          <div
                            className="blog-text"
                            dangerouslySetInnerHTML={{
                              __html: blog.description.slice(0, 30),
                            }}
                          />
                        </td>
                        <td>
                          <a href={`/EditPost/${blog.id}`}>
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                            onClick={() => deletePost(blog.id)}
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
export default Posts;
