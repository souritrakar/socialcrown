import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from '@material-ui/icons/Send';
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import firebase from "../firebase"
import { ChatFeed, Message } from 'react-chat-ui'
import animationData from "../images/loading.json"
import Lottie from "react-lottie"
import { animateScroll } from "react-scroll";
import {Spinner} from "react-bootstrap"
function Chat(props) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const[loaded,setLoaded] = useState(false)


  const addMessage=(message)=>{
    if(props.user ){
      if(message.length>0){
        var messageadd= new Message({id:1,message:message,senderName:props.user.displayName})
        console.log(typeof messageadd)
        firebase.firestore().collection("Threads").doc(props.roomid).collection("Messages").add({
          message:messageadd.message,
          senderName:messageadd.senderName,
          id:messageadd.id,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
    
        }).then(()=>{
          setInput("")
        })
      }
      else{
        alert("Message has to be atleast one character long.")
      }
    
     
    }
    else{
      alert("Error.")
    }


  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
React.useEffect(()=>{
  firebase.firestore().collection("Threads").doc(props.roomid).get().then((doc)=>{
    if(doc.exists){
      firebase.firestore().collection("Users").doc(props.user.displayName).get().then(()=>{
        if(!doc.exists){
          firebase.firestore().collection("Users").doc(props.user.email).collection("Threads").doc(props.roomid).set({
            roomid:props.roomid
          })
        }
      })
      setRoomName(doc.data().roomname)
      firebase.firestore().collection("Threads").doc(props.roomid).collection("Messages").orderBy("timestamp","asc").onSnapshot(snapshot=>{
        const messagearray=[]
        snapshot.forEach(doc=>{
          messagearray.push(doc.data())
        })
        setMessages(messagearray)
        setLoaded(true)
       
      })
    }
    else{
      alert("That room does not exist!")
      window.location.href="/socialcrown/login"
    }
  })
},[props.roomid])
  
const scrollToBottom= () => {
  animateScroll.scrollToBottom({
    containerId: "chat__body",
    
  });
}

 if(loaded!==true){
  return (
    <Spinner animation="border" />
  );
 } 
 else{
   return(
    <div className="chat">
     
    <div className="chat__header">
      <Avatar />

      <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        <p>
          last seen{" "}
         
        </p>
      </div>

      <div className="chat__headerRight">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>

    <div className="chat__body">

  {/* <ChatFeed
  
    messages={messages} // Array: list of message objects
    showSenderName={true} 
    bubblesCentered={false}
    bubbleStyles={
      {
        text: {
          fontSize: 15,
          color:"black"
        },
        chatbubble: {
          borderRadius: 90,
          padding: 30,
      
         
        }
      }
    }
  /> */}
 {messages.map((message) => (
        <p
          className={`chat__message ${
            message.senderName === props.user.displayName && "chat__reciever"
          }`}
        >
          <span className="chat__name">{message.senderName}</span>
          {message.message}
          <span style={{fontSize:12  }} className="chat__timestamp">
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>
      ))}
    </div>
  
    <div className="chat__footer">
      <InsertEmoticonIcon />
      <form  onSubmit={(e)=>{addMessage(e.target.value)}}>
        <input
        
          placeholder="Type a message"
          type="text"
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}

        />
        <SendIcon onClick={()=>{addMessage(input)}}/>         
      </form>

    </div>
  </div>
   )
 }
}

export default Chat;
