import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const getMapBoundries = (markers) => {
  let minLat = Number.MAX_SAFE_INTEGER;
  let minLng = Number.MAX_SAFE_INTEGER;
  let maxLat = Number.MIN_SAFE_INTEGER;
  let maxLng = Number.MIN_SAFE_INTEGER;

  markers.forEach(({ lat, lng }) => {
    if ( lat < minLat ) minLat = lat;
    if ( lat > maxLat ) maxLat = lat;
    if ( lng < minLng ) minLng = lng;
    if ( lng > maxLng ) maxLng = lng;
  });

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  return {
    minLat,
    maxLat,
    minLng,
    maxLng,
    centerLat,
    centerLng,
  }
};

const MapComponent = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDh38ImZj-LlC88I0ygr-WLOkAp7L1TuCc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { markers } = props;
  let centerLat = 0;
  let centerLng = 0;

  if (markers) {
    const mapBoundaries = getMapBoundries(markers);
    centerLat = mapBoundaries.centerLat;
    centerLng = mapBoundaries.centerLng;
  }

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: centerLat, lng: centerLng }}
      onZoomChanged={(ev) => {
        console.log('ZG');
        console.log(ev);
      }}
    >
      <MarkerClusterer
        onClick={console.log}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {
          markers && markers.map((marker, index) => {
            const { lat, lng } = marker;
            return (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                }}
                onClick={console.log}
              />
            );
          })
        }
      </MarkerClusterer>
    </GoogleMap>
  );
});

export default MapComponent;
