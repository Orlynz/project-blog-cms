import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container, Table } from "react-bootstrap";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Swal from "sweetalert2";
import { Navbar, Sidebar } from "../components";
import { API_URL } from "../utils/constans";

const Categories = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [category, setCategory] = useState([]);

  const getAllCategory = async () => {
    const category = await axios.get(API_URL + "/api/category/");
    setCategory(category.data);
  };

  const deleteCategory = async (id) => {
    await Swal.fire({
      title: "Apakah anda ingin menghapus Kategori?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Batal`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + `/api/category/${id}`);
        Swal.fire("Terhapus!", "Berhasil menghapus Kategori", "success");
      } else if (result.isDenied) {
        Swal.fire("Dibatalkan!", "", "error");
      }
    });

    getAllCategory();
  };

  useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Navbar />
        <Container className="pb-4">
          <ul className="breadcrumb">
            <li>
              <a href="/Home">
                <i className="fa fa-home me-2"></i>Home
              </a>
            </li>
            <li>
              <i className="fas fa-folder me-2"></i>Category
            </li>
          </ul>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4 className="float-start pt-1">Category</h4>
                <Button
                  href="/AddCategory"
                  variant="outline-dark"
                  className="fw-bold float-end"
                  type="submit"
                >
                  <i className="fas fa-plus-circle me-2"></i>ADD CATEGORY
                </Button>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Table responsive id="example" className="text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((categories, index) => (
                    <tr key={categories.id}>
                      <td>{index + 1}</td>
                      <td>{categories.name}</td>
                      <td>
                        <a href={`/EditCategory/${categories.id}`}>
                          <i className="fas fa-edit me-2"></i>
                        </a>
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                          onClick={() => deleteCategory(categories.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Categories;
