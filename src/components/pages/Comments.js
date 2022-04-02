import React from "react";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";

const Comments = () => {
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
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>All Comment</h4>
                    <hr />
                  </div>
                  <div className="table-responsive">
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Comments</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Orlynz</td>
                          <td>Hahahahahaha</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Orlynz</td>
                          <td>Hahahahahaha</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Orlynz</td>
                          <td>Hahahahahaha</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
