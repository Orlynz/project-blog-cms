import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Form, Col, Button, Row, Container } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { API_URL } from "../utils/constans";

const AddBlog = () => {
  window.addEventListener("DOMContentLoaded", () => {
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
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategory_id] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const history = useHistory();

  const addPost = async (e) => {
    e.preventDefault();
    e.persist();
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("username", username);
    formData.append("category_id", selectCategory);
    formData.append("description", userInfo.description.value);

    await axios.post(API_URL + `/api/post/`, formData).then(() => {
      Swal.fire({
        title: "Saved!",
        text: "Success adding Post!",
        icon: "success",
      });
    });
    history.push("/Post");
  };

  const getAllCategory = async () => {
    const category = await axios.get(API_URL + "/api/category/");
    setCategory_id(category.data);
  };

  useEffect(() => {
    getAllCategory();
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
              <a href="/Post">
                <i className="fas fa-pencil-alt me-2"></i>Post
              </a>
            </li>
            <li>
              <i className="fas fa-plus-circle me-2"></i>Add Post
            </li>
          </ul>
          <Card>
            <Card.Header>
              <h4 className="pt-1">Add Post</h4>
            </Card.Header>

            <Form
              className="p-2"
              onSubmit={addPost}
              method="POST"
              encType="multipart/form-data"
            >
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Name..."
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Title..."
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Image
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
                  Category
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    name="category"
                    value={selectCategory}
                    onChange={(e) => {
                      setSelectCategory(e.target.value.toString());
                    }}
                    required
                  >
                    <option disabled>Select Category</option>
                    {category_id.map((pot, index) => (
                      <option value={pot.id} key={index}>
                        {pot.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm="10">
                  <Editor
                    placeholder="Description..."
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

export default AddBlog;
