import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container, Table } from "react-bootstrap";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { API_URL } from "../utils/constans";

const Posts = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [post, setPost] = useState([]);

  const getAllPost = async () => {
    const posts = await axios.get(API_URL + "/api/post/");
    setPost(posts.data);
  };

  const deletePost = async (id) => {
    await Swal.fire({
      title: "Apakah anda ingin menghapus Post?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Batal`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + `/api/post/${id}`);
        Swal.fire("Terhapus!", "Berhasil menghapus Postingan anda", "success");
      } else if (result.isDenied) {
        Swal.fire("Dibatalkan!", "", "error");
      }
    });
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
              <i className="fas fa-pencil-alt me-2"></i>Post
            </li>
          </ul>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4 className="float-start pt-1">Post</h4>
                <Button
                  href="/AddPost"
                  variant="outline-dark"
                  type="submit"
                  className="fw-bold float-end"
                >
                  <i className="fas fa-plus-circle me-2"></i>ADD POST
                </Button>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Table responsive id="example" className="text-center">
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
                          src={API_URL + `/${blog.image}`}
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
export default Posts;
