import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles'
import { useState } from 'react';
import mapStyles from './mapStyles'

const Map = ({ setCoordinates, setBounds, coordinates, places, setchildClicked, weatherData}) => {

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coordinates}
        zoom={14}
        //on snazzymaps.com you can find all sorts of styles to customize map
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.bounds.ne, sw: e.bounds.sw })
        }}
        onChildClick={(child) => setchildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            key={i}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {
              isMobile ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="subtitile2" gutterBottom>{place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                 <Rating size="small" value={Number(place.rating)} readOnly />     
                </Paper>
              )
            }
          </div>
        ))}
        {
          weatherData?.list?.map((weather, i) => (
            <div key={i} lat={weather.coord.lat} lng={weather.coord.lon}>
              <img height={100} src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
            </div>
          ))
        }
      </GoogleMapReact>
    </div>
  )
}

export default Map