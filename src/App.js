import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Home,
  Posts,
  Categories,
  Comments,
  AddBlog,
  AddCategories,
} from "./components/pages";
import "./assets/css/Main.css";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Posts" component={Posts} exact />
          <Route path="/Categories" component={Categories} exact />
          <Route path="/Comments" component={Comments} exact />
          <Route path="/AddCategories" component={AddCategories} exact />
          <Route path="/AddBlog" component={AddBlog} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
