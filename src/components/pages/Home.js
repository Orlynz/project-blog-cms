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
        <div className="container-fluid pb-4">
          <div className="row g-2">
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>Posts Terbaru</h4>
                    <hr />
                  </div>
                  <div className="table-responsive">
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Judul</th>
                          <th>Kategori</th>
                          <th>Tnggal</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Judul 1</td>
                          <td>Kategori 1</td>
                          <td>Tanggal 1</td>
                          <td>
                            <a href="/EditBlog">
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
