import React from "react"

import Post from "./Post"

import firebase from "../firebase"


export default class PostScreen extends React.Component{

    constructor(props){
        super()
        
        this.state={
            caption:"",
            username:"",
            videourl:"",
            imageurl:"",
            likes:"",
            comments:"",
            postid:"",
            hasLiked:null,
            isauthenticated:null,
            pfp:"",
            email:"",
            displayName:""
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(cred=>{
        
                firebase.firestore().collection("Posts").doc(this.props.match.params.postid).get().then((doc)=>{
                    if(doc.exists && cred){
                        console.log(cred)
                        this.setState({postid:doc.data().postid,username:doc.data().username,caption:doc.data().caption,likes:doc.data().likes,isauthenticated:true,pfp:doc.data().pfp,email:cred.email,displayName:cred.displayName})
                      if(doc.data().likedusers.includes(cred.email)){
                          this.setState({hasLiked:true})
                      }
                      else{
                        this.setState({hasLiked:false})

                      }
                        if(doc.data().imageurl){
                            this.setState({imageurl:doc.data().imageurl})
                        }
                        else if(doc.data().videourl){
                            this.setState({videourl:doc.data().videourl})
    
                        }
                        else{
                            return null
                        }
                        alert(this.state.isauthenticated)
                    }
                    else if(!doc.exists){
                        alert("Post not fond")
                        this.props.history.push("/socialcrown/home")
                    }
                    else if(doc.exists && cred===null){

                        
                        this.setState({postid:doc.data().postid,username:doc.data().username,caption:doc.data().caption,likes:doc.data().likes,isauthenticated:false})
                        if(doc.data().imageurl){
                            this.setState({imageurl:doc.data().imageurl})
                        }
                        else if(doc.data().videourl){
                            this.setState({videourl:doc.data().videourl})
    
                        }
                        else{
                            return null
                        }
                    }
            })
            
          
        })
            
    }




    render(){
        return(
            <div>
                <center><h1>Post by {this.state.username}</h1></center>
                
                <br/>
                <br/>

                {
                    this.state.videourl &&
                    (
                       <center><Post  
                            
                        photo={this.state.pfp} isauthenticated={this.state.isauthenticated}  currentemail={this.state.email} currentuser={this.state.username} video={this.state.videourl} likes={this.state.likes} postId={this.props.match.params.postid} username={this.state.username} caption={this.state.caption}/></center> 
                    )
                }

                {
                    this.state.imageurl &&
                    (
                        <center> <Post  
                            
                            photo={this.state.pfp} currentemail={this.state.email} currentuser={this.state.username} isauthenticated={this.state.isauthenticated}  likes={this.state.likes} postId={this.props.match.params.postid} username={this.state.username} caption={this.state.caption} photoURL={this.state.imageurl}/></center>
                    )
                }


          

            </div>
        )
    }
}