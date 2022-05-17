import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Form, Col, Button, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { API_URL } from "../utils/constans";

const AddCategories = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [name, setName] = useState("");
  const history = useHistory();

  const addCategory = async (e) => {
    e.preventDefault();

    let category = {
      name: name,
    };

    await axios.post(API_URL + `/api/category/`, category).then(() => {
      Swal.fire({
        title: "Saved!",
        text: "Successfully added Category!",
        icon: "success",
      });
    });
    history.push("/Category");
  };

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
              <a href="/Category">
                <i className="fas fa-folder me-2"></i>Category
              </a>
            </li>
            <li>
              <i className="fas fa-plus-circle me-2"></i>Add Category
            </li>
          </ul>
          <Card className="shadow">
            <Card.Header>
              <h4 className="pt-1">Add Category</h4>
            </Card.Header>
            <Form className="p-2" onSubmit={addCategory}>
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
        </Container>
      </div>
    </div>
  );
};

export default AddCategories;
