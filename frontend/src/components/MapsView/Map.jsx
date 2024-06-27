import React, { useState, useEffect, useRef } from 'react';
import './Maps.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import Buttons from "../../components/Button/button";

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: require('./placeholder.png'),
  iconSize: [38, 38], // size of the icon
});

// Custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new L.DivIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: new L.Point(33, 33, true),
  });
};

// Markers


export default function Map({ setShowMapModal, directions }) {
    console.log(directions)
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef(null);
  const markers = [
    {
      geocode: [directions.latitude, directions.longitue],
      popUp: 'Hello, I am destination',
      radius: 1000, // 1 km radius
    },
  ];
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting current location: ', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );

    // Clean up the watchPosition listener when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (currentLocation && markers[0]?.geocode && mapRef.current) {
      const [currentLat, currentLng] = currentLocation;
      const [destLat, destLng] = markers[0].geocode;
      const distanceInKm = calculateDistance(currentLat, currentLng, destLat, destLng);
      setDistance(distanceInKm);

      // Create LatLng objects for current and destination locations
      const currentLatLng = L.latLng(currentLocation);
      const destLatLng = L.latLng(markers[0].geocode);

      // Create bounds including both current and destination locations
      const bounds = L.latLngBounds(currentLatLng, destLatLng);

      // Fit the map bounds to include both current and destination locations
      const map = mapRef.current?.leafletElement;
      if (map) {
        map.fitBounds(bounds);
      }
    }
  }, [currentLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleCloseMapButton = () => {
    setShowMapModal(true);
  };

  const openGoogleMaps = ()=>{
  const googleMapsUrl = `https://www.google.com/maps?q=${directions.latitude},${directions.longitue}`;
  window.open(googleMapsUrl, '_blank');
  }

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {distance !== null && (
        <div className="distance-info" style={{ marginBottom: '10px', display: 'inline-block' }}>
        <p className='mt-5 fs-5' style={{ display: 'inline-block' }}>Total Distance to destination: {distance} km</p>
        <Buttons
          className="ms-5 btn btn-primary mt-1 adMrBtnSrc"
          text="Close Map "
          onClick={()=>{handleCloseMapButton()}}
        />
        <Buttons
          className="ms-5 btn btn-primary mt-1 adMrBtnSrc"
          text="See On Google Maps "
          onClick={()=>{openGoogleMaps()}}
        />x
      </div>
      
      )}
      <MapContainer
        ref={mapRef}
        center={currentLocation || [31.5204, 74.3587]}
        zoom={13}
        className="leaflet-container"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentLocation && (
          <Marker position={currentLocation} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
