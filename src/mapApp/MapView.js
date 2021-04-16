import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position = [57.772360, 40.935160];

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 57.772360, lng: 40.935160 },
      zoom: 12,
    }
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <MapContainer center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        <Marker position={position}>
          <Popup>
            Просто Popup
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default MapView;