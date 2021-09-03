import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import RestaurantCard from "./RestaurantCard";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default function RestaurantList({
  restaurants,
  nameFilter,
  priceRangeFilter,
}) {
  const anyPriceSelected = Object.values(priceRangeFilter).some(
    (checked) => checked
  );

  const restaurantsInPriceRange = anyPriceSelected
    ? restaurants.filter(
        (restaurant) => priceRangeFilter[restaurant.priceRange]
      )
    : restaurants;

  const filteredRestaurants = restaurantsInPriceRange.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <CardContainer>
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </CardContainer>
  );
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  nameFilter: PropTypes.string.isRequired,
  priceRangeFilter: PropTypes.object.isRequired,
};
