
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import markerIcon from '../assets/icon-location.svg';

const myIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  popupAnchor:  [-0, -0],
  iconSize: [32,45],  
})

function Map({lat,lng}) {
  return (
    <MapContainer 
      style={{ height: '100%', width: '100%', overflow: 'hidden !important' }}
      center={[lat,lng]} 
      zoom={13} 
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      { (lat && lng) && (
          <Marker icon={myIcon} position={[lat,lng]}>
          <Popup>
            ISP location
          </Popup>
        </Marker>
      )} 

    </MapContainer>
  )
}

export default Map
