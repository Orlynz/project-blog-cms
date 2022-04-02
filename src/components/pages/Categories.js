import React from "react";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import { Button } from "react-bootstrap";
const Categories = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });
  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        {/* Page Konten */}
        <div className="container-fluid pb-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4
                  style={{
                    float: "left",
                  }}
                >
                  All Categories
                </h4>
                <Button
                  href="/AddCategories"
                  variant="outline-dark"
                  style={{
                    float: "right",
                  }}
                  className="fw-bold"
                  type="submit"
                >
                  <i className="fas fa-plus-circle me-2"></i>ADD CATEGORIES
                </Button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Judul</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Edukasi</td>
                      <td>
                        <a href="/EditCategories">
                          <i className="fas fa-edit me-2"></i>
                        </a>
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
