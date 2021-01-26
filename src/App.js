import React, { Component } from 'react';
import Navbar from './Navbar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
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


const Main = withRouter(({location})=>{
  return(
    <div className="App">
      {
        location.pathname!== "/socialcrown/login" && location.pathname!=="/socialcrown/signup" && location.pathname!=="/socialcrown/home" && <Navbar/> 
      }
       <Switch>
          <Route exact path="/socialcrown" component={Home}/>
          <Route path="/socialcrown/signup" component={SignUp}/>
          <Route path="/socialcrown/login" component={LogIn}/>
          <Route path="/socialcrown/home" component={LandingPage}/>
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
   
      <BrowserRouter>
     <Main/>
      </BrowserRouter>
  
    );
  }
}
export default App;
