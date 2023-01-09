import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import Courses from "./components/courses/Courses";
import Users from "./components/users/Users";
import NavBar from "./components/navbar/Navbar";
import TrafficByDevice from "./components/Statistics/Statistics";

function App() {
  return (
    <>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Courses} />
      <Route exact path="/users" component={Users} />
      <Route path="/statistics" component={TrafficByDevice} />
    </>
  );
}

export default App;
