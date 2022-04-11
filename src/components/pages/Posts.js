import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import $ from "jquery";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Button } from "react-bootstrap";

const Posts = () => {
  // datatable
  // $(document).ready(function () {
  //   $("#example").DataTable();
  // });
  // toggled
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
    const posts = await axios.get("http://localhost:5000/post");
    setPost(posts.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/post/${id}`);
    getAllPost();
  };
  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        {/* Page Konten */}
        <div className="container-fluid pb-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4
                  style={{
                    float: "left",
                  }}
                >
                  All Posts
                </h4>
                <Button
                  href="/AddBlog"
                  variant="outline-dark"
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  className="fw-bold"
                >
                  <i className="fas fa-plus-circle me-2"></i>ADD POSTS
                </Button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className=" table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>gambar</th>
                      <th>Judul</th>
                      <th>Tanggal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.map((blog, index) => (
                      <tr key={blog.id}>
                        <td>{index + 1}</td>
                        <td>{blog.nama}</td>
                        <td>
                          <img src={blog.image} />
                        </td>
                        <td>{blog.judul}</td>
                        <td>{blog.tanggal_upload}</td>
                        <td>
                          <a href={`/EditBlog/${blog.id}`}>
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
