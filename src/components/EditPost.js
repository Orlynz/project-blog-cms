import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit } from "../pages";
import { Navbar, Sidebar } from "./index";
import { API_URL } from "../utils/constans";

const EditPost = (props) => {
  window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const [ispostId, setpostId] = useState([]);

  useEffect(() => {
    const viewPostId = async () => {
      try {
        await axios
          .post(API_URL + `/getPostId`, {
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

    viewPostId(props.match.params.postID);
  }, [props.match.params.postID]);

  return (
    <div className="d-flex wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
        {ispostId.length > 0 ? (
          <Edit postList={ispostId} editPostID={props.match.params.postID} />
        ) : null}
      </div>
    </div>
  );
};
export default EditPost;
