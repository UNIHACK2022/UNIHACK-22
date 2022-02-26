import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import useSWR from 'swr' // Handle data loading / error / successful states
import fetcher from "../lib/fetcher";
import { useState, useRef } from "react";
import DataCard from "../components/DataCard";
import HomeCard from "../components/HomeCard";
import Stars from "../components/Stars";
import Layers from "../components/Layers";
import React from "react";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// TODO: Hide access token in environmental variable
mapboxgl.accessToken = 'pk.eyJ1IjoidXNrb21wdWYiLCJhIjoiY2pnZzJvcHR4MDl0czJ4cW0zZTAxYnY5ZiJ9.EtWLN3Q74QDC6PpFDsvFig';

const Home: NextPage = () => {

  // When postcode is searched via the box or by clicking, set value to postcode
  const [postcode, setPostcode] = useState(null);
  const [dataVisible, setDataVisible] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [layer, setLayer] = useState(null);
  const [mapLayer, setMapLayer] = useState('');
  const map = useRef();

  const updateMapLayer = (state) => {
    setMapLayer(state);
  }


  // Postcode search logic
  useEffect(() => {
    // Prevent hook from running on initial render
    if (postcode !== null) {
      console.log("Postcode search triggered")
      console.log(`The postcode you searched for is ${postcode}`)
      // Return data card
      setDataVisible(true);
      
    }
  }, [postcode])


  useEffect(() => {
    map = new mapboxgl.Map({
      // Map controls
      // Use our data visualisation with postcode boundaries, etc.
      style: 'mapbox://styles/uskompuf/cl01t9qd2008m14p7zm4bgg9d/draft',
      // Center map to Sydney
      center: [151.209, -33.8688],
      // Zoom out a bit
      zoom: 12.5,
      // Pitch map a bit for '3D' effect
      pitch: 30,
      // bearing: -17.6,
      container: 'mapbox'
      });  

      // Initialise address search input
      map.addControl(new mapboxgl.NavigationControl())

      // Return location that user searches for
      // TODO: Make this return suburb, etc to hook up to data

      // Initialise search input
      const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          // Limit search country to Australia
          countries: "au",
          // Limit search types to postcode / suburb
          types: "postcode",
      })

      // Position geocoder to top left of map on first render
      if (firstRender == true) {
        document.getElementById('container').appendChild(geocoder.onAdd(map));
      }


        // map.on('load', function () {
    //map.setLayoutProperty('final-dyqn3f (6)', 'visibility', 'none'); // %Households with solar
    //map.setLayoutProperty('final-dyqn3f (3)', 'visibility', 'none'); // Dwelling density
    //map.setLayoutProperty('final-dyqn3f', 'visibility', 'none'); // NCC Climate Zone 1 - 9
  // });
    
      map.on('load', function () {
        if (mapLayer == 1) {
          // Set layer - households with solar
          map.setLayoutProperty('postcodesSolar', 'visibility', 'visible');
          map.setLayoutProperty('postcodesDensity', 'visibility', 'none');
          map.setLayoutProperty('postcodesClimate', 'visibility', 'none');
        } else if (mapLayer == 2) {
          // Set layer - dwelling density
          map.setLayoutProperty('postcodesDensity', 'visibility', 'visible'); 
          map.setLayoutProperty('postcodesSolar', 'visibility', 'none');
          map.setLayoutProperty('postcodesClimate', 'visibility', 'none');
          // Set layer - climate zones
        } else if (mapLayer == 3) {
          map.setLayoutProperty('postcodesClimate', 'visibility', 'visible');
          map.setLayoutProperty('postcodesSolar', 'visibility', 'none');
          map.setLayoutProperty('postcodesDensity', 'visibility', 'none');
        }
      });

      // Update postcode on click
      map.on('click', 'postcodesBase', (e) => {
        if (e.features.length > 0) {
          setPostcode(e.features[0].properties.POA_CODE21);
        }
      });

      // Set selected postcode to all polygons for selective styling
      map.on('mousemove', 'postcodesBase', (e) => {
        if (e.features.length > 0) {
          var features = map.querySourceFeatures('composite', {
            'sourceLayer': 'final'
          });
          for (const feature of features){
              var id = feature.id;
              map.setFeatureState(
                { source: 'composite', id: id, sourceLayer: 'final' },
                { selectedPostcode: e.features[0].properties.POA_CODE21 }
              );
          }
        }
      });
       
      // Reset selected postcode when cursor leaves map
      map.on('mouseleave', 'postcodesBase', () => {
        var features = map.querySourceFeatures('composite', {
            'sourceLayer': 'final'
          });
          for (const feature of features){
              var id = feature.id;
              map.setFeatureState(
                { source: 'composite', id: id, sourceLayer: 'final' },
                { selectedPostcode: null }
              );
          }
      });
      
      // When postcode is searched, return data in card
      geocoder.on('result', function(result) {
        setPostcode(result.result.text);
        console.log(map.getStyle().layers);
      });
  });


  useEffect(() => {
    if (mapLayer == 1) {
      // Set layer - households with solar
      map.setLayoutProperty('postcodesSolar', 'visibility', 'visible');
      map.setLayoutProperty('postcodesDensity', 'visibility', 'none');
      map.setLayoutProperty('postcodesClimate', 'visibility', 'none');
    } else if (mapLayer == 2) {
      // Set layer - dwelling density
      map.setLayoutProperty('postcodesDensity', 'visibility', 'visible'); 
      map.setLayoutProperty('postcodesSolar', 'visibility', 'none');
      map.setLayoutProperty('postcodesClimate', 'visibility', 'none');
      // Set layer - climate zones
    } else if (mapLayer == 3) {
      map.setLayoutProperty('postcodesClimate', 'visibility', 'visible');
      map.setLayoutProperty('postcodesSolar', 'visibility', 'none');
      map.setLayoutProperty('postcodesDensity', 'visibility', 'none');
    }
  }, [mapLayer])


  
  useEffect(() => {
    setFirstRender(false);
  }, [])

  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>UNIHACK '22'</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* TODO: Change searchbar width to width of below cards */}
      <div className="absolute z-40 flex w-max h-max mx-6 my-4" id="container" />
      <div className="absolute z-40 top-28">
        <Layers mapLayer={mapLayer} triggerParentUpdate={updateMapLayer} />
      </div>
      
      {dataVisible === true && (
        <DataCard postcode={postcode} />
      )}
      {dataVisible === false && (
        <HomeCard />
      )}

        
      <div id="mapbox" className="w-screen h-screen" />

      </main>
    </div>
  );
};

export default Home;
