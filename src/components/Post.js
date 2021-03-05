import React from "react"
import "../Post.css"
import {Avatar,Button} from "@material-ui/core"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import firebase from "../firebase"
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ShowMoreText from 'react-show-more-text';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ReactVideo } from "reactjs-media";

export default function Post(props){

const [likes,setLikes]= React.useState(0)
const [hasLiked,sethasLiked]= React.useState(false)
const [comments,setComments]=React.useState([])
const [open,setOpen]=React.useState(false)
const[commentText,setCommentText]=React.useState()
const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleWhatsapp = () => {
    var pathname= window.location.pathname
    var splitname= window.location.pathname.split("/home").shift()
    var copyText = window.location.protocol+window.location.host+splitname+"/posts/"+props.postId;
    var mymessage= "Check out this post on Social Crown:  "+copyText
        var message= mymessage.split(' ').join("%20")
        var link="https://api.whatsapp.com/send?text="+message

        window.location.href=link

  };
  const handleClose=(event,reason)=>{
    if (reason === 'clickaway') {
      return;
    }
    setAnchorEl(null)
    setOpen(false)
  }
  const handleCopy = () => {
    var pathname= window.location.pathname
    var splitname= window.location.pathname.split("/socialcrown/#/home").shift()
    var copyText = window.location.protocol+window.location.host+splitname+"/posts/"+props.postId;

    
    navigator.clipboard.writeText(copyText).then(()=>{
      setAnchorEl(null)
    }).then(()=>{
      setOpen(true)
    })


  };
React.useEffect(()=>{

  if(props.postId){


 firebase.firestore().collection("Posts").doc(props.postId).collection("Comments").onSnapshot(snapshot=>{
setComments(snapshot.docs.map(doc=>doc.data()))
if(props.postId){


  firebase.firestore().collection("Posts").doc(props.postId).get().then(doc=>{
    var data=doc.data()
    setLikes(data.likes)
  if(data.likedusers.includes(props.currentemail)){
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
},[props.postId,props.currentuser,props.currentemail])

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
     var confirm= window.confirm("This will delete your post. Do you really want to do that?")
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
        props.currentuser===props.username && props.isauthenticated===true &&
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
        <Button variant="contained" color="lightgreen" style={{marginTop:"2%",marginLeft:"5%"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        SHARE POST
      </Button>
       <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleWhatsapp}>Share post</MenuItem>
        <MenuItem onClick={handleCopy}>Copy post</MenuItem>

      </Menu>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Link copied!"
       
      />
            </div>

            <br/>
            <hr style={{borderColor:"black"}}/>
     
       
            {/*hedear --> avatar +username */}
            {
              props.video &&
              
              (
              <ReactVideo   src={props.video}
              poster="https://www.hdwallpapers.in/download/black_design-HD.jpghttps://www.hdwallpapers.in/download/black_design-HD.jpg"
              primaryColor="red" className="post_video" width={window.innerWidth/5} height={window.innerHeight/2} />
              
              )
            }


              {
              props.photoURL &&
              (
              <img className="post_image" src={props.photoURL} alt="f"/>
              )
            }
           
    
    

{
   hasLiked===false && props.isauthenticated===true &&
    (
 
      <AiIcons.AiOutlineHeart size={30} onClick={()=>{
  
     firebase.firestore().collection("Posts").doc(props.postId).update({
       likes:firebase.firestore.FieldValue.increment(1),
       likedusers:firebase.firestore.FieldValue.arrayUnion(props.currentemail)
     })
    
    sethasLiked(true)
    
    }}/>

  )
}
{
  hasLiked===true && props.isauthenticated===true &&
  (

      <AiIcons.AiFillHeart  size={30} onClick={()=>{
     
      if(props.postId){
      
       firebase.firestore().collection("Posts").doc(props.postId).get().then(doc=>{
         var data=doc.data()
         if(data.likes>0 || data.likes==0){
           
          firebase.firestore().collection("Posts").doc(props.postId).update({
            likes:firebase.firestore.FieldValue.increment(-1),
            likedusers:firebase.firestore.FieldValue.arrayRemove(props.currentemail)
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

{ likes<1 || likes>1 ? <h2>{props.likes} like(s) </h2> :<h2>{props.likes} like(s)</h2>}


            <h4 className="post_text"><strong>{props.username} :</strong>  {props.caption} </h4>
           <hr />
           <br/>
           <div style={{display:"flex",flexDirection:"row"}} className="commentsdiv">

          {
            props.isauthenticated === true &&


            ( 
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <TextField onChange={(e)=>{setCommentText(e.target.value)}} placeholder={`Add a comment, ${props.currentuser}`} style={{width:"100%",marginLeft:"1%"}} id="standard-basic"  />
             <Button onClick={commentPost} style={{marginRight:"1%"}}  disabled={!commentText}>
               COMMENT
               </Button>
               </div>
            )
          }
           </div>
           
           {
             comments &&
             comments.map((comment)=>{
               return(

                 <div style={{padding:15,display:"flex",justifyContent:"flex-start",}} className="comments">
                   <ShowMoreText
                
                lines={1}
                more='Show more'
                less='Show less'
                className='content-css'
                anchorClass='my-anchor-css-class'
           
                expanded={false}
                width={280}
            >
                <p style={{marginRight:"10%"}}> 
                        <strong>{comment.commenter} : </strong> <light>{comment.comment}</light>
                        </p>
                        </ShowMoreText>
                        </div>
               )
             })
           }
          
    
          
          
            
        </div>
  )
}