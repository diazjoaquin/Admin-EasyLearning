import { Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
      <Route exact path='/' component={Home}/>
  );
}

export default App;
