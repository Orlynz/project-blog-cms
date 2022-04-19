import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import { Card, Form, Col, Button, Row } from "react-bootstrap";

const AddCategories = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [, setUsers] = useState([]);
  const history = useHistory();

  const addCategory = async (e) => {
    e.preventDefault();

    let category = {
      name: name,
    };

    await axios.post("http://localhost:2020/api/category", category);
    history.push("/Categories");
  };

  useEffect(() => {
    refreshToken();
    getUsers();
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
        <div className="container-fluid pb-4">
          <Card className="shadow">
            <div className="card-header">
              <h4>Add Categories</h4>
            </div>
            <Form
              style={{
                padding: "10px",
              }}
              onChange={addCategory}
            >
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Judul
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Judul..."
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

export default AddCategories;
