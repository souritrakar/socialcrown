import React, { Component } from 'react';
import Navbar from './Navbar';
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom';
import {NavLink} from "react-router-dom"
import {withRouter} from "react-router-dom" 
import Home from './Home';
import "./Navbar.css"
//import About from './About';
//import Contact from './Contact';
//import HowItWorks from './HowItWorks';
//import Services from './Services';
//import WhoWeCouldWorkWith from './WhoWeCouldWorkWith';
import HomeIcon from '@material-ui/icons/Home';
import SignUp from "./SignUp"
import LogIn from "./LogIn"
import LandingPage from './LandingPage';
import ChatScreen from './Chat/ChatScreen';
import DefaultRoom from './DefaultRoom';
import VideoRoom from './Chat/VideoRoom';
import PostScreen from './components/PostScreen';


const Main = withRouter(({location})=>{
  return(
    <div className="App">
      {
        location.pathname!== "/login" && location.pathname!=="/signup" && location.pathname!=="/home" && !location.pathname.indexOf("/socialcrown/dms/") == 0 && location.pathname!=="/socialcrown/dms" && !location.pathname.indexOf("/video/") == 0 && !location.pathname.indexOf("/posts/")== 0 && <Navbar/> 
      }
       <Switch>
          <Route exact path="/" component={Home}/>
          <Route  exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={LogIn}/>
          <Route exact path="/home" component={LandingPage}/>
          <Route exact path="/dms/:roomid" component={ChatScreen}/>
          <Route exact path="/dms/" component={DefaultRoom}/>
          <Route exact path="/video/:videoid" component={VideoRoom}/>
          <Route exact path="/posts/:postid" component={PostScreen}/>
          <Route component={NotFound} />
   
        </Switch>
    </div>
  )
})
const NotFound=()=>{
  return(
    <div>
    <center><h1 style={{marginTop:"3%"}}>404 Not Found</h1></center>
    <br/>
    <br/>
    <br/>
    <center><h1><a  href="/socialcrown" style={{marginTop:"5%",width:"50vh",color:"burlywood"}}>Back to home page</a></h1></center>
    </div>
  )
}
class App extends Component {

  componentDidMount(){
    document.title="Social Crown"
  }
  render() {
    return (
   
      <HashRouter basename="/">
     <Main/>
     </HashRouter>
  
    );
  }
}
export default App;
