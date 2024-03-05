import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import markerIcon from '/icon-location.svg'

const Map = ({styles, coordinates}) => {
  const [map, setMap] = useState();

  const createMap = () => {
    if(!map) return;

    // Create a map instance
    map.setView([coordinates.lat, coordinates.long], 13);

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [26, 32], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    });
    const marker = L.marker([coordinates.lat, coordinates.long], {icon: customIcon}).addTo(map);

    const popupText = "<b>Hello!</b><br>This is a the IP location";

    marker.bindPopup(popupText);
  }


  useEffect(() => {
    const newMap = L.map('map');

    setMap(newMap);
  }, [])

  useEffect(
  () => {
    if(map){
      createMap();
    }
  }, [coordinates]); // Empty dependency array ensures the effect runs only once

  return (
    <div id="map" className={styles}></div>
  );
};

export default Map;