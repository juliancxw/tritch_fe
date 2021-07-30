import React, { useState, useRef, useEffect, useCallback } from 'react';
import WhereNextCard from "../where_next";
import { Link, withRouter, useParams, Redirect } from "react-router-dom";
import citiesAPI from "../../services/cities"
import attractionsAPI from "../../services/attractions"
import itineraryAPI from "../../services/itinerary"
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from '@material-ui/core/Box'
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import debounce from "lodash.debounce"
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Rating from '@material-ui/lab/Rating';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SecurityIcon from '@material-ui/icons/Security';

const StyledRating = withStyles({
    iconFilled: {
      color: '#649568',
    },
    iconHover: {
      color: '#649568',
    },
  })(Rating);

  const StyledRatingSafety = withStyles({
    iconFilled: {
      color: '#2979ff',
    },
    iconHover: {
      color: '#2979ff',
    },
  })(Rating);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    width:'80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  search: {
      width: "30%",
  },
  searchBox: {
    width: '100%',
},
root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function TripPlanner(props) {
    const classes = useStyles();

    // <<<<< STATES >>>>>
    const [autoCities, setAutoCities] = useState([])

    const [selectedDestination, setSelectedDestination] = useState()

    // States to manage auto complete
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(0)
    const loading = open && autoCities.length === 0;
    const [citiesData, setCitiesData] = useState([])
    const [searchedCity, setSearchedCity] = useState()



    // <<<<< Effects >>>>>
   
      
    // Lodash function to delay frequency of autosearch
    const debouncedSave = useCallback(
        debounce(async (searchQuery) => {
            
        let results = await citiesAPI.autoSearch(searchQuery);
        console.log(results.data)  
        setAutoCities(results.data.data)
            
        }, 500),
        [],
    );

    // Run Autosearch when query input changes
    useEffect(() => {
        let active = true;
        
        // Search only after more than 2 characters typed
        if (searchQuery.length > 2){
            debouncedSave(searchQuery)
         
        }   
    },[searchQuery, debouncedSave])




   // <<<<< FUNCTIONS >>>>>

     // Decoder function to refactor into service
     function decodeToken(token) {
        if (!token) {
          console.log("lol no token");
          return;
        }
      
        const decodedToken = jwt_decode(token);
      
        const decodedUserId = decodedToken.userID;
      
        return decodedUserId;
      }
    
  
     // Function to retrieve city data by slug
  
     const getCity = async (slug) => {
      let searchedCityData
      try {
          searchedCityData = await citiesAPI.search(slug)
      }
      catch (error) {
          console.log(error)
          return
      }
      setSearchedCity(searchedCityData.data.data)
    }    
    
        // Function to update itinerary by id

        // const updateItinerary = async (id, name, destination, trip_duration, itinerary, published) => {
        //     setSuccess(false);
        //     setLoading(true);
        //     try {
        //         await itineraryAPI.updateItinerary(id, name, destination, trip_duration, itinerary, published)
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        //     timer.current = window.setTimeout(() => {
        //         setLoading(false);
        //         setSuccess(true);
      
        //     }, 1000);
        //       timer.current = window.setTimeout(() => {
        //         setSuccess(false);
      
        //     }, 2000);
        // }
    
        // const deleteItinerary = async (id) => {
        //     setSuccess(false);
        //     setLoading(true);
        //     try {
        //         await itineraryAPI.deleteItinerary(id)
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        //     timer.current = window.setTimeout(() => {
        //         setLoading(false);
        //         setSuccess(true);
      
        //     }, 1000);
        //       timer.current = window.setTimeout(() => {
        //         setSuccess(false);
      
        //     }, 2000);
        // }
    
             
        // Function to handle go button click
        const handleGoClick =  async () => {
            const authToken = Cookies.get("auth_token");
            let verifiedUserID = decodeToken(authToken);
            let itineraryId
            try {
                itineraryId = await itineraryAPI.createItinerary(searchedCity.slug, verifiedUserID)
            }
            catch (error) {
                console.log(error)
            }
            props.history.push(`/itinerary/edit/${itineraryId.data}`) 
           
        }


  return (
    <React.Fragment>
      <CssBaseline />
         <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
              {searchedCity
                    ? 
                    <Box display="flex" justifyContent="center" >
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={searchedCity.image}
                                    title="Featured Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {searchedCity.longName}
                                    </Typography>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Rating:</Typography>
                                        <Rating name="read-only" precision={0.5} value={Math.round(searchedCity.rating * 2)/2}readOnly />
                                   
                                        <Typography component="legend">Budget: </Typography>
                                        
                                        <StyledRating
                                            name="Budget"
                                            value={Math.round(searchedCity.budget.value )} max={10}
                                            precision={0.5}
                                            icon={<AttachMoneyIcon  fontSize="inherit" />}
                                            readOnly
                                        /> {searchedCity.budget.text}
                                    
                                   
                                        <Typography component="legend">Safety: </Typography>
                                        
                                        <StyledRatingSafety
                                            name="Safety"
                                            value={Math.round(searchedCity.safety.value )} max={5}
                                            precision={0.5}
                                            icon={<SecurityIcon  fontSize="inherit" />}
                                            readOnly
                                        /> {searchedCity.safety.text}
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{display:"flex", justifyContent:"center", height:50}}>
                            
                                <Button 
                                    size="small" 
                                    color="primary"
                                    variant="contained"
                                    onClick={handleGoClick}>
                                        Lets start planning!
                                    </Button>
                              
                                
                            </CardActions>
                        </Card>
                        </Box>
                    : <Box>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Where next?
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Search for your dream destination and start planning your itinerary now!
                        </Typography>
                    </Box>
                }
            
        
          </Container>
          <Box display="flex" justifyContent="center" mt={4} m={1} p={1}>
          <Autocomplete
                id="grouped-demo"
                options={autoCities}
                groupBy={(autoCities) => autoCities.destination_type}
                getOptionLabel={(autoCities) => autoCities.name}
                style={{ width: "30%" }}
                // getOptionSelected={(autoCities, value) => {return value.slug}}
                // value={searchQuery}
                loading={loading}
                open={open}
                inputValue={searchQuery ? searchQuery : ''}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                  setAutoCities([])
                }}
                onChange={(e, value) => {
                    setOpen(false)
                    console.log(value.slug)
                    setSelectedDestination(value)
                    getCity(value.slug)
                }}
                
                onInputChange={(event, newInputValue) => {
                    console.log(newInputValue)
                    setSearchQuery(newInputValue);
                    }}
                renderInput={(params) => (
                <TextField 
                    {...params} 
                    // label="Where to?" 
                    variant="outlined"
                    label="Where to?"
                    value={searchQuery ? searchQuery : ''}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                )}
            />
          
          </Box>
          
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
      
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
  
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        
      </footer>
     
    </React.Fragment>
  )
}