import React, { useState, useRef } from "react";
import PropTypes from 'prop-types'
import FullCalendar, { parseClassNames } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useEffect } from "react";
import Alert from "sweetalert2";

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`scrollable-auto-tabpanel-${index}`}
//         aria-labelledby={`scrollable-auto-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box p={3}>
//             <Typography>{children} hello</Typography>
//           </Box>
//         )}
//       </div>
//     );
// }
  
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };
  
function a11yProps(index) {
    return {
        id: `day-tab-${index}`,
        'aria-controls': `day-tabpanel-${index}`,
    };
}


  

export default function Itinerary() {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
        card: {
            width: 200,
        }
    }));
     
    
    const [events, setEvents] = useState([
        { title: "Event 1", id: "1" },
        { title: "Event 2", id: "2" },
        { title: "Event 3", id: "3" },
        { title: "Event 4", id: "4" },
        { title: "Event 5", id: "5" }
    ])

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
                create: false,
                };
            }
        });
    })
    
    const classes = useStyles()

    const [daySelection, setDaySelection] = React.useState(0);
    
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

    const handleeventRecieve = info => {
        console.log("dropped")
        // // const id = uuid();
        // const newEvent = {
        //   title: info.draggedEl.getAttribute("title"),
        // //   start: info.date,
        // //   end: new Date(
        // //     moment(info.date)
        // //       .add(1, "hour")
        // //       .valueOf()
        // //   ),
        //   id: info.draggedEl.getAttribute("id")
        // };
        // setState({
        //   calendarEvents: this.state.calendarEvents.concat(newEvent)
        // });

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
                            <Tab label={<React.Fragment>
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
                            </React.Fragment>} {...a11yProps(6)} />
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
                            // eventReceive={eventReceive}
                            eventClick={eventClick}
                            drop={handleeventRecieve}
                        />
                    
    
                    
                </Grid>
            </Grid>
        </div>

    )
}

