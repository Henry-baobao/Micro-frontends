import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

console.log('register renderRestaurant')
window.renderRestaurant = (containerId, history) => {
  console.log('render restaurant: ', containerId)
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId)
  );
};

window.unmountRestaurant = (containerId) => {
  console.log("unmount restaurant: ", containerId);
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
