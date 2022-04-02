import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

class AddBlog extends Component {
  componentDidMount() {
    window.addEventListener("DOMContentLoaded", (event) => {
      const sidebarToggle = document.body.querySelector("#sidebarToggle");
      if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (event) => {
          event.preventDefault();
          document.body.classList.toggle("sidebar-toggle");
        });
      }
    });
  }
  render() {
    return (
      <div className="d-flex bungkus">
        <SideBar />
        <div className="konten-bungkus">
          <NavBar />
          {/* Page Konten */}
          <div className="container-fluid pb-4">
            <Card className="shadow">
              <div className="card-header">
                <h4
                  style={{
                    float: "left",
                  }}
                >
                  Edit Kategori
                </h4>
                <Button
                  variant="outline-dark"
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  className="fw-bold"
                >
                  <i className="fa fa-trash me-2" aria-hidden="true"></i>
                  DELETE
                </Button>
              </div>

              <Form
                style={{
                  padding: "10px",
                }}
              >
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Judul Kategori
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Judul Kategori..."
                      required
                    />
                  </Col>
                </Form.Group>

                <Col>
                  <Button
                    variant="outline-dark"
                    style={{
                      float: "right",
                    }}
                    className="fw-bold"
                  >
                    SIMPAN
                  </Button>
                </Col>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBlog;
