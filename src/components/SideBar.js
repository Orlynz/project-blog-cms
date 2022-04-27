import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const SideBar = () => {
  const history = useHistory();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:2020/api/users/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white sidebar">
      <div className="sidebar-head text-center py-4 jingga fs-4 fw-bold text-uppercase border-bottom">
        G2 | Academy
      </div>
      <div className="list-group list-group-flush my-3">
        <a
          href="/Home"
          className="list-group-item list-group-item-action jingga fw-bold"
        >
          <i className="fa fa-home me-2"></i>Home
        </a>
        <a
          href="/Post"
          className="list-group-item list-group-item-action jingga fw-bold"
        >
          <i className="fas fa-pencil-alt me-2"></i>Post
        </a>
        <a
          href="/Category"
          className="list-group-item list-group-item-action jingga fw-bold"
        >
          <i className="fas fa-folder me-2"></i>Category
        </a>
        <a
          href="/Comment"
          className="list-group-item list-group-item-action jingga fw-bold"
        >
          <i className="fas fa-comment-dots me-2"></i>Comment
        </a>
        {/* <a
          href="/AddPost"
          className="list-group-item list-group-item-action jingga fw-bold"
        >
          <i className="fas fa-plus-circle me-2"></i>Add Blog
        </a> */}
        {/* <a
          href="/AddCategory"
          className="list-group-item list-group-item-action jingga fw-bold"
        >
          <i className="fas fa-plus-circle me-2"></i>Add Categories
        </a> */}
        <a
          href="#/"
          onClick={Logout}
          className="list-group-item list-group-item-action merah fw-bold"
        >
          <i className="fas fa-power-off me-2"></i>Logout
        </a>
      </div>
    </div>
  );
};

export default SideBar;
