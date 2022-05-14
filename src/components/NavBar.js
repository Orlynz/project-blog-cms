import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { API_URL } from "../utils/constans";

const NavBar = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.get(API_URL + "/api/users/token");
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
      } catch (error) {
        if (error.response) {
          history.push("/");
        }
      }
    };

    refreshToken();
  }, [history]);

  return (
    <Navbar className="py-4 px-4" bg="transparent" expand="lg">
      <Container>
        <Navbar.Brand>
          <i
            className="fas fa-align-left fs-4 me-3 d-flex align-items-center"
            id="sidebarToggle"
          ></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link className="fw-bold text-black">
              <i className="fas fa-user me-2"></i>
              {name}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
