import React, { useEffect, useState } from "react";
import { Avatar, IconButton, useRadioGroup } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import "./Sidebar.css";
import firebase from "../firebase"
import SidebarChat from "./Chat"
import { v4 as uuidv4 } from 'uuid';
function Sidebar({user}) {
  const [rooms, setRooms] = useState([]);
    const[pfp,setPfp]=useState("")
 const [roomname,setRoomName]=useState("")
React.useEffect(()=>{
    setPfp(user.photoURL)
    firebase.firestore().collection("Users").doc(user.email).collection("Threads").onSnapshot(snapshot=>{
      const roomsarray=[]
      snapshot.forEach(doc=>{
        roomsarray.push(doc.data())
      })
      setRooms(roomsarray)
    })
},[user])

  const createRoom=(roomname)=>{
    const { v4: uuidv4 } = require('uuid');

   var result=uuidv4()
    firebase.firestore().collection("Users").doc(user.email).collection("Threads").doc(result).set({
      roomname:roomname,
      roomid:result
    })
    firebase.firestore().collection("Threads").doc(result).set({
      roomname:roomname,
      roomid:result
    })
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={pfp}/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      

      <div className="sidebar__chats">
        {
          rooms &&
          rooms.map(room=>{
            return(
              <SidebarChat id={room.roomid} name={room.roomname} />
            )
          })
        }
       
    

      </div>
      <input placeholder="create room" onChange={(e)=>{setRoomName(e.target.value)}}/>
      <div  onClick={()=>{createRoom(roomname)}}className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
    </div>
  );
}

export default Sidebar;