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
      <div id="navbar1">
        <img
        onClick={()=>{this.props.history.push("/")}}
          style={{ width: "9%", height: "20vh", cursor: "pointer" }}
          src={logo2}
          alt="logo"
         
        />
           <a href="/login">
         <p
          
         >
        
           Login
        
         </p>
         </a>
         <a href="/signup">
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