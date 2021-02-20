import React from "react"
import Sidebar from "./ChatBar"
import Room from "./Room"
import firebase from "../firebase"
import { ChatFeed, Message } from 'react-chat-ui'
export default class ChatScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:{}
            //...
          };
    }
    componentDidMount(){
      firebase.auth().onAuthStateChanged(cred=>{
        if(cred){
          this.setState({user:cred})
         
        }
      })
    }

    render(){
        return(
            <div style={{display:"flex",flexDirection:"row"}}>
              <Sidebar user={this.state.user}/>
              <Room  user={this.state.user} roomid={this.props.match.params.roomid}/>


            </div>
        )
    }
}