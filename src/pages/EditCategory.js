import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { API_URL } from "../utils/constans";

const EditCategories = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");

  const updateHandler = async (e) => {
    e.preventDefault();
    e.persist();
    const data = {
      name: name,
    };

     Swal.fire({
      title: "Do you want to save changes?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(API_URL + `/api/category/${id}`, data);
        history.push("/Category");
        Swal.fire("Saved!", "Category changed successfully!", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved!", "", "info");
      }
    });
  };

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(API_URL + `/api/category/${id}`);
      setName(data.name);
    };

    getDataById();
  }, [id]);

  return (
    <div className="d-flex wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
        <div className="container pb-4">
          <ul className="breadcrumb">
            <li>
              <a href="/Home">
                <i className="fa fa-home me-2"></i>Home
              </a>
            </li>
            <li>
              <a href="/Category">
                <i className="fas fa-folder me-2"></i>Category
              </a>
            </li>
            <li>
              <i className="fas fa-edit me-2"></i>Edit Category
            </li>
          </ul>
          <Card className="shadow">
            <Card.Header>
              <h4 className="pt-1">Edit Category</h4>
            </Card.Header>
            <Form className="p-2" onSubmit={updateHandler}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Title..."
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Col>
                <Button
                  variant="outline-dark"
                  className="p-2 float-end fw-bold"
                  type="submit"
                >
                  SAVE <i className="fa fa-save"></i>
                </Button>
              </Col>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
