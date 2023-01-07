import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import TrafficByDevice from "./components/Statistics/Statistics";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/statistics" component={TrafficByDevice} />
    </>
  );
}

export default App;
