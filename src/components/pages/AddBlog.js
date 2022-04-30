import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Swal from "sweetalert2";

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
  const [userInfo] = useState({});
  // const onChangeValue = (e) => {
  //   setuserInfo({
  //     ...userInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // const [category, setCategory] = useState([]);
  const [, setUsers] = useState([]);
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
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
    });
    history.push("/Post");
  };

  // const getAllCategory = async () => {
  //   const category = await axios.get("http://localhost:2020/api/category/");
  //   setCategory(category.data);
  // };

  useEffect(() => {
    refreshToken();
    // getAllCategory();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:2020/api/users/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "http://localhost:2020/api/users/token"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        // setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get(
      "http://localhost:2020/api/users/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };

  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        {/* Page Konten */}
        <div className="container pb-4">
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
          <Card className="card">
            <div className="card-header">
              <h4>Add Blog</h4>
            </div>

            <Form
              style={{
                padding: "10px",
              }}
              onSubmit={addProductHandler}
              method="POST"
              encType="multipart/form-data"
            >
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
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
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
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
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
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
                    style={{ display: "none" }}
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
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    float: "right",
                  }}
                  type="submit"
                >
                  <strong>
                    SIMPAN <i className="fa fa-save"></i>
                  </strong>
                </Button>
              </Col>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
