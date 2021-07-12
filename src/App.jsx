import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Components/navbar.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Route path="/register" />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
