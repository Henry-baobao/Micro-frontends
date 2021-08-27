import React, { useEffect, useState } from "react";
import RestaurantDetail from "./RestaurantDetail";

export default function Restaurant(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const host = process.env.REACT_APP_CONTENT_HOST;
    const id = props.match.params.id;
    fetch(`${host}/restaurants/${id}.json`)
      .then((res) => res.json())
      .then((result) => {
        setRestaurant({
          ...result,
          imageSrc: `${host}${result.imageSrc}`,
        });
        setLoading(false);
      })
      .catch((err) => {
        //console.log("error");
        setError(true);
        setLoading(false);
      });
  }, []);

  //console.log("render restaurant");
  if (loading) {
    return "Loading";
  }
  if (error) {
    return "Sorry, but that restaurant is currently unavailable.";
  }
  return <RestaurantDetail {...restaurant} />;
}
