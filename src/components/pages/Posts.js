import React from "react";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

class App extends React.Component {
  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
      $("#example").DataTable();
    });
    window.addEventListener("DOMContentLoaded", (event) => {
      const sidebarToggle = document.body.querySelector("#sidebarToggle");
      if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (event) => {
          event.preventDefault();
          document.body.classList.toggle("sidebar-toggle");
        });
      }
    });
  }

  render() {
    return (
      <div className="d-flex bungkus">
        <SideBar />
        <div className="konten-bungkus">
          <NavBar />
          {/* Page Konten */}
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header text-center">
                    <h4>All Posts</h4>
                  </div>
                  <table className="table table-striped" id="example">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Gambar</th>
                        <th>Kategori</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
                      </tr>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Gambar</td>
                        <td>Kategori</td>
                        <td>Aksi</td>
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
  }
}
export default App;
