import React, { useState, useEffect, useRef } from "react";
import { Map, Marker, Popup, TileLayer, Polyline, Circle } from "react-leaflet";
import { Accordion, Card } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import { FiChevronRight } from "react-icons/fi";
import {
  FaWalking,
  FaBusAlt,
  FaClock,
  FaRoute,
  FaBus,
  FaHome
} from "react-icons/fa";
import Slider from "../components/Slider/Slider";
import "../api/api";

const Maps = (props) => 
{

  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState('home');
  const [currentStep, setCurrentStep] = useState(0);
  const [newInfo, setNewInfo] = useState(props.location?.state?.newInfo);
  const [oldInfo, setOldInfo] = useState(props.location?.state?.oldInfo);
  const [currentStepInfo, setCurrentStepInfo] = useState(newInfo?.legInfo?.[currentStep]);


  const mapRef = useRef();

  const onClose = () => {
    setCollapsed(true);
  }

  const onOpen = (id) => {
    setCollapsed(false);
    setSelected(id);
  }

  useEffect(() => {
    setCurrentStepInfo(newInfo?.legInfo?.[currentStep]);
    if(mapRef.current){
      mapRef.current.leafletElement.panTo(newInfo?.legInfo?.[currentStep].legPolyline[0]);
    }
    
  }, [currentStep, newInfo, mapRef]);

    //map position
    var position = [25.8, -80.3];
    var zoomLevel = 12;

    if (!newInfo && !props.location.state) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <div>
        <Sidebar
          id="sidebar"
          position="right"
          collapsed={collapsed}
          closeIcon={<FiChevronRight />}
          selected={selected}
          onOpen={onOpen}
          onClose={onClose}
        >
          <Tab id="walk" header="Home" icon={<FaHome />}>
            <>
              <Slider
                step={currentStepInfo}
                length={newInfo?.legInfo?.length}
                setStep={value => setCurrentStep(value)}
                currentStep={currentStep}
              />
              
              <p>Arrive at {(new Date(newInfo?.legInfo?.[newInfo?.legInfo?.length - 1].arrivalTime)).getHours() - 12}:
                {(new Date(newInfo?.legInfo?.[newInfo?.legInfo?.length - 1].arrivalTime)).getMinutes() < 10 ? '0' : ''}
                {(new Date(newInfo?.legInfo?.[newInfo?.legInfo?.length - 1].arrivalTime)).getMinutes()}
                {(new Date(newInfo?.legInfo?.[newInfo?.legInfo?.length - 1].arrivalTime)).getHours() >= 12 ? " PM" : " AM"} 
              </p>
              
              {newInfo?.legInfo?.map((info, idx) => (
                <>
                <Accordion activeKey={`${currentStep}`}>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={`${idx}`}>
                      <p>via {info.departurePlace}</p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${idx}`}>
                      <Card.Body>
                        <p>
                          <FaBusAlt /> Depart from {info.departurePlace}
                        </p>
                        <p>
                          <FaClock /> Estimated duration:{" "}
                            {((info.arrivalTime - info.departureTime) / 1000) / 60} minutes
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </>
              ))}
            </>
          </Tab>
        </Sidebar>

        <Map center={position} zoom={zoomLevel} ref={mapRef}>
        {oldInfo?.legInfo?.map((info, idx) => (
          <>
              <Polyline
                positions={info.legPolyline}
                color={"black"}
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 9 : 6}
                opacity={.4}
              />
              <Polyline
                positions={info.legPolyline}
                color={info.transitMode === "BUS" ? "grey" : "grey"}
                dashArray={info.transitMode === "WALK" ? "1,10" : undefined}
                weight={info.transitMode === "BUS" ? 8 : 5}
                opacity={.6}
              >
                <Popup>
                      <FaBusAlt/> {((info.arrivalTime - info.departureTime) / 1000) / 60} minutes
                </Popup>
              </Polyline>
            </>
          ))}
          
          {/*Adds a border around the Polyline */}
          {newInfo?.legInfo?.map((info, idx) => (
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
                  info.transitMode === "BUS" ? "#" + info.routeColor : "blue"
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
                    weight={18}
                    onClick={() => setCurrentStep(idx)}
                  />
                  <Circle
                    center={info.legPolyline[0]}
                    radius={20}
                    fillColor={"lightgrey"}
                    fillOpacity={1}
                    weight={16}
                    color={"grey"}
                    onClick={() => setCurrentStep(idx) }
                  >
                    {/* <Popup>
                      <FaBusAlt/> {info.departurePlace}
                    </Popup> */}
                  </Circle>
                </>
              )}
              {idx === newInfo?.time.transitModes.length - 1 ? (
                <Marker
                  position={info.legPolyline[info.legPolyline.length - 1]}
                />
              ) : null}
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

export default withRouter(Maps);