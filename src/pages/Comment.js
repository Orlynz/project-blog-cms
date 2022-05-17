import React, { useState, useEffect } from "react";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { Card, Container, Table } from "react-bootstrap";
import { API_URL } from "../utils/constans";

const Comments = () => {
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

  const [comment, setComment] = useState([]);

  const getAllComment = async () => {
    const comments = await axios.get(API_URL + "/api/comment/");
    setComment(comments.data);
  };

  const deleteComment = async (id) => {
    await Swal.fire({
      title: "Do you want to delete Comment?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cencel`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + `/api/comment/${id}`);
        Swal.fire("Deleted!", "Successfully deleted Comment!", "success");
      } else if (result.isDenied) {
        Swal.fire("Cancelled!", "", "error");
      }
    });
    getAllComment();
  };

  useEffect(() => {
    getAllComment();
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
              <Card.Title className="text-center">
                <h4>Comment</h4>
                <hr />
              </Card.Title>
              <Table responsive id="example" className="text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Post</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {comment.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.username}</td>
                    <td>{blog.post_id}</td>
                    <td>{blog.text}</td>
                    <td>
                      <i
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                        onClick={() => deleteComment(blog.id)}
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
