import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import Courses from "./components/courses/Courses";
import Users from "./components/users/Users";
import NavBar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Courses} />
      <Route exact path="/users" component={Users} />
    </>
  );
}

export default App;
