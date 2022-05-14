import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import {
  Home,
  Post,
  Category,
  Comment,
  AddPost,
  AddCategory,
  EditPost,
  EditCategory,
  Register,
  Login,
} from "./pages";
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
            <Post />
          </Route>
          <Route path="/Category" exact>
            <Category />
          </Route>
          <Route path="/Comment" exact>
            <Comment />
          </Route>
          <Route path="/AddCategory" exact>
            <AddCategory />
          </Route>
          <Route path="/AddPost" exact>
            <AddPost />
          </Route>
          <Route path="/EditPost/:postID" exact component={EditPost} />
          <Route path="/EditCategory/:id" exact>
            <EditCategory />
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
