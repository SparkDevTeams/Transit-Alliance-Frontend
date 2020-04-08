import React from 'react';
import Header from '../components/header';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'
import { Form, InputGroup, Button } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import API from '../api/api';
import {Container, Row, Col, Collapse } from 'react-bootstrap';
import {} from "react-icons/fa";
import { FaLocationArrow, FaCrosshairs } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


 class TripForm extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      carouselImages: [
        'bus-a.jpg',
        'bus-b.jpg'
      ],

      Origin: "",
      Destination: "",
      LeaveArrive: "Leave",
      tripMonth: this.state.startDate.getMonth(),
      tripDay: this.state.startDate.getDate(),
      tripYear: this.state.startDate.getFullYear(),
      tripHour: this.state.startDate.getHours() > 12 ? this.state.startDate.getHours() - 12 : this.state.startDate.getHours(),
      tripMinute: this.state.startDate.getMinutes(),
      tripAMPM: this.state.startDate.getHours() >= 12 ? "PM" : "AM",
      timeInfo: [],
      tripInfo: [],
      completeInfo: [],
      optimize: "QUICK",
      maxWalkDistance: "1"
    }
  }
  state = {
    collapseID: "",
    startDate: new Date()
   };
   
   handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  changeInput = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  submitHandle = async (event) => {
    event.preventDefault();

    let query = {
      fromPlace: this.state.Origin,
      toPlace: this.state.Destination,
      startTime: `${this.state.tripHour}:${this.state.tripMinute}${this.state.tripAMPM}`,
      startDate: `${this.state.tripMonth}-${this.state.tripDay}-${this.state.tripYear}`,
      arriveBy: this.state.LeaveArrive === 'Leave' ? 'false' : 'true',
      optimize: this.state.optimize,
      maxWalkDistance: `${this.state.maxWalkDistance}`
    }

    let response = await API.getTripInfo(query);
    this.props.history.push(
        {
            pathname: '/maps', 
            state : {
                oldInfo: response.oldResponse, 
                newInfo: response.prototypeResponse,
            }
        }
    );
  }
  showPosition = (position) =>
  {
    this.setState({['Origin']: [position.coords.latitude, position.coords.longitude]})
  }

  render() {
    let settings = {
      dots: false,
      autoplay: true,
      infinite: true,
      arrows: true,
      speed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1   
    }
    let { carouselImages, months, Origin, Destination, LeaveArrive, tripYear, tripMonth, tripDay, tripHour, tripMinute, tripAMPM, optimize, maxWalkDistance} = this.state;
    return (
      <React.Fragment>
        <div id="classicformpage">
          <div className="form-container">
            <Form onSubmit={($event) => this.submitHandle($event)}>
              <div className="form-content">
                <Form.Group>
                  <h2 className="text-center">PLAN YOUR TRIP</h2>
                </Form.Group>

                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend"><FaLocationArrow /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder="Ex. Florida International University"
                      type="text" name="Origin"
                      value={Origin}
                      onChange={($event) => this.changeInput('Origin', $event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Control 
                    placeholder="Where do you want to go?" 
                    type="text" 
                    name="Destination" 
                    value={Destination} onChange={($event) => this.changeInput('Destination', $event.target.value)} 
                  />
                </Form.Group>

                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => this.setState({ showText: !this.state.showText })}
                >
                  Advanced Options
                </Button>
                <Button  
                  variant="outline-primary"  
                  size="sm" 
                  onClick={() => navigator.geolocation.getCurrentPosition(this.showPosition)}
                >
                  Locate (Needs testing)
                </Button>

                <Collapse in={this.state.showText}>
                  <div>
                    <span>
                      <Form.Group>
                        <div className="custom-inline-checkbox">
                          <Form.Check 
                            custom inline type="radio" 
                            name="LeaveArrive" 
                            label="LEAVE" 
                            value="LEAVE" 
                            id="custom-checkbox-1" 
                            onChange={($event) => this.changeInput('LeaveArrive', $event.target.value)} 
                            checked={LeaveArrive === "LEAVE"} 
                            />
                          <Form.Check 
                            custom inline type="radio" 
                            name="LeaveArrive" 
                            label="ARRIVE" 
                            value="ARRIVE" 
                            id="custom-checkbox-2" 
                            onChange={($event) => this.changeInput('LeaveArrive', $event.target.value)} 
                            checked={LeaveArrive === "ARRIVE"} 
                          />
                        </div>
                      </Form.Group>

                      <Form.Group>
                        <div className="custom-inline-checkbox2">
                          <Form.Check 
                            custom inline type="radio" 
                            name="optimize" 
                            label="QUICK" 
                            value="QUICK" 
                            id="custom-checkbox-3" 
                            onChange={($event) => this.changeInput('optimize', $event.target.value)} 
                            checked={optimize === "QUICK"} 
                          />
                          <Form.Check 
                            custom inline type="radio" 
                            name="optimize" 
                            label="TRANSFERS" 
                            value="TRANSFERS" 
                            id="custom-checkbox-4" 
                            onChange={($event) => this.changeInput('optimize', $event.target.value)} 
                            checked={optimize === "TRANSFERS"} 
                          />
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Max Walk Distance:</Form.Label>
                        <InputGroup>
                          <Form.Control 
                            as="select" 
                            name="maxWalkDistance" 
                            value={maxWalkDistance} 
                            onChange={($event) => this.changeInput('maxWalkDistance', $event.target.value)}>
                              {[...Array(12)].map((hour, idx) => 
                              <option 
                                value={idx + 1} 
                                key={idx}>
                                  {idx < 9 ? '0' + (idx + 1) : idx + 1}
                              </option>)}
                          </Form.Control>
                        </InputGroup>
                      </Form.Group>
                      
                      <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    
                    </span>
                  </div>
                </Collapse>
              </div>

              <Form.Group className="text-center mt-4">
                <Button type="submit" variant="success" size="lg" id="trip_plan_btn">GO</Button>
              </Form.Group>
            </Form>
          </div>

        <Header/>     
                
        </div>
      </React.Fragment>
    )
  }
}



export default withRouter(TripForm);