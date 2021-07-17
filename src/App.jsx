import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Components/navbar.jsx";
import LandingPage from "./Components/pages/landing_page.jsx";
import SignUp from "./Components/pages/register.jsx";
import SignIn from "./Components/pages/login.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={LandingPage} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
