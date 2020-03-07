import React from 'react';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
//import "./src/app";

class Maps extends React.Component {
    
    render(){
        return<Map center={[25.8,-80.3]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /></Map>
    }
}

export default withRouter(Maps);