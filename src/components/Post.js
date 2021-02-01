import React from "react"
import "../Post.css"
import {Avatar,Button} from "@material-ui/core"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import firebase from "../firebase"
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
export default function Post(props){

const [likes,setLikes]= React.useState(0)
const [hasLiked,sethasLiked]= React.useState(false)
const [comments,setComments]=React.useState([])

const[commentText,setCommentText]=React.useState()
React.useEffect(()=>{

  if(props.postId){


 firebase.firestore().collection("Posts").doc(props.postId).collection("Comments").onSnapshot(snapshot=>{
setComments(snapshot.docs.map(doc=>doc.data()))
if(props.postId){


  firebase.firestore().collection("Posts").doc(props.postId).get().then(doc=>{
    var data=doc.data()
    setLikes(data.likes)
  if(data.likedusers.includes(props.currentuser)){
    sethasLiked(true)
  }
  else{
    sethasLiked(false)
  }
  })
}

   
  })
}
else{
  alert("error")
}
},[props.postId,props.currentuser])

const commentPost=()=>{
  if(props.postId){
     
  firebase.firestore().collection("Posts").doc(props.postId).collection("Comments").add({

    comment:commentText,
    commenter:props.currentuser,
  
  })
}
else{
  alert("errrrr")
}


}
const deletePost=()=>{
  if(props.postId){
     var confirm= window.confirm("This will delete your post. Are you sure?")
     if(confirm){
       firebase.firestore().collection("Posts").doc(props.postId).delete().then(()=>{alert("Post deleted.")})
   
     }
  }
  else{
    alert("Error.")
  }
}
  return(
    
    <div className="post">
      
        <div className="post_header"> 
     
        <Avatar  style={{marginTop:"1.7%"}}
        className="post_avatar"
        alt='AmolChillarge'
        src={props.photo} />
            <h3 style={{marginTop:"1.7%"}}>{props.username}</h3>
            {
        props.currentuser===props.username &&
        (
          <Button
          variant="contained"
          color="black"
      style={{marginLeft:"5%",marginTop:"2%"}}
      onClick={deletePost}
          startIcon={<DeleteIcon />}
      >
          DELETE
      </Button>
        )
        
      }
            </div>

            <br/>
            <hr style={{borderColor:"black"}}/>
     
       
            {/*hedear --> avatar +username */}
            {
              props.video &&
              (
              <video className="post_video" width={window.innerWidth/5} height={window.innerHeight/2} controls>
              <source src={props.video} type="video/mp4"/>

             
              Your browser does not support the video tag.
            </video>
              )
            }


              {
              props.photoURL &&
              (
              <img className="post_image" src={props.photoURL} alt="f"/>
              )
            }
           
    
    

{
   hasLiked===false &&
    (
 
      <AiIcons.AiOutlineHeart size={30} onClick={()=>{
  
     firebase.firestore().collection("Posts").doc(props.postId).update({
       likes:firebase.firestore.FieldValue.increment(1),
       likedusers:firebase.firestore.FieldValue.arrayUnion(props.currentuser)
     })
    
    sethasLiked(true)
    
    }}/>

  )
}
{
  hasLiked &&
  (

      <AiIcons.AiFillHeart  size={30} onClick={()=>{
     
      if(props.postId){
      
       firebase.firestore().collection("Posts").doc(props.postId).get().then(doc=>{
         var data=doc.data()
         if(data.likes>0 || data.likes==0){
           
          firebase.firestore().collection("Posts").doc(props.postId).update({
            likes:firebase.firestore.FieldValue.increment(-1),
            likedusers:firebase.firestore.FieldValue.arrayRemove(props.currentuser)
          })
          sethasLiked(false)
         }
         else{
           firebase.firestore().collection("Posts").doc(props.postId).update({
             likes:0,
           
           })
         }
       
       })
       
      }
      else{
        return null
      }
    
    }} />

  )
}

{ likes<1 || likes>1 ? <h2>{props.likes} likes </h2> :<h2>{props.likes} like</h2>}


            <h4 className="post_text"><strong>{props.username} :</strong>  {props.caption} </h4>
           <hr />
           <br/>
           <div style={{display:"flex",flexDirection:"row"}} className="commentsdiv">
           <TextField onChange={(e)=>{setCommentText(e.target.value)}} placeholder={`Add a comment, ${props.currentuser}`} style={{width:"100%",marginLeft:"1%"}} id="standard-basic"  />
           <Button onClick={commentPost} style={{marginRight:"1%"}}  disabled={!commentText}>
             COMMENT
             </Button>
           </div>
           
           {
             comments &&
             comments.map((comment)=>{
               return(
                 <div style={{padding:20,display:"flex",justifyContent:"flex-start"}} className="comments">
                <p> 
                        <strong>{comment.commenter} : </strong> {comment.comment}
                        </p>
                        </div>
               )
             })
           }
          
    
          
          
            
        </div>
  )
}