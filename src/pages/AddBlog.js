import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Form, Col, Button, Row, Container } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";

const AddBlog = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };
  const [userInfo] = useState({});
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  const addProductHandler = async (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("name", name);
    formData.append("description", userInfo.description.value);

    axios.post(`http://localhost:2020/api/post/`, formData).then((res) => {
      Swal.fire({
        title: "Tersimpan!",
        text: "Sukses menambahkan Post",
        icon: "success",
      });
    });
    history.push("/Post");
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
              <a href="/Post">
                <i className="fas fa-pencil-alt me-2"></i>Posts
              </a>
            </li>
            <li>
              <i className="fas fa-plus-circle me-2"></i>Add Post
            </li>
          </ul>
          <Card>
            <Card.Header>
              <h4>Add Blog</h4>
            </Card.Header>

            <Form
              className="p-2"
              onSubmit={addProductHandler}
              method="POST"
              encType="multipart/form-data"
            >
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Nama
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Nama..."
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Judul Blog
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Judul Blog..."
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
              </Form.Group>
              {/* <Form.Group
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
                    {category.map((categories) => (
                      <option
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Upload Foto
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="file"
                    required
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Isi Konten
                </Form.Label>
                <Col sm="10">
                  {/* <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    name="nama"
                    placeholder="Isi konten..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  /> */}
                  <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <textarea
                    className="d-none"
                    disabled
                    ref={(val) => (userInfo.description = val)}
                    value={draftToHtml(
                      convertToRaw(description.getCurrentContent())
                    )}
                  />
                </Col>
              </Form.Group>

              <Col>
                <Button
                  variant="outline-dark"
                  className="p-2 float-end fw-bold"
                  type="submit"
                >
                  SIMPAN <i className="fa fa-save"></i>
                </Button>
              </Col>
            </Form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AddBlog;
