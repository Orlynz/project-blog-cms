import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const posts = await axios.get("http://localhost:2020/api/comment/");
    setPost(posts.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:2020/api/comment/${id}`);
    getAllPost();
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
