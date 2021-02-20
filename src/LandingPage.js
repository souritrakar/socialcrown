import React from "react"
import { Redirect } from "react-router-dom"
import {Avatar} from "@material-ui/core"
import firebase from "./firebase"
import Header from "./components/Header"
import PostUploader from "./components/PostUploader"
import * as AiIcons from 'react-icons/ai';
import Modal from "react-modal"
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Post from "./components/Post"
import { IconButton,Button } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import logo2 from "./images/socialcrown.png"
import animationData from "./images/loading.json"
import Lottie from "react-lottie"


export default class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            email:"",
            password:"",
            photo:"",
            posts:[],
            modalOpen:false,
            hasLoaded:false,
            anchorEl:null
        }
    }
    componentDidMount(){

        
       firebase.auth().onAuthStateChanged(cred=>{
          if(cred){
              firebase.firestore().collection("Users").doc(cred.email).get().then(doc=>{
                  if(doc.exists){
                    this.setState({photo:cred.photoURL, email:doc.data().email,username:doc.data().username})
                    cred.updateProfile({
                        displayName:doc.data().username
                    })
                    document.title=`Home (${doc.data().username})`
                  }
                  else{
                      this.setState({photo:cred.photoURL,email:cred.email,username:cred.displayName})
                      document.title=`Home (${cred.displayName})`
                  }
              })
            
              document.title=`Home (${this.state.username})`
              return firebase.firestore().collection("Posts").orderBy("timestamp","desc").onSnapshot(snapshot=>{
              
                this.setState({posts:snapshot.docs.map(doc=>  ({
                    id:doc.id,
                    post:doc.data()
                  }))})
                  this.setState({hasLoaded:true})
              })
          }
          else{{
              alert("Error while signing in.")
              this.props.history.push("/socialcrown/signup")
          }}
       })
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
              <div>
 
            <Header photo={this.state.photo} />

        { this.state.username ? <center><h1 style={{fontFamily: 'Raleway, sans-serif',marginTop:"1.6%",fontSize:40}}>Whats on your mind, {this.state.username} ?</h1></center>: <center>  <Lottie options={defaultOptions} height="90%" width="40%" /></center>}
            <br/>
        <br/>

            {
         this.state.username ?
        <center> <Button
                variant="contained"
                color="secondary"
            style={{marginRight:"1%"}}
            onClick={()=>{this.setState({modalOpen:true})}}
                startIcon={<PhotoCameraIcon />}
            >
                POST
            </Button>
            <br/>
            <br/>
           <h2>* Note : Document reads from database has a daily quota, so if you cannot see posts, its probably the end of the quota. </h2> 
            </center> : <h1></h1>
            
            }


                <br/>
                <br/>
                <br/>
     
                <Modal isOpen={this.state.modalOpen} onRequestClose={()=>{this.setState({modalOpen:false})}} >
                <center><h1>Post a picture or a video to describe your current mood.</h1></center>
                <br/>
                <br/>
                <PostUploader pfp={this.state.photo}username={this.state.username} closeModal={()=>{this.setState({modalOpen:false})}} />
                    <center>
                    <Button
                    onClick={()=>{this.setState({modalOpen:false})}}
                    variant="contained"
                    color="default"
                    style={{marginTop:"3%"}}
                    startIcon={<AiIcons.AiFillCloseCircle />}
                >
                    
                </Button>
             
               
                 </center>
                 <br/>
                 <br/>
                 
                <center> <img
        onClick={()=>{this.props.history.push("/socialcrown")}}
          style={{ width: "12%", height: "30%", cursor: "pointer" }}
          src={logo2}
          alt="logo"
         
        /></center>



                </Modal>
    <div className="feed">

            {
            
            this.state.posts.map(({post,id})=>{
            
                if(id!==null){
                    if(post.imageurl){
                        console.log("image")
                        return(
                            <center>
                            <Post  
                            
                            photo={post.pfp} isauthenticated={true} currentemail={this.state.email} currentuser={this.state.username}  likes={post.likes} postId={id} username={post.username} caption={post.caption} photoURL={post.imageurl}/>
                            </center>
                        )
                    }
                    else if (post.videourl){
                        console.log("video")
                        return(
                        
                            <center>
                            <Post  
                            
                            photo={post.pfp} isauthenticated={true}  currentemail={this.state.email} currentuser={this.state.username} video={post.videourl} likes={post.likes} postId={id} username={post.username} caption={post.caption}/>
                            </center>
                        )
                    }
                    
                }
                
            })
            }

    </div>
        </div>
)
    }
}
