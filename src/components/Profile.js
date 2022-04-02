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
        <div className="container-fluid pb-4">
          <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
              <div className="card">
                <div className="card-body">
                  <div className="m-t-30 center text-center">
                    <img
                      src="https://i.pinimg.com/736x/3b/a2/c4/3ba2c46051c4fc2e7eb353f2eb1f08e4.jpg"
                      className="rounded-circle"
                      width="200"
                      height="200"
                    />
                    <h2 className=" m-t-10">Orlynz Sambora</h2>
                    <br />
                    <h6 className="card-subtitle">
                      <i>"bwa bwaaa bwa bwa baw waaaaaaaaaaaa"</i>
                    </h6>
                  </div>
                </div>
                <hr />
                <div className="card-body">
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
                  <div className="card-title text-center">
                    <h4>Edit Profile</h4>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <form className="form-horizontal form-material mx-2">
                    <div className="form-group pb-2">
                      <label className="col-md-12">Full Name</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="Name..."
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label for="example-email" className="col-md-12">
                        Email
                      </label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          required
                          placeholder="Email..."
                          className="form-control form-control-line"
                          name="example-email"
                          id="example-email"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Password</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          required
                          placeholder="Pasword..."
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Phone No</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          required
                          placeholder="+62 XXXXXXXX"
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Address</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          required
                          placeholder="Address..."
                          className="form-control form-control-line"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label className="col-md-12">Message</label>
                      <div className="col-md-12">
                        <textarea
                          rows="3"
                          required
                          placeholder="Message..."
                          className="form-control form-control-line"
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <div className="col-sm-12">
                        <button className="btn oren fw-bold">
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
