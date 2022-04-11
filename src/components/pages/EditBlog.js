import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

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
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal_upload, setTanggal_upload] = useState("");
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const updateBlog = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:4000/post/${id}`, {
      nama: nama,
      judul: judul,
      deskripsi: deskripsi,
      tanggal_upload: tanggal_upload,
    });
    history.push("/Posts");
  };

  useEffect(() => {
    getSchoolById();
  }, []);

  const getSchoolById = async () => {
    const response = await axios.get(`http://localhost:4000/post/${id}`);
    setNama(response.data.nama);
    setJudul(response.data.judul);
    setDeskripsi(response.data.deskripsi);
    setTanggal_upload(response.data.tanggal_upload);
  };

  useEffect(() => {
    refreshToken();
  });

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
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
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
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
                Edit Blog
              </h4>
            </div>

            <Form
              style={{
                padding: "10px",
              }}
              onSubmit={updateBlog}
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
                    placeholder="Nama mu..."
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
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
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
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
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </Form.Group> */}
              {/* <Form.Group
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
                </Form.Group> */}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Isi Konten
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    name="nama"
                    placeholder="Isi konten..."
                    required
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                  {/* <CKEditor
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
                    /> */}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Tanggal
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="date"
                    placeholder="Tangal..."
                    required
                    value={tanggal_upload}
                    onChange={(e) => setTanggal_upload(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Col>
                <Button
                  variant="outline-dark"
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  className="fw-bold m"
                >
                  SIMPAN
                </Button>

                {/* <Button
                    variant="outline-dark"
                    style={{
                      float: "right",
                    }}
                    type="submit"
                    className="fw-bold me-2"
                  >
                    <i className="fa fa-trash me-2" aria-hidden="true"></i>
                    DELETE
                  </Button> */}
              </Col>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
