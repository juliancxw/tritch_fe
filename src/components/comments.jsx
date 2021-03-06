import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DecodeToken from "../services/token_decoder";
import { Divider, Grid, Paper, Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 14,
  },
  paperStyle: {
    padding: "5px 20px",
  },
  name: {
    margin: 0,
    textAlign: "left",
  },
  comment: {
    textAlign: "left",
  },
  button: {
    marginTop: "10px",
  },
}));

function Comments(props) {
  //React States - React Hooks

    //React States - React Hooks
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState([]);
    const [EditableComment, setEditableComment] = useState('');
    const [comments, setComments] = useState([])
    const [postComment, setPostComment] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState('');
 


    //It is must to pass the iternrary ID in the route so that this component can be used
    const itineraryID = useParams().id;
    const authToken = Cookies.get("auth_token")
    const headers = {
        auth_token: authToken
    };

    //UseEffect Hook
    useEffect(()=>{
        setIsLoading(true);
        getUserData();
        getComments();

    }, [])

    //Fetching the data of the logedIn User
    const getUserData = async () =>{
        const verifiedUserID = DecodeToken(Cookies.get("auth_token"));
        console.log(verifiedUserID)
        await axios
        .get(
            `https://tritch-be.herokuapp.com/api/v1/users/show/${verifiedUserID}`,
            { headers: headers }
        )
        .then((response) => {
            setUserData(response.data);
        })
        .catch((err) => {
            if (!err.response.data) {
            toast(`server error...`);
            }
            toast(err.response.data);
        });
    }
    //Fetching the comments of the particular itinerary
    const getComments = async () => {
        let commentsData
        try{
            commentsData = await axios
            .get(`https://tritch-be.herokuapp.com/api/v1/comments/itinerary/${itineraryID}`,  { headers: headers })
        }
        catch(err){
            toast(err.response.data);
        }
        console.log(commentsData)
        if(commentsData){
            setComments(commentsData.data)
            
        }
        setIsLoading(false);
    
    }

    //Function to handle the Edit comment - When user presses the Edit button
    const handleEdit = (comment, index) => {
        setIsEdit((v) => {
        v[index] = !v[index];
        return v;
        });
        setEditableComment(comment.comments);
    };

    //Function to handle the cancel button - When User wants to cancel the edited comment to its previous state
    const handleCancel = (index) => {
        setIsEdit((v) => {
        v[index] = !v[index];
        return v;
        });
        setEditableComment("");
    };

    //Function to handle the save button - When User wants to save the edited comment
    const handleSave = async (commentparam, index) => {
        setIsEdit((v) => {
        v[index] = !v[index];
        return v;
        });
        setEditableComment("");

        let indx = -1;
        for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id === commentparam._id) indx = i;
        }

        let tempComment = [...comments];
        tempComment[indx].comments = EditableComment;
        setComments(tempComment);

        await axios
        .put(
            `https://tritch-be.herokuapp.com/api/v1/comments/${commentparam._id}`,
            { comments: EditableComment },
            { headers: headers }
        )
        .then(() => console.log("Comment Updated"))
        .catch((err) => {
            if (!err.response.data) {
            toast(`server error...`);
            }
            toast(err.response.data);
            setIsLoading(false);
        });
    };

    //Function to delete the comment
    const handleDelete = async (comment, index) => {
        let tempComments = [...comments];
        tempComments.splice(index, 1);
        setComments(tempComments);

        await axios
        .delete(
            `https://tritch-be.herokuapp.com/api/v1/comments/${comment._id}`,
            { headers: headers }
        )
        .then(() => console.log("comment Deleted"))
        .catch((err) => {
            if (!err.response.data) {
            toast(`server error...`);
            }
            toast(err.response.data);
            setIsLoading(false);
        });
    };



    //Function to handle the posting of comment
    const handlePost = async () => {
        if (postComment.length == 200) {
            toast("Comment Should be less than 200 characters");
          }
        let tempComments = [...comments]
        
        tempComments.push({comments: postComment, user: {_id: userData._id, firstName: userData.firstName, lastName: userData.lastName} })
        setComments(tempComments)
        
        try{
            await axios
        .post(`https://tritch-be.herokuapp.com/api/v1/comments/${userData._id}/itinerary/${itineraryID}/new`, {comments: postComment}, { headers: headers })
        }
        catch(err) {
            toast(err);
        }
        console.log("Comment Created")
      setPostComment('')

        
    }


    //Function to handle the text change
    const handleChange = (event) => {
        setEditableComment(event.target.value);
    };


  //Function to handle the text change of new comment
  const handleChangePostComment = (event) => {
    if (event.target.value.length <= 200) setPostComment(event.target.value);
  };

  

if (isLoading) return <CircularProgress/>;

  return (
    <div className={classes.root}>

        <Box style={{maxHeight: '60vh', overflow: 'auto'}}  display="block" p={1} m={1} textAlign='center'>
        {comments.map((comment, i) => {
            let orignalTime = comment.createdAt;

            return (
                <Box>
                    <Grid container wrap="nowrap" spacing={2}>
                    {!isEdit[i] ? <Grid item xs zeroMinWidth>
                                    <h4 className={classes.name}>{comment.user.firstName + " " + comment.user.lastName}</h4>
                                    <p className={classes.comment}>
                                        {comment.comments}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        Posted: {moment(orignalTime).fromNow()}
                                        </p>
                                    {userData._id === comment.user._id && 
                                        <p style={{ textAlign: "left", color: "gray" }}> 
                                        <Button size="small" onClick={() => handleEdit(comment, i)} disabled={EditableComment !== '' ? true : false}>Edit</Button>
                                        <Button size="small" color="secondary" onClick={() => handleDelete(comment, i)}>Delete</Button>
                                        </p>
                                    }
                                </Grid> 
                               
                            : 
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <TextField
                            id="outlined-multiline-static"
                            value={EditableComment}
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            />
                            <p style={{ textAlign: "left", color: "gray" }}> 
                                    <Button size="small" color="grey" onClick={() => handleSave(comment, i)}>Save</Button>
                                    <Button size="small" color="secondary"  onClick={() => handleCancel(i)}>Cancel</Button>
                            </p>
                        </div>
                        
                         
                    }
                     
                   
                    </Grid>
                     <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
                </Box>
     
            )

        })}
        </Box>
   
        <div style={{display: 'flex', flexDirection: "column", alignItems: "flex-end"}}>
        <TextField

            id="outlined-multiline-static"
            label="Post your comment"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            value={postComment}
            onChange={handleChangePostComment}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SendIcon />}
            onClick={handlePost}
            disabled={
              postComment.length === 0 || postComment.length >= 200
                ? true
                : false
            }
          >
            POST

        </Button>
    </div>


    </div>
  );
}

export default Comments;
