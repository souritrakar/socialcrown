import React from "react"
import firebase from "./firebase"
import TextField from '@material-ui/core/TextField';
import animationData from "./images/login.json"
import Lottie from "react-lottie"
import { FcGoogle } from "react-icons/fc";
export default class LogIn extends React.Component{
constructor(props){
    super(props)
    this.state={
      email:"",
      password:"",
      username:""
    }
    
}

login=(email,password)=>{
if(this.state.username.length<20){
  firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
    this.props.history.push("/socialcrown/#/home")
    

  }).catch(err=>{
    alert(err)
  })
}

 
}

    
    componentDidMount(){
      document.title="Login"
    }
    onSubmit=()=>{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
.signInWithPopup(provider)
.then((result) => {
   
  var credential = result.credential;

  var token = credential.accessToken;
  // The signed-in user info.
  var user = result.user;

  this.props.history.push("/socialcrown/#/home")
  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(errorMessage,email)
  // ...
});
  }
    render(){
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
        return(
          <div id="form">
          {!this.state.hasSubmitted && (
            <form
              id="form-body"
              onSubmit={()=>{this.login(this.state.email,this.state.password)}}
             
            >
              
  
              <h1 style={{fontSize:60,color:"#65C7F7"}}>LOGIN</h1>
              <br/>
              <br/>
              <br/>
              <br/>
          
  
              <h2>Email</h2>
              <br/>
              <TextField
                style={{ width: "50%" }}
                type="email"
                label="Email"
                name="email"
                required
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <br />
              <h2>Password</h2>
              <br/>
              <TextField
                style={{ width: "50%" }}
                type="password"
                label="Password"
                name="password"
                required
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <br />
  
      
              <br />
             
  
              <div
                className="button_cont"
                align="center"
                style={{ marginTop: 30 }}
                onClick={()=>{this.login(this.state.email,this.state.password)}}
              >
                <a
                  className="example_e"
                  
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <strong style={{fontFamily:"Raleway, sans-serif"}}>LOGIN</strong>
                </a>
              </div>
                  
            <div style={{display:"flex",flexDirection:"row",marginRight:"9%"}} className="googlesignup">
              <FcGoogle size={50} style={{marginRight:"5%",marginTop:"20%"}}/> 
              
              <div
              style={{marginBottom:"5%"}}
              className="button_cont"
              align="center"
              style={{ marginTop: 30,color:"red" }}
              onClick={()=>{this.onSubmit()}}
            >
              <a
                className="example_e"
                
                target="_blank"
                rel="nofollow noopener"
              >
                <strong style={{fontFamily:"Raleway, sans-serif"}}>GOOGLE LOGIN</strong>
              </a>
            </div>
            </div>
            </form>
          )}
  
          {this.state.hasSubmitted && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "10%",
              }}
            >
              <h2 style={{ margin: "2%" }}>
                Hey, {this.state.name}, please enter the <br /> code sent to your
                email to verify your account. Please also check the spam folder.
              </h2>
              <TextField
                placeholder="Enter verification code"
                variant="outlined"
               
              />
  
              <div class="buttontest">
                <div class="container">
                  <button
                   
                    class="btn effect01"
                    type="submit"
                  >
                    <span style={{ color: "black" }}>SIGN UP</span>
                  </button>
                </div>
              </div>
            </div>
          )}
  
  <Lottie options={defaultOptions} height="50%" width="50%"  style={{marginRight:"4%"}}/>
        </div>
        )
    }
}