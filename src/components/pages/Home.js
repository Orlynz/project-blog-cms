import React from "react";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

const Home = () => {
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
          <div className="row g-2">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header text-center">
                  <h4>Posts Terbaru</h4>
                </div>
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Judul</th>
                      <th>Tnggal</th>
                      <th>Kategori</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Java Coding Tips For Beginners</td>
                      <td>Dec 8, 2021 </td>
                      <td>Educational</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>Posts</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-pencil-alt"></i> 235
                  </h4>
                </div>
              </div>
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>Categories</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-folder"></i> 134
                  </h4>
                </div>
              </div>
              <div className="card text-center backgroud mb-3">
                <div className="card-body">
                  <h3>Comments</h3>
                  <h4 className="display-4 fw-bold">
                    <i className="fas fa-comment-dots"></i> 53
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
