import React from 'react';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet'
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import "../api/api";

class Maps extends React.Component {
    render(){
        if(!this.props.location.state){
            return <Redirect to="/"></Redirect>
        }
        
        return<Map center={[25.8,-80.3]} zoom={12}>
            <Polyline  positions={this.props.location.state.completeInfo}  />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /></Map>
    }
}

export default withRouter(Maps);