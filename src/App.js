import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import TrafficByDevice from "./components/Statistics/Statistics";
import Navbar from "./components/navbar/Navbar";
import Reviews from "./components/reviews/Reviews";

function App() {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/statistics" component={TrafficByDevice} />
      <Route path= "/reviews" component={Reviews} />

    </>
  );
}

export default App;
