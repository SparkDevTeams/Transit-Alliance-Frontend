import React from 'react';
import Header from '../components/header';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'
import { Form, InputGroup, Button } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import API from '../api/api';
 class TripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselImages: [
        'bus-a.jpg',
        'bus-b.jpg'
      ],
      months: [
        {
          label: "January", value: 1
        }, {
          label: "February", value: 2
        }, {
          label: "March", value: 3
        }, {
          label: "April", value: 4
        }, {
          label: "May", value: 5
        }, {
          label: "June", value: 6
        }, {
          label: "July", value: 7
        }, {
          label: "August", value: 8
        }, {
          label: "September", value: 9
        }, {
          label: "October", value: 10
        }, {
          label: "November", value: 11
        }, {
          label: "December", value: 12
        }
      ],
      Origin: "",
      Destination: "",
      LeaveArrive: "Leave",
      tripMonth: "1",
      tripDay: "1",
      tripYear: "2020",
      tripHour: "1",
      tripMinute: "1",
      tripAMPM: "am",
      timeInfo: [],
      tripInfo: [],
      completeInfo: [],
      optimize: "QUICK",
      maxWalkDistance: "5"
    }
  }

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
        <Header/>
        <div className="home-container">
          <Slider {...settings}>
            {
              carouselImages.map((carouselImage, idx) => {
                return (
                  <div key={idx}>
                    <img src={require(`../assets/images/${carouselImage}`)} alt="img"/>
                  </div>
                )
              })
            }
          </Slider>
          <div className="form-container">
            <Form onSubmit={($event) => this.submitHandle($event)}>
              <div className="form-content">
                <Form.Group>
                  <h2 className="text-center">Plan your trip</h2>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Origin:</Form.Label>
                  <Form.Control type="text" name="Origin" value={Origin} onChange={($event) => this.changeInput('Origin', $event.target.value)}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Destination:</Form.Label>
                  <Form.Control type="text" name="Destination" value={Destination} onChange={($event) => this.changeInput('Destination', $event.target.value)}/>
                </Form.Group>
                <Form.Group>
                  <div className="custom-inline-checkbox text-center">
                    <Form.Check custom inline type="radio" name="LeaveArrive" label="Leave" value="Leave" id="custom-checkbox-1" onChange={($event) => this.changeInput('LeaveArrive', $event.target.value)} checked={LeaveArrive === "Leave"}/>
                    <Form.Check custom inline type="radio" name="LeaveArrive" label="Arrive" value="Arrive" id="custom-checkbox-2" onChange={($event) => this.changeInput('LeaveArrive', $event.target.value)} checked={LeaveArrive === "Arrive"}/>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="custom-inline-checkbox2 text-center">
                    <Form.Check custom inline type="radio" name="optimize" label="QUICK" value="QUICK" id="custom-checkbox-3" onChange={($event) => this.changeInput('optimize', $event.target.value)} checked={optimize === "QUICK"}/>
                    <Form.Check custom inline type="radio" name="optimize" label="TRANSFERS" value="TRANSFERS" id="custom-checkbox-4" onChange={($event) => this.changeInput('optimize', $event.target.value)} checked={optimize === "TRANSFERS"}/>
                  </div>
                  </Form.Group>
                  <Form.Label>Max Walk Distance:</Form.Label>
                  <InputGroup>
                  <Form.Control as="select" name="maxWalkDistance" value={maxWalkDistance} onChange={($event) => this.changeInput('maxWalkDistance', $event.target.value)}>
                      {[...Array(12)].map((hour, idx) => <option value={idx+1} key={idx}>{idx < 9 ? '0' + (idx + 1) : idx + 1}</option>)}
                    </Form.Control>
                  </InputGroup>
                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <InputGroup>
                    <Form.Control as="select" name="tripMonth" value={tripMonth} onChange={($event) => this.changeInput('tripMonth', $event.target.value)}>
                      {months.map((month, idx) => <option value={month.value} key={idx}>{month.label}</option>)}
                    </Form.Control>
                    <Form.Control as="select" name="tripDay" value={tripDay} onChange={($event) => this.changeInput('tripDay', $event.target.value)}>
                      {[...Array(31)].map((date, idx) => <option value={idx+1} key={idx}>{idx < 9 ? '0' + (idx + 1) : idx + 1}</option>)}
                    </Form.Control>
                    <Form.Control as="select" name="tripYear" value={tripYear} onChange={($event) => this.changeInput('tripYear', $event.target.value)}>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time:</Form.Label>
                  <InputGroup>
                    <Form.Control as="select" name="tripHour" value={tripHour} onChange={($event) => this.changeInput('tripHour', $event.target.value)}>
                      {[...Array(12)].map((hour, idx) => <option value={idx+1} key={idx}>{idx < 9 ? '0' + (idx + 1) : idx + 1}</option>)}
                    </Form.Control>
                    <Form.Control as="select" name="tripMinute" value={tripMinute} onChange={($event) => this.changeInput('tripMinute', $event.target.value)}>
                      {[...Array(60)].map((minute, idx) => <option value={idx+1} key={idx}>{idx < 9 ? '0' + (idx + 1) : idx + 1}</option>)}
                    </Form.Control>
                    <Form.Control as="select" name="tripAMPM" value={tripAMPM} onChange={($event) => this.changeInput('tripAMPM', $event.target.value)}>
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
              </div>

                <Form.Group className="text-center mt-4">
                    <Button type="submit" variant="success" size="lg" id="trip_plan_btn">GO</Button>
                </Form.Group>

            </Form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}



export default withRouter(TripForm);