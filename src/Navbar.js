import React from "react";
import logo2 from "./images/logocrown.png";
import {withRouter} from "react-router-dom"
import "./Navbar.css"
class Navbar extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div id="navbar">
        <img
        onClick={()=>{this.props.history.push("/socialcrown")}}
          style={{ width: "9%", height: "5%", cursor: "pointer" }}
          src={logo2}
          alt="logo"
         
        />
           <a href="/socialcrown/login">
         <p
          
         >
        
           Login
        
         </p>
         </a>
         <a href="/socialcrown/signup">
        <p
          
        >   
          Sign Up
         
        </p>
        </a>
        <a href="/socialcrown/contact">
        <p
          
        >
          Contact
        </p>
        </a>
       
       
       
      </div>
    );
  }
}

export default withRouter(Navbar);