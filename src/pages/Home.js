import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
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
    Swal.fire({
      title: "Apakah anda ingin menghapus Post?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Batal`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:2020/api/post/${id}`);
        Swal.fire("Terhapus!", "Berhasil menghapus Postingan anda", "success");
      } else if (result.isDenied) {
        Swal.fire("Dibatalkan!", "", "error");
      }
    });
    getAllPost();
  };

  useEffect(() => {
    getAllPost();
    getAllComment();
    getAllCategory();
    getAllUser();
  }, []);

  return (
    <div className="d-flex wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
        <Container className="pb-4">
          <ul className="breadcrumb">
            <li>
              <i className="fa fa-home me-2"></i>Home
            </li>
          </ul>
          <Row>
            <Col lg={3} sm={6}>
              <Card className="text-center backgroud mb-3">
                <Card.Body>
                  <h3>Post</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-pencil-alt"></i> {post.length}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} sm={6}>
              <Card className="text-center backgroud mb-3">
                <Card.Body>
                  <h3>Category</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-folder"></i> {category.length}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} sm={6}>
              <Card className="text-center backgroud mb-3">
                <Card.Body>
                  <h3>Comment</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-comment-dots"></i> {comment.length}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} sm={6}>
              <Card className="text-center backgroud mb-3">
                <Card.Body>
                  <h3>User</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-user"></i> {users.length}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <h4>Post Terbaru</h4>
                <hr />
              </Card.Title>
              <Table responsive className="text-center">
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
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Home;
