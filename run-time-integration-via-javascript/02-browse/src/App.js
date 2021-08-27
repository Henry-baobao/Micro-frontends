import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components/macro";
import Filters from "./Filters";
import RestaurantList from "./RestaurantList";

const defaultPriceRangeFilter = {
  $: false,
  $$: false,
  $$$: false,
  $$$$: false,
};

const defaultHistory = createBrowserHistory();

const MainColumn = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;

function App(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(defaultPriceRangeFilter);

  const setPriceRangeFilter = (range) => (checked) => {
    setPriceFilter((previousState) => {
      //console.log("set price: ", previousState, range, checked);
      return {
        ...previousState,
        [range]: checked,
      };
    });
  };

  const resetAllFilters = () => {
    setNameFilter("");
    setPriceFilter(defaultPriceRangeFilter);
  };

  useEffect(() => {
    const host = process.env.REACT_APP_CONTENT_HOST;
    fetch(`${host}/restaurants.json`)
      .then((result) => result.json())
      .then((res) => {
        const restaurantResult = res.map((restaurant) => ({
          ...restaurant,
          imageSrc: `${host}${restaurant.imageSrc}`,
        }));
        setRestaurants(restaurantResult);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <Router history={props.history || defaultHistory}>
      <MainColumn>
        <Filters
          name={nameFilter}
          priceRange={priceFilter}
          setNameFilter={setNameFilter}
          setPriceRangeFilter={setPriceRangeFilter}
          resetAll={resetAllFilters}
        />
      </MainColumn>
      <RestaurantList
        restaurants={restaurants}
        priceRangeFilter={priceFilter}
        nameFilter={nameFilter}
      />
    </Router>
  );
}

export default App;
