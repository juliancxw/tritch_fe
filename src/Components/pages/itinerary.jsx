import React, { useState, useRef, useEffect } from "react"
import "./itinerary.css";
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom"
import itineraryAPI from "../../services/itinerary"
import FullCalendar, { parseClassNames } from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from "sweetalert2"
import { AutorenewTwoTone } from "@material-ui/icons";




// accessibility props  
function a11yProps(index) {
    return {
        id: `day-${index + 1}-selector`,
        'aria-controls': `day-${index + 1}-selector`,
    };
}


  

export default function Itinerary() {
    
    // <<<<<States>>>>>

    // Current Itinearry
    const [itinerary, setItinerary] = useState({})

    // Attractions
    const [events, setEvents] = useState([
        { title: "Event 1", id: "1" },
        { title: "Event 2", id: "2" },
        { title: "Event 3", id: "3" },
        { title: "Event 4", id: "4" },
        { title: "Event 5", id: "5" }
    ])

    // Current day selected to edit itinerary
    const [daySelection, setDaySelection] = React.useState(0);

    // 
    const [calendarEvents, setCalendarEvents] = React.useState()


    // <<<<< Effects >>>>>

    // Retrieve itinerary data
    const itineraryId = useParams().id
    useEffect(() => {
       getItinerary(itineraryId)
       
    },[])
    
    // Add draggable function to attractions
    useEffect(() => {
        let draggableEl = document.getElementById("external-events");
        new Draggable(draggableEl, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
                let title = eventEl.getAttribute("title");
                let id = eventEl.getAttribute("data");
                return {
                title: title,
                id: id, 
                };
            }
        });
    }, [])

    

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            //   backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(2),
        },
        paper: {
            marginBottom: theme.spacing(2),
            padding: '5px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        card: {
            width: 200,
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
          
    }));
     
    // Function to get itinerary

    const getItinerary = async (id) => {
        try {
            let iti = await itineraryAPI.getItinerary(id)
            setItinerary(iti.data)
           
        }
        catch (error) {
            console.log(error)
        }
        
    }
  
    
    const classes = useStyles()


    
    const calendarRef = useRef(null)

    const eventClick = (eventClick) => {
        
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
                            <td>Start Time</td>
                            <td><strong>
                                ` +
                                eventClick.event.start +
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
            cancelButtonText: "Close"
        }).then((result) => {
            if (result.value) {
                eventClick.event.remove(); // It will remove event from the calendar
                Alert.fire("Deleted!", "Your Event has been deleted.", "success");
            }
        });
    };

    const eventChange = (events) => {
        // let calendarApi = calendarRef.current.getApi()
        // let events = calendarApi.getEvents()
        let setEvents = events.map((event) =>({
            "title": event.title
        }))
            
        setCalendarEvents(setEvents)
    }



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
    
    return(
        <div className={classes.root}>
        <Container maxWidth="xl" mt={2}>
            <Helmet>
                <title>Itinerary</title>
            </Helmet>
            <Paper className={classes.paper} >
                <TextField
                    id="itineraryName"
                    className={classes.input}
                    label="Name"
                    defaultValue="Name"
                    value={itinerary ? itinerary.name : ''}
                    // variant="outlined"
                    onChange={(e) => setItinerary(prevState => ({
                        ...prevState,
                        name: e.target.value
                    }))}
                
                />
                <TextField
                    id="destination"
                    className={classes.input}
                    label="Destination"
                    defaultValue="Destination"
                    value={itinerary ? itinerary.destination : ''}
                    // variant="outlined"
                    onChange={(e) => setItinerary(prevState => ({
                        ...prevState,
                        destination: e.target.value
                    }))}
                    
                />
                <TextField
                    id="trip_duration"
                    className={classes.input}
                    label="Duration"
                    defaultValue="1"
                    type="number"
                    value={itinerary ? itinerary.trip_duration : ''}
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
                
            </Paper>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div id="external-events">
                        {events.map((event) => (
                            <Card
                            className= {`${classes.card} fc-event`}
                            title={event.title}
                            data={event.id}
                            key={event.id}
                            variant="outlined"
                            >
                                <CardContent>
                                    {event.title}
                                </CardContent>
                               
                            </Card>
                        ))}
                    </div>
                   
                </Grid>
                <Grid item xs={6}>
                    {/* <AppBar position="static" color="default"> */}
                        <Tabs
                        value={daySelection}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="Day Selector Tab"
                        >
                            {[...Array(itinerary.trip_duration)].map(
        (element, index) => (
            <Tab label={<React.Fragment>
                Day<br />
                {index + 1}
            </React.Fragment>}{...a11yProps(index)} />
        )
      )}
                            {/* <Tab label={<React.Fragment>
                                Day<br />
                                1
                            </React.Fragment>}{...a11yProps(0)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                2
                            </React.Fragment>} {...a11yProps(1)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                3
                            </React.Fragment>} {...a11yProps(2)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                4
                            </React.Fragment>} {...a11yProps(3)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                5
                            </React.Fragment>} {...a11yProps(4)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                6
                            </React.Fragment>} {...a11yProps(5)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                7
                            </React.Fragment>} {...a11yProps(6)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                8
                            </React.Fragment>} {...a11yProps(6)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                9
                            </React.Fragment>} {...a11yProps(6)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                10
                            </React.Fragment>} {...a11yProps(6)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                11
                            </React.Fragment>} {...a11yProps(6)} />
                            <Tab label={<React.Fragment>
                                Day<br />
                                12
                            </React.Fragment>} {...a11yProps(6)} /> */}
                        </Tabs>
    
                    {/* </AppBar> */}
                    
                        <FullCalendar
                            rerenderDelay={10}
                            ref={calendarRef}
                            plugins={[ timeGridPlugin, interactionPlugin ]}
                            initialView="timeGridDay"
                            editable={ true }
                            droppable={true}
                            dragRevertDuration={0}
                            headerToolbar={ false }
                            height={ 650 }
                            allDaySlot={ false }
                            scrollTime={ '07:00:00'}
                            dayHeaderContent= {"Day "+ (daySelection + 1)} 
                            initialDate={"2050-01-01"}
                            eventClick={eventClick}
                            // eventChange={eventChange}
                            // drop={eventChange}
                            eventsSet={eventChange}
                        />
                    
    
                    
                </Grid>
            </Grid>
           
           </Container>
           </div>
           
    )
}

