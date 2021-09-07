import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Card = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 350px;
  margin: 0 5px;
`;

const CardTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CardTitle = styled.h2``;

const PriceRange = styled.span`
  font-size: 20px;
`;

const Img = styled.img`
  width: 100%；;
`;

const Description = styled.p`
  margin-top: 5px;
  font-size: 20px;
`;

export default function RestaurantCard({ restaurant }) {
  return (
    <Card>
      <StyledLink to={`/restaurant/${restaurant.id}`}>
        <CardTitleRow>
          <CardTitle>{restaurant.name}</CardTitle>
          <PriceRange>{restaurant.priceRange}</PriceRange>
        </CardTitleRow>
        <Img src={restaurant.imageSrc} alt={restaurant.imageDescription} />
        <Description>{restaurant.description}</Description>
      </StyledLink>
    </Card>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    imageDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
