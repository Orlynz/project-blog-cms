import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
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

  const [post, setPost] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllPost();
    refreshToken();
    getUsers();
  });

  const getAllPost = async () => {
    const posts = await axios.get("http://localhost:2020/api/comment/");
    setPost(posts.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:2020/api/comment/${id}`);
    getAllPost();
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
                          <th>Post</th>
                          <th>Comments</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      {post.map((blog, index) => (
                        <tr key={blog.id}>
                          <td>{index + 1}</td>
                          <td>{blog.username}</td>
                          <td>{blog.post_id}</td>
                          <td>{blog.text}</td>
                          <td>
                            <i
                              className="fa fa-trash text-danger"
                              aria-hidden="true"
                              onClick={() => deletePost(blog.id)}
                            ></i>
                          </td>
                        </tr>
                      ))}
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
