import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";

const EditCategories = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
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
      title: "Apakah anda ingin menyimpan perubahan?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Simpan",
      denyButtonText: `Batal`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.put(`http://localhost:2020/api/category/${id}`, data);
        history.push("/Category");
        Swal.fire("Tersimpan!", "Kategori berhasil diubah.", "success");
      } else if (result.isDenied) {
        Swal.fire("Perubahan tidak disimpan!", "", "info");
      }
    });
  };

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(
        `http://localhost:2020/api/category/${id}`
      );
      setName(data.name);
    };

    getDataById();
  }, [id]);

  return (<div className="d-flex wrapper">
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
        <div className="card-header">
          <h4
            style={{
              float: "left",
            }}
          >
            Edit Kategori
          </h4>
        </div>

        <Form
          style={{
            padding: "10px",
          }}
          onSubmit={updateHandler}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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

export default EditCategories;
