import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Sidebar } from "../components";
import { Card, Container, Table } from "react-bootstrap";

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

  const getAllPost = async () => {
    const posts = await axios.get("http://localhost:2020/api/comment/");
    setPost(posts.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:2020/api/comment/${id}`);
    getAllPost();
  };

  useEffect(() => {
    getAllPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
        <Container className="pb-4">
          <ul className="breadcrumb">
            <li>
              <a href="/Home">
                <i className="fa fa-home me-2"></i>Home
              </a>
            </li>
            <li>
              <i className="fas fa-comment-dots me-2"></i>Comment
            </li>
          </ul>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Comment</h4>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Table responsive className="text-center">
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
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Comments;
