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
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const AddBlog = (props) => {
  let history = useHistory();
  const [userInfo, setuserInfo] = useState({
    title: props.postList[0].title,
    name: props.postList[0].name,
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.postList[0].description)
    )
  );
  const [description, setDescription] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const PoemAddbooks = async (event) => {
    Swal.fire({
      title: "Apakah anda ingin menyimpan perubahan?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Simpan",
      denyButtonText: `Batal`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:2020/editPost`, {
            title: userInfo.title,
            name: userInfo.name,
            description: userInfo.description.value,
            ids: props.editPostID,
          })
          .then((res) => {
            if (res.data.success === true) {
              history.push("/Post");
            }
          });
        Swal.fire("Tersimpan!", "Postingan anda berhasil diubah.", "success");
      } else if (result.isDenied) {
        Swal.fire("Perubahan tidak disimpan!", "", "info");
      }
    });
    event.preventDefault();
    event.persist();
  };

  return (
    <div className="container pb-4">
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
      <Card className="shadow">
        <div className="card-header">
          <h4
            style={{
              float: "left",
            }}
          >
            Edit Blog
          </h4>
        </div>

        <Form
          style={{
            padding: "10px",
          }}
          onSubmit={PoemAddbooks}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Nama
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Nama mu..."
                required
                name="name"
                value={userInfo.name}
                onChange={onChangeValue}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Judul Blog
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Judul Blog..."
                required
                name="title"
                value={userInfo.title}
                onChange={onChangeValue}
              />
            </Col>
          </Form.Group>
          {/* <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Kategori
                </Form.Label>
                <Col sm="10">
                  <Form.Select name="category" required>
                    <option disabled>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </Form.Group> */}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Isi Konten
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
                style={{ display: "none" }}
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
              style={{
                padding: "5px",
                borderRadius: "10px",
                float: "right",
              }}
              type="submit"
            >
              <strong>
                SIMPAN <i className="fa fa-save"></i>
              </strong>
            </Button>
          </Col>
        </Form>
      </Card>
    </div>
  );
};

export default AddBlog;
