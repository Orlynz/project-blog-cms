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
                <h4>Add Blog</h4>
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
                    Judul Blog
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Judul Blog..."
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Kategori
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select name="category" required>
                      <option disabled>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Upload Foto
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="file" required />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Isi Konten
                  </Form.Label>
                  <Col sm="10">
                    <CKEditor
                      editor={ClassicEditor}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Col>
                  <Button
                    variant="outline-dark"
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      float: "right",
                    }}
                    type="submit"
                  >
                    <strong>SIMPAN</strong>
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
