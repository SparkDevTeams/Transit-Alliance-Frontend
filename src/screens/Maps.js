import React from "react";
import { Map, Marker, Popup, TileLayer, Polyline, Circle } from "react-leaflet";
import {Accordion, Card} from "react-bootstrap"
import { withRouter, Redirect } from "react-router-dom";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import {FiChevronRight} from "react-icons/fi";
import {FaWalking, FaBusAlt, FaClock, FaRoute, FaBus, FaHome} from "react-icons/fa";
import "../api/api";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selected: "home",
      currentStep: 0
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
    this.setState({newInfo: this.props.location.state?.newInfo, oldInfo: this.props.location.state?.oldInfo}, () => (console.log(this.state)));
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

    if (!this.state.newInfo && !this.props.location.state){
      return <Redirect to="/"></Redirect>;
    } 

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
          <Tab id="walk" header="Home" icon={<FaHome />}>

          <p>{this.state.currentStep}</p>
            <p>
              {this.state.newInfo?.time?.transitModes[this.state.currentStep - 1] == "WALK" ? ( <FaWalking />)  : ( <FaBus />)}
              {this.state.newInfo?.time?.transitModes[this.state.currentStep - 1] == "WALK" ? " Walk to "  : ( " Transfer to ")}
            </p>
            {this.state.newInfo?.legInfo?.map((info, idx) => (
              <>
              <p>{(info.currentLeg) == (this.state.currentStep) ? info.arrivalPlace : undefined}</p>
              <p>{(info.currentLeg) == (this.state.currentStep) ? "Arive by: " + info.arrivalTime : undefined}</p>
              </>
            ))}
            <input type="range" onChange={(e) => this.setState({currentStep : e.target.value})} min="1" max={this.state.newInfo?.time?.transitModes.length} />
            
            {this.state.newInfo?.legInfo?.map((info, idx) => (
              <Accordion defaultActiveKey="1">
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                <p>via {info.departurePlace} </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p><FaBusAlt/>  Depart from {info.departurePlace}</p>
                    <p><FaClock />  Estimated duration: {info.arrivalTime - info.departureTime} minutes</p>
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
                    ? "#" + info.routeColor
                    : "blue"
                }
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 8 : 5}
              />
              {idx === 0 ? null : (
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
                </>
              )}
              {idx === this.state.newInfo?.time.transitModes.length - 1 ? <Marker position={info.legPolyline[info.legPolyline.length - 1]}/> : null}
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
  }
}

export default withRouter(Maps);