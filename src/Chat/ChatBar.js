import React, { useEffect, useState } from "react";

import { Avatar, IconButton, useRadioGroup } from "@material-ui/core";

import DonutLargeIcon from "@material-ui/icons/DonutLarge";

import ChatIcon from "@material-ui/icons/Chat";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import AddIcon from '@material-ui/icons/Add';

import { SearchOutlined } from "@material-ui/icons";

import {Button as BootStrapBtn} from 'react-bootstrap';

import Modal from "react-modal"

import {Spinner} from "react-bootstrap"


import * as AiIcons from 'react-icons/ai';

import TextField from "@material-ui/core/TextField"

import "./Sidebar.css";
import firebase from "../firebase"

import SidebarChat from "./Chat"

import { v4 as uuidv4 } from 'uuid';

import {Button } from '@material-ui/core';

import logo2 from "../images/socialcrown.png"

function Sidebar({user}) {
  const [rooms, setRooms] = useState([]);
    const[pfp,setPfp]=useState("")
 const [roomname,setRoomName]=useState("")
 const [modalOpen,setModalOpen]= useState(false)
 const [loaded,setLoaded] = useState(false)


    React.useEffect(()=>{
        setPfp(user.photoURL)
        firebase.firestore().collection("Users").doc(user.email).collection("Threads").onSnapshot(snapshot=>{
          const roomsarray=[]
          snapshot.forEach(doc=>{
            roomsarray.push(doc.data())
          })
          setRooms(roomsarray)
          setLoaded(true)
        })
    },[user])




  const createRoom=(roomname)=>{
    const { v4: uuidv4 } = require('uuid');

   var result=uuidv4()
   if(roomname.length>4){
    firebase.firestore().collection("Users").doc(user.email).collection("Threads").doc(result).set({
      roomname:roomname,
      roomid:result
    })
    firebase.firestore().collection("Threads").doc(result).set({
      roomname:roomname,
      roomid:result
    }).then(()=>{
      setModalOpen(false)
      setRoomName("")

    })
   }
   else{
    alert("Room Name has to be at least 5 characters.")
   }
    
  }

 if(loaded===true){
  return (
    <div className="sidebar">
      <Modal closeTimeoutMS={500} isOpen={modalOpen} onRequestClose={()=>{setModalOpen(false)}} >
      <center><h1>Give an awesome name to your awesome chat room.</h1></center>
      <br/>
      <br/>
      <center> <TextField variant="outlined" value={roomname} onChange={(e)=>{setRoomName(e.target.value)}} style={{width:"30%",height:"5vh",fontSize:20,outline:"none"}} placeholder="Your awesome room name" /></center>
      <br/>
      <br/>
          <center><BootStrapBtn variant="success" onClick={()=>{createRoom(roomname)}} >
            Add new Chat!
            </BootStrapBtn></center>
        <center>
        <Button
        onClick={()=>{setModalOpen(false)}}
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
     <br/>
     <br/>




    </Modal>
<div className="sidebar__header">
<Avatar src={pfp}/>
<h1>{user.displayName}</h1>
<div className="sidebar__headerRight">
<IconButton  onClick={()=>{setModalOpen(true)}} style={{width:"45%"}}>
<AddIcon/>
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

</div>
);
 } 
 else{
   return(
    <Spinner animation="border" />
   )
 }
}

export default Sidebar;