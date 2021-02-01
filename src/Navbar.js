import React from "react";
import logo2 from "./images/socialcrown.png";
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
          style={{ width: "9%", height: "20vh", cursor: "pointer" }}
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
        <a target="_blank" href="mailto:souritra.kar@gmail.com">
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