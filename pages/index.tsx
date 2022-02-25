import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken = 'pk.eyJ1IjoidXNrb21wdWYiLCJhIjoiY2pnZzJvcHR4MDl0czJ4cW0zZTAxYnY5ZiJ9.EtWLN3Q74QDC6PpFDsvFig';

const Home: NextPage = () => {

  useEffect(() => {
    const map = new mapboxgl.Map({
      // Map controls
      // Use our data visualisation with postcode boundaries, etc.
      style: 'mapbox://styles/uskompuf/cl01t9qd2008m14p7zm4bgg9d',
      // Center map to Sydney
      center: [151.209, -33.8688],
      // Zoom out a bit
      zoom: 12.5,
      // Pitch map a bit for '3D' effect
      pitch: 30,
      // bearing: -17.6,
      container: 'mapbox',
      });  
      let currentPostcode = null;

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

      // Add geocoder to map
      map.addControl(geocoder);

      map.on('mousemove', 'poa-2021-aust-gda2020-shp-78l7af', (e) => {
        if (e.features.length > 0) {
          let tempPostcode = e.features[0].properties.POA_CODE21;
          if (currentPostcode == null || currentPostcode != tempPostcode) {
            console.log(tempPostcode);
          }
          currentPostcode = tempPostcode;
        }
      });

      map.on('mouseleave', 'poa-2021-aust-gda2020-shp-78l7af', () => {
        currentPostcode = null;
      });

      // Return postcode
      // TODO: Pass postcode to internal API route that queries data and returns relevant data
    // Use 'useSWR' for data fetching and render
    // as separate card
      geocoder.on('result', function(result) {
        console.log(map.getStyle().layers);
        console.log(result.result.text);
      });
    
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>UNIHACK '22'</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {/* Split off landing card into React component? Then have info card as separate, etc. */}
      <div className="absolute flex flex-col z-40 w-72 h-max left-4 top-4 bg-white drop-shadow rounded-md px-6 py-6 content-start gap-4">
        <h1 className="text-lg font-bold">🍞    Toasty Bread</h1>
        <p className="italic">Climate change can be overwhelming. The science is complex, and when it comes to future impacts, there are still a lot of unknowns. While real solutions will require action on a global scale, there are choices you can make in your day-to-day life to lessen your personal impact on the environment.</p>
      </div>

        
      <div id="mapbox" className="w-screen h-screen" />

      </main>
    </div>
  );
};

export default Home;
