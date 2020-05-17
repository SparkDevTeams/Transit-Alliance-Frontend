import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import TripForm from './screens/TripForm'
import Map from './screens/Maps'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <Router basename="/">
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
