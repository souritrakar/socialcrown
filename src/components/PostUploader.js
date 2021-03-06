import React from "react"
import { IconButton,Button } from '@material-ui/core';
import firebase from "firebase"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "../index.css"
import LinearProgress from '@material-ui/core/LinearProgress';

import { v4 as uuidv4 } from 'uuid';


export default function PostUploader(props){

    const [caption,setCaption]= React.useState("")
    const [file,setFile]= React.useState(null)
    const [progress,setProgress]=React.useState(0)
    const [fileType,setfileType]=React.useState(null)

const handleInput=(e)=>{
    if(e.target.files[0]){
    console.log(e.target.files[0])
    if(e.target.files[0].type.includes("video")){
        setFile(e.target.files[0])
        setfileType("video")
    }
       
    else if(e.target.files[0].type.includes("image")){
        setFile(e.target.files[0])
        setfileType("image")
    }
    else{
        alert("That file type is not supported!")
        setFile(null)
    }
       

    }
}
    const uploadFile=()=>{
        if(file!==null && caption.length>0){
            const task=firebase.storage().ref(`files/${file.name}`).put(file)

            task.on(
                "state_changed",
                (snapshot)=>{
                    const progress= Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                (error)=>{
                    alert(error.message)
                },
                ()=>{
                    firebase.storage()
                    .ref("files")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url=>{
                        // FCEF60466FAAB0EB12D42D940D11FB90E671
                        if(fileType==="image"){
                            var id=uuidv4()
                            firebase.firestore().collection("Posts").doc(id).set({
                                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                                username:props.username,
                                caption:caption,
                                imageurl:url,
                                postid:id,
                                pfp:props.pfp,
                                likes:0,
                                likedusers:[]
                            })
                        }
                        else if(fileType==="video"){
                            var id2=uuidv4()
                            firebase.firestore().collection("Posts").doc(id2).set({
                                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                                username:props.username,
                                caption:caption,
                                videourl:url,
                                postid:id2,
                                pfp:props.pfp,
                                likes:0,
                                likedusers:[]
                            })
                        }
                      
    
                      
                    }).catch(err=>{
                        alert(err)
    
                    }).then(()=>{
                       props.closeModal()
                    })
                    setProgress(0)
                    setFile(null)
                    setCaption("")
                   
                              
                }
            )
        }
        else{
            alert("Caption/File is missing or there is an error with the file type. Try again")
        }

    }    
    return(
        <div className="imageupload">
       
         <input type="text" placeholder="Enter a Caption" onChange={(e) =>setCaption(e.target.value)} value={caption} />
         <input type="file" accept="image/*,video/*" onChange={handleInput} />
         <LinearProgress color="secondary" variant="determinate" value={progress} />
         <br/>
         <Button
        variant="contained"
        color="default"
        onClick={uploadFile}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
    


     
 </div>
    )
}