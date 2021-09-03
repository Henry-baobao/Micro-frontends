import React, { useEffect, useLayoutEffect } from "react";

function MicroFrontend(props) {
  const renderMicroFrontend = () => {
    const { name, history } = props;
    //first register function, then invoke
    //if function has been register, invoke directly
    if (Object.keys(window).includes(`render${name}`)) {
      window[`render${name}`](`${name}-container`, history);
    } else {
      setTimeout(() => {
        window[`render${name}`](`${name}-container`, history);
      }, 100);
    }
  };

  const addScript = (src, id) => {
    const { document } = props;
    const script = document.createElement("script");
    script.id = id;
    script.crossOrigin = "";
    script.src = src;
    const result = document.head.appendChild(script);
    if (id.includes("2")) {
      script.onload = renderMicroFrontend;
    }
  };

  //difference between useEffect and useLayoutEffect
  //useEffect: the function passed to useEffect fires after layout and paint
  //useLayoutEffect: it fires synchronously after all DOM mutations, before the browser has a chance to paint
  //DOM mutation should fire before next paint, in this example, window.unmountBrowse should invoke before main container changed
  useLayoutEffect(() => {
    const { name, host, document, window } = props;
    // console.log("mount function component: ", name);

    if (document.getElementById(`${name}-2`)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        //console.log("mainfest: ", manifest);
        const files = manifest.entrypoints;
        files.forEach((file, index) =>
          addScript(`${host}/${file}`, `${name}-${index}`)
        );

        // addScript(`${host}${manifest.files["main.js"]}`, `${name}-main.js`)
        // const script = document.createElement("script");
        // script.id = scriptId;
        // script.crossOrigin = "";
        // script.src = ;
        // script.onload = renderMicroFrontend;
        // const result = document.head.appendChild(script);
      });

    return () => {
      // console.log("unmount function component: ", name);
      window[`unmount${name}`](`${name}-container`);
    };
  }, []);

  // console.log("render function component");
  return <main id={`${props.name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
