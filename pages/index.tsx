import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr"; // Handle data loading / error / successful states
import fetcher from "../lib/fetcher";
import { useState, useRef } from "react";
import DataCard from "../components/DataCard";
import HomeCard from "../components/HomeCard";
import Stars from "../components/Stars";
import Layers from "../components/Layers";
import React from "react";
import Legend from "../components/Legend";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoidXNrb21wdWYiLCJhIjoiY2pnZzJvcHR4MDl0czJ4cW0zZTAxYnY5ZiJ9.EtWLN3Q74QDC6PpFDsvFig";

const Home: NextPage = () => {
  // When postcode is searched via the box or by clicking, set value to postcode
  const [postcode, setPostcode] = useState(null);
  const [dataVisible, setDataVisible] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [layer, setLayer] = useState(null);
  const [mapLayer, setMapLayer] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef();
  const geocoder = useRef();
  const search = useRef();

  const updateMapLayer = (state) => {
    setMapLayer(state);
  };

  // Postcode search logic
  useEffect(() => {
    // Prevent hook from running on initial render
    if (postcode !== null) {
      // Return data card
      setDataVisible(true);
    }
  }, [postcode]);

  useEffect(() => {
    // Initialise map
    map.current = new mapboxgl.Map({
      // Map controls
      // Use our data visualisation with postcode boundaries, etc.
      style: "mapbox://styles/uskompuf/cl01t9qd2008m14p7zm4bgg9d/draft",
      // Center map to Sydney
      center: [151.209, -33.8688],
      // Zoom out a bit
      zoom: 12.5,
      // Pitch map a bit for '3D' effect
      pitch: 30,
      // bearing: -17.6,
      container: mapContainer.current,
    });

    // Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl()
    );

    // Intitialise search input
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      // Limit search country to Australia
      countries: "au",
      // Limit search types to postcode / suburb
      types: "postcode",
      container: search.current,
    });
  }, []);

  useEffect(() => {
    // Initialise address search input
    // Position geocoder to top left of map on first render
    if (firstRender == true) {
      map.current.addControl(new mapboxgl.NavigationControl());
      document
        .getElementById("search")
        .appendChild(geocoder.current.onAdd(map.current));
    }

    // Update postcode on click
    map.current.on("click", "postcodesBase", (e) => {
      if (e.features.length > 0) {
        setPostcode(e.features[0].properties.POA_CODE21);
      }
    });

    // Set selected postcode to all polygons for selective styling
    map.current.on("mousemove", "postcodesBase", (e) => {
      if (e.features.length > 0) {
        var features = map.current.querySourceFeatures("composite", {
          sourceLayer: "final",
        });
        for (const feature of features) {
          var id = feature.id;
          map.current.setFeatureState(
            { source: "composite", id: id, sourceLayer: "final" },
            { selectedPostcode: e.features[0].properties.POA_CODE21 }
          );
        }
      }
    });

    // Reset selected postcode when cursor leaves map
    map.current.on("mouseleave", "postcodesBase", () => {
      var features = map.current.querySourceFeatures("composite", {
        sourceLayer: "final",
      });
      for (const feature of features) {
        var id = feature.id;
        map.current.setFeatureState(
          { source: "composite", id: id, sourceLayer: "final" },
          { selectedPostcode: null }
        );
      }
    });

    // When postcode is searched, return data in card
    geocoder.current.on("result", function (result) {
      setPostcode(result.result.text);
    });
  });

  // Toggle map layers
  useEffect(() => {
    if (mapLayer == 1) {
      map.current.setLayoutProperty("postcodesSolar", "visibility", "none");
      map.current.setLayoutProperty("postcodesDensity", "visibility", "none");
      map.current.setLayoutProperty("postcodesClimate", "visibility", "none");
    } else if (mapLayer == 2) {
      // Set layer - households with solar
      map.current.setLayoutProperty("postcodesSolar", "visibility", "visible");
      map.current.setLayoutProperty("postcodesDensity", "visibility", "none");
      map.current.setLayoutProperty("postcodesClimate", "visibility", "none");
    } else if (mapLayer == 3) {
      // Set layer - dwelling density
      map.current.setLayoutProperty(
        "postcodesDensity",
        "visibility",
        "visible"
      );
      map.current.setLayoutProperty("postcodesSolar", "visibility", "none");
      map.current.setLayoutProperty("postcodesClimate", "visibility", "none");
      // Set layer - climate zones
    } else if (mapLayer == 4) {
      map.current.setLayoutProperty(
        "postcodesClimate",
        "visibility",
        "visible"
      );
      map.current.setLayoutProperty("postcodesSolar", "visibility", "none");
      map.current.setLayoutProperty("postcodesDensity", "visibility", "none");
    }
  });

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>UNIHACK '22'</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative overflow-hidden">
        {/* TODO: Change searchbar width to width of below cards */}
        <div className="absolute z-40 flex mx-6 my-4 w-max h-max" id="search" />
        <div className="absolute z-40 top-[152px] right-[9px]">
          <Layers mapLayer={mapLayer} triggerParentUpdate={updateMapLayer} />
        </div>

        {dataVisible === true && <DataCard postcode={postcode} />}
        {dataVisible === false && <HomeCard />}

        <Legend mapLayer={mapLayer} />


        <div ref={mapContainer} className="w-screen h-screen" />
      </main>
    </div>
  );
};

export default Home;
