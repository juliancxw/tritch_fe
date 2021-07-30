import React, { useState, useRef, useEffect, useCallback } from "react"
import { withRouter, Redirect } from "react-router";
import debounce from "lodash.debounce"
import "./view_itinerary.css"
import { Helmet } from 'react-helmet'
import { useParams } from "react-router-dom"
import Cookies from "js-cookie";
import clsx from 'clsx'
import itineraryAPI from "../../services/itinerary"
import attractionsAPI from "../../services/attractions"
import citiesAPI from "../../services/cities"
import FullCalendar, { parseClassNames } from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import Alert from "sweetalert2"
import SaveIcon from '@material-ui/icons/Save'
import CheckIcon from '@material-ui/icons/Check'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete'
import Rating from '@material-ui/lab/Rating'
import { positions } from '@material-ui/system';
import { sizing } from '@material-ui/system';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment'
import Comments from "../comments";
import Maps from "../maps";






// accessibility props  
function a11yProps(index) {
    return {
        id: `day-${index + 1}-selector`,
        'aria-controls': `day-${index + 1}-selector`,
    };
}


  

function ViewItinerary(props) {
    
    // <<<<<States>>>>>

    // Current Itinearry
    const [itinerary, setItinerary] = useState()
    
    // Selected destination
    const [destination, setDestination] = useState()
    // Attractions
    const [attractions, setAttractions] = useState()

    // Current day selected to edit itinerary
    const [daySelection, setDaySelection] = useState(0);

    // Save button state
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    

    const [autoCities, setAutoCities] = useState([])

    const [selectedDestination, setSelectedDestination] = useState({slug: "hello", name: "hello", destinationType:"hello"})

    // States to manage auto complete
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(0)
    const destiLoading = open && autoCities.length === 0;

    const [citiesData, setCitiesData] = useState([])
    const [searchedCity, setSearchedCity] = useState()

    // Google Maps
    const [center, setCenter] = useState({
        lat: 22.28552,
        lng: 114.15769
        })
    const [destinationLoaded, setDestinationLoaded]  = useState(false)





  
    // <<<<< Effects >>>>>

    // Retrieve itinerary data
    const itineraryId = useParams().id
    
    useEffect(async() => {
        let theItinerary
        try {
            await getItinerary(itineraryId)
        } catch (err) {
            console.log(err)
            
        }
        
       
    },[])

        // Lodash function to delay frequency of autosearch
        const debouncedSearch = useCallback(
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
                debouncedSearch(searchQuery)
             
            }   
        },[searchQuery, debouncedSearch])
    

    // Retrieve attractions based on destination
     
    useEffect(() => {
        if(itinerary) {
            getAttractions(itinerary.destination)
        }
       else console.log("invalid")       
     },[searchedCity])
    
    

    // Autosave changes to trip itinerary whenever state changes
    // Lodash function to save object to database but set delay
    const debouncedSave = useCallback(
        debounce(async (itinerary) => {
          await updateItinerary(itineraryId, itinerary.name, itinerary.destination, Number(itinerary.trip_duration), itinerary.itinerary, itinerary.published);
        }, 1000),
        [],
      );
      
      // Runs only when Itinerary changes.
      useEffect(() => {
        if (itinerary) {
          debouncedSave(itinerary);
        }
        // debouncedSave is wrapped in a useCallback with an empty dependency list,
        // thus it will not change and in turn will not re-trigger this effect.
      }, [itinerary, debouncedSave]);

    // Autosave button timer
      React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

 

    // Set map center acoording to destination data
    useEffect(() => {

        if(destinationLoaded){
            setCenter({
                lat: Number(destination.lat),
                lng: Number(destination.long)
                })
        }
    
    },[destinationLoaded])


    
    // <<<<< Functions >>>>>

  

    // Function to retrieve itinerary by id and retrieve attractions based on itinerary location

    const getItinerary = async (id) => {
        let subjectItinerary
        
        try {
            
            subjectItinerary = await itineraryAPI.getItinerary(id)
            setItinerary(subjectItinerary.data)
            
        
        }
        catch (error) {
            console.log(error)
        }
        getAttractions(subjectItinerary.data.destination)
    }

    // Function to get attractions data
    const getAttractions = async (location) => {
        let attractionsData
        let destinationData
          // get LatLong
          try {
            destinationData = await citiesAPI.search(location)
        }
        catch (error) {
            console.log(error)
        }
        
        let latLong = destinationData.data.data.latlong
        console.log(latLong)
        try {
            attractionsData = await attractionsAPI.search(destinationData.data.data.name, latLong)
            
        }
        catch (error) {
            console.log(error)
        }
        console.log(attractionsData)
      
        
        await setAttractions(attractionsData.data)
        await setDestination(destinationData.data.data)
        await setSelectedDestination(Object.assign({},{
            slug: destinationData.data.data.slug,
            name: destinationData.data.data.longName,
            destinationType: destinationData.data.data.destinationType
        }))
        setDestinationLoaded(true)
    }
    
    // Function to update itinerary by id

    const updateItinerary = async (id, name, destination, trip_duration, itinerary, published) => {
        setSuccess(false);
        setLoading(true);
        try {
            await itineraryAPI.updateItinerary(id, name, destination, trip_duration, itinerary, published)
        }
        catch (error) {
            console.log(error)
        }
        timer.current = window.setTimeout(() => {
            setLoading(false);
            setSuccess(true);
  
        }, 1000);
          timer.current = window.setTimeout(() => {
            setSuccess(false);
  
        }, 2000);
    }

    const deleteItinerary = async (id) => {
        setSuccess(false);
        setLoading(true);
        try {
            await itineraryAPI.deleteItinerary(id)
        }
        catch (error) {
            console.log(error)
        }
        timer.current = window.setTimeout(() => {
            setLoading(false);
            setSuccess(true);
  
        }, 1000);
          timer.current = window.setTimeout(() => {
            setSuccess(false);
  
        }, 2000);
    }

         
    // Function to handle save button click
    const handleSaveButtonClick =  () => {
        updateItinerary(itineraryId, itinerary.name, itinerary.destination, Number(itinerary.trip_duration), itinerary.itinerary, itinerary.published)
    }

    // Function to handle delete button click
    const handleDeleteButtonClick =  () => {
        Alert.fire({
            title: `Delete ${itinerary.name}?`,
            icon: 'warning',
            text:'Are you sure you want to delete this trip?',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete Trip",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.value) {
                deleteItinerary(itineraryId) 
                Alert.fire("Deleted!", "Your trip has been deleted.", "success");
                props.history.push("/");
            }
        });
    }
        

    // Function to handle clicking on event in agenda
    const eventClick = (eventClick) => {
        let start = moment.parseZone(eventClick.event.start).format('h:mm a')
        let end = moment.parseZone(eventClick.event.end).format('h:mm a')
        Alert.fire({
            title: eventClick.event.title,
            html:
            `<div class="table-responsive">
                <table class="table">
                    <tbody>
                        <tr >
                            <td>Title</td>
                            <td><strong>` +
                                eventClick.event.title +
                            `</strong></td>
                        </tr>
                        <tr >
                            <td>Time</td>
                            <td><strong>
                                `+ start+` - `+end +
                                `
                            </strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>`,

            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Remove Event",
            cancelButtonText: "Close",
            imageUrl: eventClick.event.extendedProps.image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image'
        }).then((result) => {
            if (result.value) {
                eventClick.event.remove(); // It will remove event from the calendar
                Alert.fire("Deleted!", "Your Event has been deleted.", "success");
            }
        });
    };
    


    // Function to save events to state whenever events are added/changed in itinerary
    const eventChange = (events) => {
        // let calendarApi = calendarRef.current.getApi()
        // let events = calendarApi.getEvents()
        console.log(events)
        let setEvents = events.map((event) =>({
            "title": event.title,
            "start": event.startStr,
            "end": event.endStr,
            "extendedProps": event.extendedProps
        }))
            
        console.log(setEvents)
        setItinerary(prevState => ({
            ...prevState,
            itinerary: setEvents}))
    }

    // Create presistent variable
    const calendarRef = useRef(null)

    // Function to handle change in day selector foritinerary agenda
    const handleChange = (event, newValue) => {
        setDaySelection(newValue);
        let calendarApi = calendarRef.current.getApi()
        if (newValue < 9){
            calendarApi.gotoDate(`2050-01-0${newValue + 1}`)
        }
        else if (newValue < 30 && newValue > 8) {
            calendarApi.gotoDate(`2050-01-${newValue + 1}`)
        }
    
    };




    

    function renderEventContent(eventInfo) {
        let start = moment.parseZone(eventInfo.event.start).format('h:mm a')
        let end = moment.parseZone(eventInfo.event.end).format('h:mm a')
        return (
            <Box zIndex="modal">
                <Card style={{backgroundColor: "#ce93d8", height:"100%" }}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="avartar" style={{backgroundColor: "#fff", color: "#ccc"}}src={eventInfo.event.extendedProps.image}>
                        E
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                        <MoreVertIcon />
                        </IconButton>
                    }
                    title={eventInfo.event.title}
                    titleTypographyProps={{variant:'subtitle1' }}
                    subheader= {`${start} - ${end}`}
                    />
                
                </Card>
            </Box>
            
                
        )
    }


    // <<<<< STYLES >>>>>

    const useStyles = makeStyles((theme) => ({
        root: {

            //   backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(2),
        },
        paper: {
            marginBottom: theme.spacing(2),
            padding: '5px 30px',
            display: 'flex',
            zIndex: 1,
            // position: 'absolute',
            // alignItems: 'center',
            // justifyContent: 'center',
        },
        attractionsContainer: {
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',        
        },
        card: {
            width: "90%",
            marginBottom: 20,
        },
    
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        input: {
            margin: "0px 10px",
            width: "auto",
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },

        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        media: {
        height: 140,
        },
        tab: {
        minWidth: 80,
        },
        panels: {
            position: 'relative',
         
        },
        map: {
        position: 'absolute',
        top: 50,
        left: 0,
        zIndex: -1,
        },
        justifyCenter: {
            justifyCenter: 'center',
        },
    }));
     
    const classes = useStyles()
    const timer = React.useRef();
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
      });
   
    const AnyReactComponent = ( {text} ) => <div>{text}</div>
   
       
     
    return(
        
        <div className={classes.root}>
            <Box mt={-3}>
                {center
                    ? <Maps center = {center} attractions = {attractions}/>
                    : <CircularProgress/>
                 }
            </Box>
            <Box  mt={2}>
                ..   
            </Box>

            <Box mt={2}>
                <Container maxWidth="xl" mt={2} classes={{root: classes.panels}}>
                    <Helmet>
                        <title>Itinerary</title>
                    </Helmet>
                    <Paper  className={classes.paper} >
                        <Box flexGrow={1}>
                            <FormGroup aria-label="published" row>
                                <TextField
                                    
                                    id="itineraryName"
                                    className={classes.input}
                                    disabled={true}
                                    label="Name"
                                    defaultValue="Name"
                                    value={itinerary ? itinerary.name : 'Name'}
                                    // variant="outlined"
                                    onChange={(e) => setItinerary(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))}
                                
                                />
    
                                <Autocomplete
                                    id="grouped-demo"
                                    options={autoCities}
                                    groupBy={(autoCities) => autoCities.destination_type}
                                    getOptionLabel={(autoCities) => autoCities.name}
                                    style={{ width: "30%" }}
                                    disabled={true}
                                    // getOptionSelected={(autoCities, value) => {return value.slug}}
                                    // value={searchQuery}
                                    loading={destiLoading}
                                    open={open}
                                    inputValue={selectedDestination.name}
                                    // inputValue={destination ? destination.longName : ''}
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
                                        setSearchedCity(value.slug)
                                        // getCity(value.slug)
                                        setItinerary(prevState => ({
                                            ...prevState,
                                            destination: value.slug
                                        }))
                                    }}
                                    
                                    onInputChange={(event, newInputValue) => {
                                        setSelectedDestination({...selectedDestination, name: newInputValue})
                                        console.log(newInputValue)
                                        setSearchQuery(newInputValue);
                                        }}
                                    renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        disabled={true}
                                        label="Destination" 
                                        disabled={true}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                            <React.Fragment>
                                                {destiLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                            ),
                                        }}
                                        />
                                    )}
                                />
                                <TextField
                                    id="trip_duration"
                                    disabled={true}
                                    className={classes.input}
                                    label="Duration"
                                    defaultValue="1"
                                    type="number"
                                    value={itinerary ? itinerary.trip_duration : '1'}
                                    // variant="outlined"
                                    onChange={(e) => setItinerary(prevState => ({
                                        ...prevState,
                                        trip_duration: Number(e.target.value)
                                    }))}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                                        inputProps: { min: 1, max: 30 }
                                    }}
                                    
                                />
                                
                            </FormGroup>
                        </Box>
                        
                        <Box justifyContent="flex-end">
                            <FormGroup aria-label="save" row>
                                <div className={classes.wrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={buttonClassname}
                                        disabled={loading}
                                        onClick={handleSaveButtonClick}
                                        startIcon={<SaveIcon />}
                                        style={{marginRight: 12}}
                                        >
                                        Save
                                    </Button>
                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                        
                            </FormGroup>
                        </Box>                    
                    </Paper>
                            
                    <Box width={1 / 4} position="absolute" >
                        
                        <Paper style={{height: '80vh'}}>
                            <Box display="block" p={1} m={1} >
                                <Typography variant="overline">
                                    Itinerary
                                </Typography>
                            </Box>
                        
                        
                                {itinerary ? 
                                
                                    <FullCalendar
                                        rerenderDelay={10}
                                        ref={calendarRef}
                                        plugins={[ listPlugin, interactionPlugin ]}
                                        initialView={"listMonth"}
                                        dragRevertDuration={0}
                                        headerToolbar={ false }
                                        height={ "60vh" }
                                        // listDayFormat={{day:'numeric'}}
                                        initialDate={"2050-01-01"}
                                        dayHeaderContent= {(args) => {
                                            return "Day " + moment(args.date).format('D')
                                        }} 
                                        
                                        eventClick={eventClick}
                                        // eventChange={eventChange}
                                        // drop={eventChange}
                                        
                                        events={itinerary.itinerary}
                                        
                                        eventContent={ renderEventContent}
                                        eventBackgroundColor={'#ce93d8'}
                                        eventBorderColor={'#fff'}
                                    
                                        
                                    /> 
                                : <CircularProgress/>}   
                            
                            
                        
                        </Paper>
                    </Box>
                            

                            
                    <Box width={1 / 4} position="absolute" right={24}>
                        <Paper style={{height: '80vh'}}>
                            <Comments/>
                        </Paper>    
                    </Box>
                
                </Container>

            </Box>
           
         
           
        </div>
            
    )


}

export default withRouter(ViewItinerary)

