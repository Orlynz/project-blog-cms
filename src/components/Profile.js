import React from "react";
import SideBar from "./SideBar.js";
import NavBar from "./NavBar.js";

const Profile = () => {
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
              <div className="card">
                <div className="card-body">
                  <div className="m-t-30 center text-center">
                    <img
                      src="https://images7.alphacoders.com/719/719179.png"
                      className="rounded-circle"
                      width="200"
                      height="200"
                    />
                    <h4 className="card-title m-t-10">Orlynz Sambora</h4>
                    <h6 className="card-subtitle">Accounts Manager</h6>
                  </div>
                </div>
                <div className="card-body">
                  <hr />
                  <small className="text-muted">Email ddress </small>
                  <h6>schwarz090404@gmail.com</h6>
                  <small className="text-muted p-t-30 db">Phone</small>
                  <h6>+628 9506 616 552</h6>
                  <small className="text-muted p-t-30 db">Address</small>
                  <h6>Kalikangkung Street RT 2 RW 1</h6>
                  <hr />
                  <div className="text-center">
                    <a>
                      <i className="fab fa-facebook-f fs-4 me-5"></i>
                    </a>
                    <a>
                      <i className="fab fa-twitter fs-4 me-5"></i>
                    </a>
                    <a>
                      <i className="fab fa-youtube fs-4"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-7">
              <div className="card">
                <div className="card-body">
                  <form className="form-horizontal form-material mx-2">
                    <div className="form-group">
                      <label className="col-md-12">Full Name</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="Johnathan Doe"
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="example-email" className="col-md-12">
                        Email
                      </label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          placeholder="johnathan@admin.com"
                          className="form-control form-control-line"
                          name="example-email"
                          id="example-email"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12">Password</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          value="password"
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12">Phone No</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="123 456 7890"
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12">Message</label>
                      <div className="col-md-12">
                        <textarea
                          rows="5"
                          className="form-control form-control-line"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-12">Select Country</label>
                      <div className="col-sm-12">
                        <select className="form-select shadow-none form-control-line">
                          <option>Japan</option>
                          <option>South Korea</option>
                          <option>USA</option>
                          <option>Indonesia</option>
                          <option>Russia</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12">
                        <button className="btn btn-success text-white">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
