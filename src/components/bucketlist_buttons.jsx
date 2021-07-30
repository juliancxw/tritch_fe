import React, { useState, useRef, useEffect, useCallback } from "react"
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import bucketlistAPI from "../services/bucketlist"
import Badge from '@material-ui/core/Badge';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';


export default function BucketlistButtons(props) {
  const [bucketlist, setBucketlist] = useState();
  const [existingBL, setExistingBL] = useState();
  const handleBucketlist = (event, newAlignment) => {
    console.log("hello")
  };
  const [beenThere, setBeenThere] = useState(false)

  useEffect(async() => {
    getBucketlist()
    
   
},[])


// Function to retrieve bucketlist by user and itinerary id
const getBucketlist = async () => {
    let bucketlistData
    try{
       bucketlistData = await bucketlistAPI.get(props.userId)
    }
    catch(err) {
        console.log(err)
    }
    
        setBucketlist(bucketlistData)
    
   
}

//Function to create bucketlist
const createBucketlist = async () => {
    try{
        await bucketlistAPI.add(props.userId, props.itineraryId, beenThere, props.header)
    }
    catch(err){

    }

}


  return (
    <ToggleButtonGroup
      value={bucketlist}
      exclusive
      onChange={handleBucketlist}
      aria-label="Bucket List"
    >
        <Badge badgeContent={4} color="primary">
      <ToggleButton value="addBucket" aria-label="Add Bucketlist">
      
        <CardTravelIcon/>
        
      </ToggleButton>
      </Badge>
      <Badge badgeContent={4} color="primary">
      <ToggleButton value="beenThere" aria-label="Been There">
      {"  "}<PlaylistAddCheckIcon /> {"  "}

      </ToggleButton>
      </Badge>
    </ToggleButtonGroup>
  );
}
