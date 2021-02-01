import React from "react"
import firebase from "./firebase"
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { IoSend } from "react-icons/io5";
import credentials from "./images/credentials.svg"
import { FcGoogle } from "react-icons/fc";
import "./WelcomePage.css"
import "./Form.css"
export default class SignUp extends React.Component{
constructor(props){
    super(props)
    this.state={
      email:"",
      password:"",
      username:""
    }
    
}

signUp=(email,password)=>{

  firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
    this.props.history.push("/socialcrown/login")
    firebase.firestore().collection("Users").doc(email).set({
      username:this.state.username,
      password:password,
      email:this.state.email
    })
    

  }).catch(err=>{
    alert(err)
  })


 
}
    onSubmit=()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
     
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("signed in", user.displayName)
    this.props.history.push("/socialcrown/home")
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
    componentDidMount(){
      document.title="Sign Up"
    }
    render(){
        return(
          <div id="form">
        {!this.state.hasSubmitted && (
          <form
            id="form-body"
            onSubmit={(e) => {
              this.secondSignUp(e);
            }}
          >
            

            <h1 style={{fontSize:60,color:"#65C7F7"}}>SIGN UP</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2 >Name</h2>
            <br/>
            <TextField
              style={{ width: "50%" }}
              
              label="Name"
              name="name"
              onChange={(e) => this.setState({ username: e.target.value })}
              required
            />
            <br />

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
           

            <div
              className="button_cont"
              align="center"
              style={{ marginTop: 30 }}
              onClick={()=>{this.signUp(this.state.email,this.state.password)}}
            >
              <a
                className="example_e"
                
                target="_blank"
                rel="nofollow noopener"
              >
                <strong style={{fontFamily:"Raleway, sans-serif"}}>SIGN UP</strong>
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

        <img style={{width:"50%",height:"50vh"}} id="svg1" src={credentials} alt="svg1" />
      </div>
        )
    }
}
