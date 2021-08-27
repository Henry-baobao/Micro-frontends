import React, { Component } from "react";
import PropTypes from "prop-types";

export default class MicroFrontendComponent extends Component {
  constructor(props) {
    super(props);
    this.renderMicroFrontend = this.renderMicroFrontend.bind(this);
    this.addScript = this.addScript.bind(this);
  }

  renderMicroFrontend() {
    const { name, history } = this.props;
    if (Object.keys(window).includes(`render${name}`)) {
      window[`render${name}`](`${name}-container`, history);
    } else {
      setTimeout(() => {
        window[`render${name}`](`${name}-container`, history);
      }, 100);
    }
  }

  addScript(src, id) {
    const { document } = this.props;
    const script = document.createElement("script");
    script.id = id;
    script.crossOrigin = "";
    script.src = src;
    const result = document.head.appendChild(script);
    if (id.includes("2")) {
      script.onload = this.renderMicroFrontend;
    }
  }

  componentDidMount() {
    const { name, host, document, window } = this.props;
    //console.log("component did mount: ", name);

    if (document.getElementById(`${name}-2`)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const files = manifest.entrypoints;
        files.forEach((file, index) =>
          this.addScript(`${host}/${file}`, `${name}-${index}`)
        );
      });
  }

  componentWillUnmount() {
    const { name } = this.props;
    //console.log("component will unmount: ", name);
    window[`unmount${name}`](`${name}-container`);
  }

  render() {
    //console.log("render component");
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontendComponent.defaultProps = {
  document,
  window,
};
