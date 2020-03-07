import React from 'react';
import Header from './components/header';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import TripForm from './TripForm'
import Map from './screens/Maps'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/maps">
            <Map />
          </Route>
          <Route path="/">
            <TripForm />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
