import React from "react"
import "./Chat/Sidebar.css"
import firebase from "./firebase"
import { v4 as uuidv4 } from 'uuid';
export default class DefaultRoom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            roomname:""
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(cred=>{
          if(cred){
            this.setState({user:cred})
            firebase.firestore().collection("Users").doc(cred.email).collection("Threads").get().then(snap=>{
              if(snap.docs.length>0){
                console.log(snap.docs.map(doc=>{
                  this.props.history.push("/dms/"+doc.data().roomid)
                }))

              }
            })
            
          }
        })
      }

       createRoom=(roomname)=>{
        const { v4: uuidv4 } = require('uuid');
    
       var result=uuidv4()
       if(roomname.length>4){
        firebase.firestore().collection("Users").doc(this.state.user.email).collection("Threads").doc(result).set({
            roomname:roomname,
            roomid:result
          }).then(()=>{
            firebase.firestore().collection("Threads").doc(result).set({
                roomname:roomname,
                roomid:result
              })
          }).then(()=>{
              this.props.history.push("/dms/"+result)
          })
         
       }
       else{
           alert("Room Name has to be at least 4 characters.")
       }
       
      }
    render(){
        return(
            <div className="directmessaging">
                <br/>
                <center><h1 style={{fontSize:50,color:"#F37335"}}>Welcome to Direct Messaging in Social Crown!</h1></center>
                <br/>
                <br/>
                <center><h1>Follow these 3 steps:</h1></center>
                <br/>
                <br/>
                <center><h1>Enter your desired roomname below:</h1></center>
                <br/>
                <br/>
               <center> <input  roomname={this.state.roomname}onChange={(e)=>{this.setState({roomname:e.target.value})}} style={{width:"30%",height:"5vh",fontSize:20,outline:"none"}} placeholder="Create room" /></center>
               <br/>
               <br/>

                <center><h1>Click 'Add new Chat!'</h1></center>
                <br/>
                <br/>
                <center><div  onClick={()=>{this.createRoom(this.state.roomname)}} style={{width:"10%",color:"#E2E2E2",}} className="sidebarChat">
      <h2 style={{color:"darkgoldenrod"}}>Add new Chat!</h2>
    </div></center>
    <br/>
    <br/>
    <center><h1>You're good to go!</h1></center>
                </div>
                
        )
    }
}