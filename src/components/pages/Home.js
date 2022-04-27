import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

const Home = () => {
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
  const [comment, setComment] = useState([]);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // const [, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllPost();
    getAllComment();
    getAllCategory();
    getAllUser();
    refreshToken();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllPost = async () => {
    const posts = await axios.get("http://localhost:2020/api/post/");
    setPost(posts.data);
  };
  const getAllComment = async () => {
    const comment = await axios.get("http://localhost:2020/api/comment/");
    setComment(comment.data);
  };
  const getAllCategory = async () => {
    const category = await axios.get("http://localhost:2020/api/category/");
    setCategory(category.data);
  };
  const getAllUser = async () => {
    const users = await axios.get("http://localhost:2020/api/users/users");
    setUsers(users.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:2020/api/post/${id}`);
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
          <ul className="breadcrumb">
            <li>
              <i className="fa fa-home me-2"></i>Home
            </li>
          </ul>
          {/* <div className="row g-2"> */}
          {/* <div className="col-md-9"> */}
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>Post</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-pencil-alt"></i> {post.length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>Category</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-folder"></i> {category.length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>Comment</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-comment-dots"></i> {comment.length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>User</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-user"></i> {users.length}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center">
                <h4>Post Terbaru</h4>
                <hr />
              </div>
              <div className="table-responsive">
                <table className="table text-center">
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
                        <td>{blog.title}</td>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: blog.description.slice(0, 70),
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
          {/* </div> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
