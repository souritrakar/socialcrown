
import React from "react";
import "./WelcomePage.css";
import Particles from 'react-particles-js';
import Navbar from "./Navbar";

import Lottie from "react-lottie";
import animationData from "./images/social-media.json" //"../images/doctor-and-patient.json";
import animationData2 from "./images/shoutout.json"

export default class Home extends React.Component {


  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const defaultOptions2 = {
      loop: true,
      autoplay: true,
      animationData: animationData2,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const particlesOptions = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color:{
          value:"#485461"
       
        },
        size:{
          value:5
        }
      }
    };
    return (
      
      <div id="everythinghome">
        <div>
<Particles className="particles" params={particlesOptions} /></div>

        <div id="banner" style={{ marginTop: "1%" }}>
          <div id="banner-text">
            <h2 style={{fontFamily:"Raleway, sans-serif"}} >Social Crown</h2>
            <br/>
            <p style={{ fontSize: 30, fontWeight: 300 }}>

            It all starts with the first post.
              </p>
          </div>
          <Lottie options={defaultOptions2} height="95%" width="50%" />
      
        </div>
  
       
        <div id="banner2" style={{ marginTop: "1%" }}>
          <Lottie options={defaultOptions} height="100%" width="100%"  style={{marginRight:"4%"}}/>
          <div id="banner-text" style={{ marginLeft: "10%" }}>
            <h1 style={{ fontSize: 40, marginTop: "4%",fontFamily:"Raleway, sans-serif" }}>
              Share your stories and feelings to the rest of the world.
            </h1>
            <br></br>
            <br/>
            
            <div
              className="button_cont"
              align="center"
              style={{ marginTop: 30 }}
            >
              <a
                className="example_e"
                href="/socialcrown/signup"
                target="_blank"
                rel="nofollow noopener"
              >
                <strong style={{fontFamily:"Raleway, sans-serif"}}>GET STARTED</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
 
    );
  }
}
