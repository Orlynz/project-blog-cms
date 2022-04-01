import React from "react";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Button } from "react-bootstrap";

class App extends React.Component {
  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
      $("#example").DataTable();
    });
    window.addEventListener("DOMContentLoaded", (event) => {
      const sidebarToggle = document.body.querySelector("#sidebarToggle");
      if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (event) => {
          event.preventDefault();
          document.body.classList.toggle("sidebar-toggle");
        });
      }
    });
  }

  render() {
    return (
      <div className="d-flex bungkus">
        <SideBar />
        <div className="konten-bungkus">
          <NavBar />
          {/* Page Konten */}
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4
                    style={{
                      float: "left",
                    }}
                  >
                    All Posts
                  </h4>
                  <Button
                    href="/AddBlog"
                    variant="outline-dark"
                    style={{
                      float: "right",
                    }}
                    type="submit"
                  >
                    <strong>ADD</strong>
                  </Button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className=" table text-center" id="example">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Kategori</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Judul 1</td>
                        <td>Kategori 1</td>
                        <td>Tanggal 1</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Judul 2</td>
                        <td>Kategori 2</td>
                        <td>Tanggal 2</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Judul 3</td>
                        <td>Kategori 3</td>
                        <td>Tanggal 3</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Judul 4</td>
                        <td>Kategori 4</td>
                        <td>Tanggal 4</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Judul 5</td>
                        <td>Kategori 5</td>
                        <td>Tanggal 5</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Judul 6</td>
                        <td>Kategori 6</td>
                        <td>Tanggal 6</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Judul 7</td>
                        <td>Kategori 7</td>
                        <td>Tanggal 7</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>Judul 8</td>
                        <td>Kategori 8</td>
                        <td>Tanggal 8</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>Judul 9</td>
                        <td>Kategori 9</td>
                        <td>Tanggal 9</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>Judul 10</td>
                        <td>Kategori 10</td>
                        <td>Tanggal 10</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>Judul 11</td>
                        <td>Kategori 11</td>
                        <td>Tanggal 11</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>12</td>
                        <td>Judul 12</td>
                        <td>Kategori 12</td>
                        <td>Tanggal 12</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>13</td>
                        <td>Judul 13</td>
                        <td>Kategori 13</td>
                        <td>Tanggal 13</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>14</td>
                        <td>Judul 14</td>
                        <td>Kategori 14</td>
                        <td>Tanggal 14</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>15</td>
                        <td>Judul 15</td>
                        <td>Kategori 15</td>
                        <td>Tanggal 15</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>16</td>
                        <td>Judul 16</td>
                        <td>Kategori 16</td>
                        <td>Tanggal 16</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>17</td>
                        <td>Judul 17</td>
                        <td>Kategori 17</td>
                        <td>Tanggal 17</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>18</td>
                        <td>Judul 18</td>
                        <td>Kategori 18</td>
                        <td>Tanggal 18</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>19</td>
                        <td>Judul 19</td>
                        <td>Kategori 19</td>
                        <td>Tanggal 19</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>20</td>
                        <td>Judul 20</td>
                        <td>Kategori 20</td>
                        <td>Tanggal 20</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>21</td>
                        <td>Judul 21</td>
                        <td>Kategori 21</td>
                        <td>Tanggal 21</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>22</td>
                        <td>Judul 22</td>
                        <td>Kategori 22</td>
                        <td>Tanggal 22</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>23</td>
                        <td>Judul 23</td>
                        <td>Kategori 23</td>
                        <td>Tanggal 23</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>24</td>
                        <td>Judul 24</td>
                        <td>Kategori 24</td>
                        <td>Tanggal 24</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>25</td>
                        <td>Judul 25</td>
                        <td>Kategori 25</td>
                        <td>Tanggal 25</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>26</td>
                        <td>Judul 26</td>
                        <td>Kategori 26</td>
                        <td>Tanggal 26</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>27</td>
                        <td>Judul 27</td>
                        <td>Kategori 27</td>
                        <td>Tanggal 27</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>28</td>
                        <td>Judul 28</td>
                        <td>Kategori 28</td>
                        <td>Tanggal 28</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>29</td>
                        <td>Judul 29</td>
                        <td>Kategori 29</td>
                        <td>Tanggal 29</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>30</td>
                        <td>Judul 30</td>
                        <td>Kategori 30</td>
                        <td>Tanggal 30</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>31</td>
                        <td>Judul 31</td>
                        <td>Kategori 31</td>
                        <td>Tanggal 31</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>32</td>
                        <td>Judul 32</td>
                        <td>Kategori 32</td>
                        <td>Tanggal 32</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>33</td>
                        <td>Judul 33</td>
                        <td>Kategori 33</td>
                        <td>Tanggal 33</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>34</td>
                        <td>Judul 34</td>
                        <td>Kategori 34</td>
                        <td>Tanggal 34</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>35</td>
                        <td>Judul 35</td>
                        <td>Kategori 35</td>
                        <td>Tanggal 35</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>36</td>
                        <td>Judul 36</td>
                        <td>Kategori 36</td>
                        <td>Tanggal 36</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>37</td>
                        <td>Judul 37</td>
                        <td>Kategori 37</td>
                        <td>Tanggal 37</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>38</td>
                        <td>Judul 38</td>
                        <td>Kategori 38</td>
                        <td>Tanggal 38</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>39</td>
                        <td>Judul 39</td>
                        <td>Kategori 39</td>
                        <td>Tanggal 39</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>40</td>
                        <td>Judul 40</td>
                        <td>Kategori 40</td>
                        <td>Tanggal 40</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>41</td>
                        <td>Judul 41</td>
                        <td>Kategori 41</td>
                        <td>Tanggal 41</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>42</td>
                        <td>Judul 42</td>
                        <td>Kategori 42</td>
                        <td>Tanggal 42</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>43</td>
                        <td>Judul 43</td>
                        <td>Kategori 43</td>
                        <td>Tanggal 43</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>44</td>
                        <td>Judul 44</td>
                        <td>Kategori 44</td>
                        <td>Tanggal 44</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>45</td>
                        <td>Judul 45</td>
                        <td>Kategori 45</td>
                        <td>Tanggal 45</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>46</td>
                        <td>Judul 46</td>
                        <td>Kategori 46</td>
                        <td>Tanggal 46</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>47</td>
                        <td>Judul 47</td>
                        <td>Kategori 47</td>
                        <td>Tanggal 47</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>48</td>
                        <td>Judul 48</td>
                        <td>Kategori 48</td>
                        <td>Tanggal 48</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>49</td>
                        <td>Judul 49</td>
                        <td>Kategori 49</td>
                        <td>Tanggal 49</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td>50</td>
                        <td>Judul 50</td>
                        <td>Kategori 50</td>
                        <td>Tanggal 50</td>
                        <td>
                          <a href="/EditBlog">
                            <i className="fas fa-edit me-2"></i>
                          </a>
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
