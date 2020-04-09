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
import "../components/DatePicker/customDatePickerWidth.css";


 class TripForm extends React.Component {
  constructor(props) {

    super(props);
    const currentDate = new Date();
    this.state = {
      carouselImages: [
        'bus-a.jpg',
        'bus-b.jpg'
      ],

      Origin: "",
      Destination: "",
      LeaveArrive: "Leave",
      startDate: currentDate,
      tripMonth: currentDate.getMonth() + 1,
      tripDay: currentDate.getDate(),
      tripYear: currentDate.getFullYear(),
      tripHour: currentDate.getHours() > 12 ? currentDate - 12 : currentDate.getHours(),
      tripMinute: currentDate.getMinutes(),
      tripAMPM: currentDate.getHours() >= 12 ? "PM" : "AM",
      timeInfo: [],
      tripInfo: [],
      completeInfo: [],
      optimize: "QUICK",
      maxWalkDistance: "1",
      collapseID: "",
    }
  }
   
   handleChange = date => {
    this.setState({
      startDate: date,
      tripMonth: date.getMonth() + 1,
      tripDay: date.getDate(),
      tripYear: date.getFullYear(),
      tripHour: date.getHours() > 12 ? date - 12 : date.getHours(),
      tripMinute: date.getMinutes(),
      tripAMPM: date.getHours() >= 12 ? "PM" : "AM",
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
    console.log(this.state.startDate)
    let query = {
      fromPlace: this.state.Origin,
      toPlace: this.state.Destination,
      startTime: `${this.state.tripHour}:${this.state.tripMinute}${this.state.tripAMPM}`,
      startDate: `${this.state.tripMonth.toString().padStart(2, '0')}-${this.state.tripDay.toString().padStart(2, '0')}-${this.state.tripYear}`,
      arriveBy: this.state.LeaveArrive === 'Leave' ? 'false' : 'true',
      optimize: this.state.optimize,
      maxWalkDistance: `${this.state.maxWalkDistance}`
    }
    console.log(query);
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
    let { carouselImages, Origin, Destination, LeaveArrive, optimize, maxWalkDistance} = this.state;
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


                      <p>Date and Time:</p>
                      <div className="customDatePickerWidth">
                        <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        />
                      </div>
                    
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