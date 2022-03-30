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
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header text-center">
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
                    type="submit"
                  >
                    <strong>ADD</strong>
                  </Button>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Judul</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
