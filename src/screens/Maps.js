import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

export default class Map extends React.Component {
    componentDidMount()
    {
        this.map = L.map('map', {
            center: [25.8,-80.3],
            zoom: 12,
            zoomControl: false
        });
        L.polyline([
            [
                25.86373,
                -80.33116
            ],
            [
                25.86369,
                -80.33216
            ],
            [
                25.86363,
                -80.33226
            ],
            [
                25.86315,
                -80.3327
            ],
            [
                25.86275,
                -80.33311
            ],
            [
                25.86258,
                -80.33328
            ],
            [
                25.86291,
                -80.33372
            ],
            [
                25.86306,
                -80.33392
            ],
            [
                25.86327,
                -80.3342
            ],
            
        ], {color: 'red'}).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	        maxZoom: 19,
	        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
    render(){
        return<Wrapper width="1340px" height="780px" id="map"/>
    }
}