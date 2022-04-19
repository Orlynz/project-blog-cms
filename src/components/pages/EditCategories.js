import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

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

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(
        `http://localhost:2020/api/category/${id}`
      );
      setName(data.name);
    };

    getDataById();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();

    // update by put request

    const data = {
      name: name,
    };

    await axios.put(`http://localhost:2020/api/category/${id}`, data);

    history.push("/Categories");
  };

  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        {/* Page Konten */}
        <div className="container pb-4">
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
                    SIMPAN <i class="fa fa-save"></i>
                  </strong>
                </Button>
              </Col>
              <Col>
                <Button
                  href="/Categories"
                  variant="outline-dark"
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    marginRight: "10px",
                    float: "right",
                  }}
                >
                  <strong>
                    <i class="fas fa-caret-left"></i> BACK
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
