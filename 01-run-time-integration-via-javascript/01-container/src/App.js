import React from "react";
import "./App.css";
import AppHeader from "./AppHeader";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import About from "./About";
import MicroFrontend from "./MicroFrontend";
import MicroFrontendComponent from "./MicroFrontendComponent";

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost,
} = process.env;

let numRestaurants = 0;
fetch(`${process.env.REACT_APP_CONTENT_HOST}/restaurants.json`)
  .then((res) => res.json())
  .then((restaurants) => {
    numRestaurants = restaurants.length;
  });

const getRandomId = () => Math.floor(Math.random() * numRestaurants) + 1;

const Random = () => <Redirect to={`/restaurant/${getRandomId()}`} />;

const Browse = ({ history }) => (
  <MicroFrontendComponent name="Browse" host={browseHost} history={history} />
);

const Restaurant = ({ history }) => (
  <MicroFrontendComponent name="Restaurant" host={restaurantHost} history={history} />
);

function App() {
  //console.log('app')
  return (
    <BrowserRouter>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/restaurant/:id" component={Restaurant} />
        <Route exact path="/recommends" component={Random} />
        <Route exact path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
