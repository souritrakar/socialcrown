import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import firebase from "../firebase"
import { ChatFeed, Message } from 'react-chat-ui'

function Chat(props) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

React.useEffect(()=>{
  firebase.firestore().collection("Threads").doc(props.roomid).get().then((doc)=>{
    if(doc.exists){
      setRoomName(doc.data().roomname)
      firebase.firestore().collection("Threads").doc(props.roomid).collection("Messages").onSnapshot(snapshot=>{
        const messagearray=[]
        snapshot.forEach(doc=>{
          messagearray.push(doc.data())
        })
        setMessages(messagearray)
      })
    }
    else{
      alert("That room does not exist!")
      window.location.href="/socialcrown/login"
    }
  })
},[props.roomid])
  

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>{props.roomname}</h3>
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
    <h1>{props.roomid}</h1>
    <ChatFeed
      messages={messages} // Array: list of message objects

      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
  
      bubbleStyles={
        {
          text: {
            fontSize: 15
          },
          chatbubble: {
            borderRadius: 90,
            padding: 30,
        
           
          }
        }
      }
    />
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
          
            placeholder="Type a message"
            type="text"
          />
          <button  type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
