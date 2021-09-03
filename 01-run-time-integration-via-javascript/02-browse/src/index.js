import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
console.log("register renderBrowse");

window.renderBrowse = (containerId, history) => {
  console.log('render browse: ', containerId)
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId)
  );
};

window.unmountBrowse = (containerId) => {
  console.log("unmount browse: ", containerId);
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
