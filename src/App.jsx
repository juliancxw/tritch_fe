import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import LandingPage from "./components/pages/landing_page.jsx";
import SignUp from "./components/pages/register.jsx";
import SignIn from "./components/pages/login.jsx";
import Itinerary from "./components/pages/itinerary.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={LandingPage} />
          <Route path="/itinerary/view/:id" component={Itinerary} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
