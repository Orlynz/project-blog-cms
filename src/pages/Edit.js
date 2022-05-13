import React, { useState, useEffect } from "react";
import axios from "axios";
import Editpost from "./EditBlog";
import { Navbar, Sidebar } from "../components";

const Edit = (props) => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [ispostId, setpostId] = useState([]);

  const viewPostId = async (ids) => {
    try {
      await axios
        .post(`http://localhost:2020/getPostId`, {
          ids: props.match.params.postID,
        })
        .then((res) => {
          if (res.data.success === true) {
            setpostId(res.data.listId);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    viewPostId(props.match.params.postID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
          {ispostId.length > 0 ? (
            <Editpost
              postList={ispostId}
              editPostID={props.match.params.postID}
            />
          ) : null}
      </div>
    </div>
  );
};
export default Edit;
