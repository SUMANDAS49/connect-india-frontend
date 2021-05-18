

import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import "./style.css"
import Home from "./components/Home/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/login" component={Login} />
      
    </Router>
  );
}

export default App;
