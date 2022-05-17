import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constans";

const SideBar = () => {
  const history = useHistory();

  const Logout = async () => {
    await Swal.fire({
      title: "Are you sure you want to leave?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Leave",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + "/api/users/logout");
        Swal.fire("Logout!", "Successfully logout!", "success");
        history.push("/");
      }
    });
  };

  return (
    <div className="bg-white sidebar">
      <div className="sidebar-head text-center py-4 orange fs-4 fw-bold text-uppercase border-bottom">
        G2 | Academy
      </div>
      <div className="list-group list-group-flush my-3">
        <a
          href="/Home"
          className="list-group-item list-group-item-action orange fw-bold"
        >
          <i className="fa fa-home me-2"></i>Home
        </a>
        <a
          href="/Post"
          className="list-group-item list-group-item-action orange fw-bold"
        >
          <i className="fas fa-pencil-alt me-2"></i>Post
        </a>
        <a
          href="/Category"
          className="list-group-item list-group-item-action orange fw-bold"
        >
          <i className="fas fa-folder me-2"></i>Category
        </a>
        <a
          href="/Comment"
          className="list-group-item list-group-item-action orange fw-bold"
        >
          <i className="fas fa-comment-dots me-2"></i>Comment
        </a>
        <a
          href="#/"
          onClick={Logout}
          className="list-group-item list-group-item-action red fw-bold"
        >
          <i className="fas fa-power-off me-2"></i>Logout
        </a>
      </div>
    </div>
  );
};

export default SideBar;
