import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import {
  Home,
  Posts,
  Categories,
  Comments,
  AddBlog,
  AddCategories,
  EditBlog,
  EditCategories,
  Register,
  Login,
  Profile,
} from "./components/pages";
import "./assets/css/Main.css";
function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/Home" exact>
            <Home />
          </Route>
          <Route path="/Post" exact>
            <Posts />
          </Route>
          <Route path="/Category" exact>
            <Categories />
          </Route>
          <Route path="/Comment" exact>
            <Comments />
          </Route>
          <Route path="/AddCategory" exact>
            <AddCategories />
          </Route>
          <Route path="/AddPost" exact>
            <AddBlog />
          </Route>
          <Route path="/EditPost/:postID" exact component={EditBlog} />
          <Route path="/EditCategory/:id" exact>
            <EditCategories />
          </Route>
          <Route path="/Profile" exact>
            <Profile />
          </Route>
          <Route path="/Register" exact>
            <Register />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
