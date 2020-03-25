import React from "react";
import { Map, Marker, Popup, TileLayer, Polyline, Circle } from "react-leaflet";
import {Accordion, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import styled from "styled-components";
import { withRouter, Redirect } from "react-router-dom";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import {FiChevronRight, FiSettings} from "react-icons/fi";
import {FaWalking, FaBusAlt, FaClock, FaRoute} from "react-icons/fa";
import "../api/api";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selected: "home"
    };
  }

  onClose() {
    this.setState({ collapsed: true });
  }
  onOpen(id) {
    this.setState({
      collapsed: false,
      selected: id
    });
  }

  componentDidMount(){
    console.log("mount");
    this.setState({newInfo: this.props.location.state?.newInfo, oldInfo: this.props.location.state?.oldInfo});
  }
  
  render() {
    var colorArray = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#E6B3B3",
      "#6680B3",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF"
    ];
    //map position
    var position = [25.8, -80.3];
    var zoomLevel = 12;

    /*if (!this.state.newInfo && !this.props.location.state){
      return <Redirect to="/"></Redirect>;
    } */

    return (
      <div>
        <Sidebar
          id="sidebar"
          position="right"
          collapsed={this.state.collapsed}
          closeIcon={<FiChevronRight />}
          selected={this.state.selected}
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          {/*<Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              </Form>
            </Navbar.Collapse>
          </Navbar> */}
          <Tab id="walk" header="Walk/Bus" icon={<FaBusAlt />}>
            {this.state.newInfo?.legInfo?.map((info, idx) => (
              <Accordion defaultActiveKey="1">
              <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
              <p>via {info.departurePlace} </p>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>Current Leg: {info.currentLeg}</p>
                  <p>Transit Mode: <FaWalking /> {info.transitMode}</p>
                  <p>Leg Duration: {info.legDuration}</p>
                  <p>Route: {info.route}</p>
                  <p>Route ID: {info.routeID}</p>
                  <p>Route Color: {info.routeColor}</p>
                  <p>Departure Place: {info.departurePlace}</p>
                  <p>Departure Time: <FaClock /> {info.departureTime}</p>
                  <p>Arrival Place: {info.arrivalPlace}</p>
                  <p>Arrival Time: {info.arrivalTime}</p>
                </Card.Body>
              </Accordion.Collapse>
              </Card>
            </Accordion>
            ))}
          </Tab>
        </Sidebar>

        <Map center={position} zoom={zoomLevel}>
          {/*Adds a border around the Polyline */}
          {this.state.newInfo?.legInfo?.map((info, idx) => (
            <>
              <Polyline
                positions={info.legPolyline}
                color={"black"}
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 9 : 6}
              />
              <Polyline
                positions={info.legPolyline}
                color={
                  info.transitMode === "BUS"
                    ? colorArray[Math.floor(Math.random() * colorArray.length)]
                    : "blue"
                }
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 8 : 5}
              />
              {idx === 0 ? <Marker position={info.legPolyline[0]}/> : (
                <>
                  <Circle
                    center={info.legPolyline[0]}
                    radius={20}
                    color={"black"}
                    weight={9}
                  />
                  <Circle
                    center={info.legPolyline[0]}
                    radius={20}
                    fillColor={"lightgrey"}
                    fillOpacity={1}
                    weight={2}
                    color={"grey"}
                  />
                  {   }
                </>
              )}
            </>
          ))}

          {this.state.oldInfo?.legInfo?.map((info, idx) => (
            <>
              <Polyline
                positions={info.legPolyline}
                color={"black"}
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 9 : 6}
              />
              <Polyline
                positions={info.legPolyline}
                color={
                  info.transitMode === "BUS"
                    ? colorArray["grey"]
                    : "grey"
                }
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 8 : 5}
              />
              </>
              ))}
          {/*this.props.location.state?.newInfo?.completePolyline.map(line => <Polyline positions={line} color={colorArray[Math.floor(Math.random() * colorArray.length)]}/>)*/}
          {/* <Polyline positions={this.props.location.state.newInfo.completePolyline} /> */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
    this.setState({lat: 25.8, long: 200})
  }
}

export default withRouter(Maps);