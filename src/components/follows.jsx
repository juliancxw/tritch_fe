import React, {useState, useEffect} from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import DecodeToken from "../services/token_decoder";
import { Divider, Grid, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom"

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
        textAlign: "left"
    },
    comment: {
        textAlign: "left"
    },
    button: {
        width: "100px",
        margin: "0px 0px",
        marginRight: "10px"
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    header: {
        display: "flex",
        flexDirection: "column"
    },
    nameHeading: {
        margin: "10px 0", 
        textAlign: "left",
    },
    divider: {
        margin: "30px 0" 
    },
    follower: {
        textAlign: "left", 
        color: "gray"
    }
}));

function Follow(props){
    
    const classes = useStyles();
    const [followers, setFollowers] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState('');
    const [isFollowed, setIsFollowed] = useState(false);
    const [userProfileData, setUserProfileData] = useState({});

    //The user ID of  profile
    const profileID = useParams().profileid;

    const headers = {
        auth_token: Cookies.get("auth_token"),
    };

    
    useEffect(() => {
        setIsLoading(true);
        const verifiedUserID = DecodeToken(Cookies.get("auth_token"));
        let tempUser;
        //get data  logedIn User
        const getUserData = async () =>{
            const headers = {
                auth_token: Cookies.get("auth_token"),
            };
            await axios
            .get(
              `http://localhost:8000/api/v1/users/display-users/${verifiedUserID}`,
              { headers: headers }
            )
            .then((response) => {
              setUserData(response.data);
              tempUser = response.data
            })
            .catch((err) => {
              if (!err.response.data) {
                toast(`server error...`);
              }
              toast(err.response.data);
            });
        }
        //get followers of  Profile
        const getFollowers = async () => {
            await axios
            .get(`http://localhost:8000/api/v1/following/${profileID}`,  { headers: headers })
            .then((res) => {
                console.log(res.data)
                setFollowers(res.data);
                for(let i = 0; i<res.data.length; i++){
                    if(res.data[i].user._id === tempUser._id){
                        console.log("asdasdasd")
                        setIsFollowed(true);
                        break;
                    }
                }
                setIsLoading(false);
            })
            .catch((err) => {
                toast(err.response.data);
                setIsLoading(false);
            })
        }
        //get the data the Profile
        const getProfileData = async () => {
            const headers = {
                auth_token: Cookies.get("auth_token"),
            };
            await axios
            .get(
              `http://localhost:8000/api/v1/users/display-users/${profileID}`,
              { headers: headers }
            )
            .then((response) => {
              setUserProfileData(response.data);
            })
            .catch((err) => {
              if (!err.response.data) {
                toast(`server error...`);
              }
              toast(err.response.data);
            });
        }
        getUserData();
        getFollowers();
        getProfileData();

    },[])

    //Function for follow button
    const handleFollow = async () => {
        await axios
        .post(`http://localhost:8000/api/v1/following/${userData._id}/follow`, {following: profileID}, { headers: headers })
        .then(() => {
            console.log("Followed")
            let tempFollower = [...followers]
            tempFollower.push({following: profileID, user: userData})
            setFollowers(tempFollower)
            setIsFollowed(true);
        })
        .catch((err) => {
            if (!err.response.data) {
                toast(`server error...`);
            }
            toast(err.response.data);
        })
    }

    //Function for UnFollow button
    const handleUnfollow = async () => {
        await axios
        .post(`http://localhost:8000/api/v1/following/${userData._id}/unfollow`, {following: profileID}, { headers: headers })
        .then((res) => {
            console.log("UnFollowed")
            let tempFollower = [...followers]
            tempFollower = tempFollower.filter(follower => follower.user._id !== userData._id)
            setFollowers(tempFollower);
            setIsFollowed(false);
        })
        .catch((err) => {
            if (!err.response.data) {
                toast(`server error...`);
            }
            toast(err.response.data);
        })
    }
    
    if(isLoading)
        return <h2>Loading</h2>

    return (
        <div className={classes.root} className="App">
            <Paper className={classes.paperStyle}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} className={classes.large} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                <div className={classes.header}>
                    <h2 className={classes.nameHeading}>{userProfileData.firstName + " " +  userProfileData.lastName}</h2>
                    {userData._id === profileID ? <></> :
                    <div>
                    {isFollowed === false ? 
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleFollow}
                    >
                        Follow
                    </Button>:
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleUnfollow}
                    >
                        Unfollow
                    </Button>
                    }
                    
                    </div>
                    }
                    
                </div>
                <p>
                    Followers: {followers.length}
                </p>
               
                </Grid>
            </Grid>
            <Divider variant="fullWidth" className={classes.divider}/>
            </Paper>  
        </div>
    )
}

export default Follow;
