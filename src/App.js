import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import Courses from "./components/courses/Courses";

function App() {
  return (
    <>
      <Route exact path='/' component={Home}/>
      <Route exact path='/courses' component={Courses}/>
      </>
  );
}

export default App;
