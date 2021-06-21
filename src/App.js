

import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import "./style.css"
import Home from "./components/Home/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import Center from "./components/profile/othersProfile/Center";
import ChatManager from "./components/chat/ChatManager"

function App() {
  return (
    <Router>
      
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/:name/profile" component={Profile} />
      <Route exact path="/user/:userId/profile" component={Center} />
      <Route exact path="/user/message/:userId" component={ChatManager} />

      </Switch>
      
      
    </Router>
  );
}

export default App;
