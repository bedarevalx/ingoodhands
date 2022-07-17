import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

export default function MapComponent(props) {
  const defaultPosition = props.coords; // Paris position
  console.log('Map updated', props.coords);
  const iconPerson = new L.Icon({
    iconUrl: require('../../markerIcon.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'leaflet-div-icon',
  });
  return (
    props.coords[0] &&
    props.coords[1] && (
      <div className='map__container'>
        <MapContainer center={defaultPosition} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={defaultPosition} icon={iconPerson}></Marker>
        </MapContainer>
      </div>
    )
  );
}
