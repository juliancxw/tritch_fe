import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import DecodeToken from "../services/token_decoder";
import { Divider, Grid, Paper, Avatar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { LeakAddTwoTone } from "@material-ui/icons";
import { useImperativeHandle } from "react";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 14,
  },
  paperStyle: {
    padding: "40px 20px",
  },
  name: {
    margin: 0,
    textAlign: "left",
  },
  comment: {
    textAlign: "left",
  },
  button: {
    width: "100px",
    margin: "0px 0px",
    marginRight: "10px",
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  nameHeading: {
    margin: "10px 0",
    textAlign: "left",
  },
  divider: {
    margin: "30px 0",
  },
  follower: {
    textAlign: "left",
    color: "gray",
  },
}));

function Follow(props) {
  const classes = useStyles();
  const [followers, setFollowers] = useState({followers: [], following: []});
  
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});

  //The user ID of  profile
 const {userid} = useParams()
  
 
  const headers = {
    auth_token: Cookies.get("auth_token"),
  };
  const verifiedUserID = DecodeToken(Cookies.get("auth_token"));

  let profileID = userid
  if (!userid) {
    profileID = verifiedUserID
  }


  useEffect(() => {
    setIsLoading(true);
    getUserData();
    getFollowers();
    getProfileData();
  },[]);

  //get data  logedIn User
  const getUserData = async () => {
    const headers = {
      auth_token: Cookies.get("auth_token"),
    };
    await axios
      .get(
        `https://tritch-be.herokuapp.com/api/v1/users/show/${verifiedUserID}`,
        { headers: headers }
      )
      .then((response) => {
        setUserData(response.data);
       
      })
      .catch((err) => {
        
        toast(err);
      });
  };
  //get followers of  Profile
  const getFollowers = () => {
     axios
      .get(`https://tritch-be.herokuapp.com/api/v1/following/${profileID}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data)
        setFollowers(res.data);
       
        let followedByUser = followers.followers.find(x => x._id === userid )
        if (followedByUser){
          setIsFollowed(true)
        }
       
        setIsLoading(false);
      })
      .catch((err) => {
        toast(err);
        setIsLoading(false);
        
      });
      
  };
  
  //get the data the Profile
  const getProfileData = async () => {
    const headers = {
      auth_token: Cookies.get("auth_token"),
    };
    await axios
      .get(`https://tritch-be.herokuapp.com/api/v1/users/show/${profileID}`, {
        headers: headers,
      })
      .then((response) => {
        setUserProfileData(response.data);
     
      })
      .catch((err) => {
        if (!err.response.data) {
          toast(`server error...`);
        }
        toast(err.response.data);
      });
  };

  //Function for follow button
  const handleFollow =  async () => {
    try {
      await axios
      .post(
        `https://tritch-be.herokuapp.com/api/v1/following/${verifiedUserID}/follow`,
        { following: userid },
        { headers: headers }
      )
    }
    catch(err){
      console.log(err)
    }
        console.log("Followed");
        setIsFollowed(true);
        getFollowers()
      
  };

  //Function for UnFollow button
  const handleUnfollow =  async () => {
    try {
      axios
      .post(
        `https://tritch-be.herokuapp.com/api/v1/following/${verifiedUserID}/unfollow`,
        { following: userid},
        { headers: headers }
      )
    }
    catch(err) {
     
        console.log(err)
     
    }
    setIsFollowed(false);
    getFollowers()
      
  };

  if (isLoading) return <h2>Loading</h2>;

  return (
    <div className={classes.root} className="App">
      
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} className={classes.large} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <div className={classes.header}>
              <h2 className={classes.nameHeading}>
                {userProfileData.firstName + " " + userProfileData.lastName}
              </h2>
              {userData._id === profileID ? (
                <></>
              ) : (
                <div>
                  {isFollowed === false ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleUnfollow}
                    >
                      Unfollow
                    </Button>
                  )}
                </div>
              )}
            </div>
            {followers
            ?  <Box>
            <p>Followers: {followers.followers.length}</p>
                           <p>Following: {followers.following.length}</p>
                        </Box>
            :""
            }
           
         
            
          </Grid>
        </Grid>
        <Divider variant="fullWidth" className={classes.divider} />
      
    </div>
  );
}

export default Follow;
