/* eslint-disable react/prop-types */

import { useRef, useEffect } from "react";

export default function Map({ className, style, center, zoom }) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {center: center, zoom: zoom });

    new window.google.maps.Marker({ position: center, map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
}


// resolver isso com forwardref 