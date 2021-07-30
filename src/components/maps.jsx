import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { isPropsValid } from '@fullcalendar/react';
import { useEffect, useState, useCallback } from 'react';
import { ListItemAvatar } from '@material-ui/core';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',

};

const options = {
    disableDefaultUI: true
  }

function Maps(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA0J11Yrneq4iE90Gh29MEsTyDEs7C9zEE",
    
  })
  
  console.log(props.lng)
  
   

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
      console.log(props.lat)
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])



  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
       
      >
        
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Maps)