import React from "react"

import firebase from "firebase"

import logo2 from "../images/socialcrown.png"

import {Button} from 'react-bootstrap';

import WhatsAppIcon from '@material-ui/icons/WhatsApp';

export default class VideoRoom extends React.Component{

    constructor(props){
        super(props)
        
        this.state={
            videoname:"",
            videoid:""
        }
    }


    componentDidMount(){
        firebase.auth().onAuthStateChanged(cred=>{
            if(cred){
                firebase.firestore().collection("Threads").doc(this.props.match.params.videoid).get().then(doc=>{
                    if(!doc.exists){
                        alert("The DM does not exist!")
                        this.props.history.push("/dms")
                    }
                    else{
                        this.setState({videoid:doc.data().roomid,videoname:doc.data().roomname})
                    }

                })
            }
            else{
                this.props.history.push("/login")
            }
        })
        
    }



    render(){
        var mymessage= "Come video chat with me in Social Crown Video Chat! Join my room here: "+window.location.href
        var message= mymessage.split(' ').join("%20")
        var link="https://api.whatsapp.com/send?text="+message

        var videoid= this.props.match.params.videoid
        return(
            <div className="videoroom">
                <br/>
                <center><h1 style={{color:"#203A43",fontSize:40}}>Video Call</h1></center>
                <br/>
                <br/>
                <center><h1 style={{color:"#4b134f"}}>Direct Message : {this.state.videoname}</h1></center>
                <br/>
                <br/>

                <center><iframe src={"https://tokbox.com/embed/embed/ot-embed.js?embedId=19d4f9d9-107f-48ee-890d-8090918a0712&room="+videoid+"&iframe=true"} width="70%" height={window.innerHeight/1.2} scrolling="auto" allow="microphone; camera" ></iframe></center>
                <br/>
                <br/>
                <center> <h1>Share this room with other people!</h1></center>
                
                <br/>

     <center> <a target="_blank" style={{textDecoration:"none"}} href={link}> 
      <Button className="btn1-primary" style={{backgroundColor:"lightgreen"}} variant="outline-success">
      
   <center><WhatsAppIcon style={{marginTop:"2%"}}/></center> 
   <center><h2>WhatsApp</h2></center>
        
        
        </Button>
        </a>
    
        </center>
        <br/>
        <br/>
            </div>
        )
    }
}