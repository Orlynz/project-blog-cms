import React from "react";

const SideBar = () => {
  return (
    <div className="bg-white sidebar">
      <div className="sidebar-head text-center py-4 jingga fs-4 fw-bold text-uppercase border-bottom">
        G2 | Academy
      </div>
      <div className="list-group list-group-flush my-3">
        <a
          href="/"
          className="list-group-item list-group-item-action bg-transparent jingga fw-bold"
        >
          <i className="fa fa-home me-2"></i>Home
        </a>
        <a
          href="/Posts"
          className="list-group-item list-group-item-action bg-transparent jingga fw-bold"
        >
          <i className="fas fa-pencil-alt me-2"></i>Posts
        </a>
        <a
          href="/Categories"
          className="list-group-item list-group-item-action bg-transparent jingga fw-bold"
        >
          <i className="fas fa-folder me-2"></i>Categories
        </a>
        <a
          href="/Comments"
          className="list-group-item list-group-item-action bg-transparent jingga fw-bold"
        >
          <i className="fas fa-comment-dots me-2"></i>Comments
        </a>
        <a
          href="/AddBlog"
          className="list-group-item list-group-item-action bg-transparent jingga fw-bold"
        >
          <i className="fas fa-plus-circle me-2"></i>Add Blog
        </a>
        <a
          href="/AddCategories"
          className="list-group-item list-group-item-action bg-transparent jingga fw-bold"
        >
          <i className="fas fa-plus-circle me-2"></i>Add Categories
        </a>
        <a
          href="/Logout"
          className="list-group-item list-group-item-action bg-transparent merah fw-bold"
        >
          <i className="fas fa-power-off me-2"></i>Logout
        </a>
      </div>
    </div>
  );
};

export default SideBar;
