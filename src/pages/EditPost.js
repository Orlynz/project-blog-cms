import React, { useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useHistory } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { Card, Form, Col, Button, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constans";

const EditPost = (props) => {
  const history = useHistory();

  const [userInfo, setuserInfo] = useState({
    title: props.postList[0].title,
    username: props.postList[0].username,
  });

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.postList[0].description)
    )
  );
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const EditPost = async (event) => {
    Swal.fire({
      title: "Do you want to save changes?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(API_URL + `/editPost`, {
            title: userInfo.title,
            username: userInfo.username,
            description: userInfo.description.value,
            ids: props.editPostID,
          })
          .then((res) => {
            if (res.data.success === true) {
              history.push("/Post");
            }
          });
        Swal.fire(
          "Saved!",
          "Your post has been modified successfully!",
          "success"
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved!", "", "info");
      }
    });
    event.preventDefault();
    event.persist();
  };

  return (
    <Container className="pb-4">
      <ul className="breadcrumb">
        <li>
          <a href="/Home">
            <i className="fa fa-home me-2"></i>Home
          </a>
        </li>
        <li>
          <a href="/Post">
            <i className="fas fa-folder me-2"></i>Post
          </a>
        </li>
        <li>
          <i className="fas fa-edit me-2"></i>Edit Post
        </li>
      </ul>
      <Card>
        <Card.Header>
          <h4 className="pt-1">Edit Post</h4>
        </Card.Header>
        <Form className="p-2" onSubmit={EditPost}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                required
                name="username"
                value={userInfo.username}
                onChange={onChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                required
                name="title"
                value={userInfo.title}
                onChange={onChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
              <textarea
                className="d-none"
                disabled
                ref={(val) => (userInfo.description = val)}
                value={draftToHtml(
                  convertToRaw(description.getCurrentContent())
                )}
              />
            </Col>
          </Form.Group>

          <Col>
            <Button
              variant="outline-dark"
              className="p-2 float-end fw-bold"
              type="submit"
            >
              SAVE <i className="fa fa-save"></i>
            </Button>
          </Col>
        </Form>
      </Card>
    </Container>
  );
};

export default EditPost;
