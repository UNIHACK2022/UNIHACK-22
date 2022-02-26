// @ts-nocheck

import React from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function DataCard({
  postcode,
}: {
  postcode: any;
}) {


  // State averages for data
  const householdCarbonEmissionsAverages = {
    ACT: 0.99025,
    NSW: 8.857003084,
    NT: 15.66816677,
    QLD: 10.29065477,
    SA: 0.9797333041,
    TAS: 0.415905,
    VIC: 8.463198475,
    WA: 7.023076739,
  }

   const installedSolarAverages = {
    ACT: 9552.967742,
    NSW: 12967.78561,
    NT: 5853.837209,
    QLD: 18378.27182,
    SA: 7126.44152,
    TAS: 1916.614035,
    VIC: 5645.962264,
    WA: 6104.019022,
  }
  
  // API endpoint URL
  const url = `/api/data?postcode=${postcode}`

  // Fetch data using postcode
  const { data, error } = useSWR(url, fetcher)

  if (error) // >400
    return (
      <div className="absolute flex flex-col z-40 w-72 h-max left-4 top-4 bg-white drop-shadow rounded-md px-6 py-6 content-start gap-4">
        <h1 className="text-lg font-bold">Error</h1>
      </div>
    )
  if (!data) // Loading ...
    return (
      <div className="absolute flex flex-col z-40 w-72 h-max left-4 top-4 bg-white drop-shadow rounded-md px-6 py-6 content-start gap-4">
        <h1 className="text-lg font-bold">Loading</h1>
      </div>
    )
  // Data loaded

  // TODO: When data cleared, RETURN TO LANDING CARD

  const carbonEmissions = Number.parseFloat(data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG).toFixed(2)
    const installedSolar = Number.parseFloat(data.data[0].Installed_Solar_kW).toFixed(2)
  const renewableEnergy = Number.parseFloat(data.data[0].Renewable_Energy_Percentage*100).toFixed(2)

    // If state = x
    // Percentage diff = ((postcode value) - (state average))/(state average) x 100
    // If diff = +
      // Render green upwards triangle and percentage 
    // If diff = -
      // Render red downwards traingle and percent
    // Else
      // Render = sign and 'same as state average'

  // Calculate deviance from state averages for stats

  let carbonEmissionsDeviance;
  let installedSolarDeviance;

  if (data.data[0].State == "Australian Capital Territory") {
      carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.ACT))/(householdCarbonEmissionsAverages.ACT)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.ACT))/(installedSolarAverages.ACT)) * 100
  } else if (data.data[0].State == "New South Wales") {
        carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.NSW))/(householdCarbonEmissionsAverages.NSW)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.NSW))/(installedSolarAverages.NSW)) * 100
  } else if (data.data[0].State == "Northern Territory") {
       carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.NT))/(householdCarbonEmissionsAverages.NT)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.NT))/(installedSolarAverages.NT)) * 100   
  } else if (data.data[0].State == "Queensland") {
        carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.QLD))/(householdCarbonEmissionsAverages.QLD)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.QLD))/(installedSolarAverages.QLD)) * 100  
  } else if (data.data[0].State == "Southern Australia") {
        carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.SA))/(householdCarbonEmissionsAverages.SA)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.SA))/(installedSolarAverages.SA)) * 100  
  } else if (data.data[0].State == "Tasmania") {
        carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.TAS))/(householdCarbonEmissionsAverages.TAS)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.TAS))/(installedSolarAverages.TAS)) * 100  
  } else if (data.data[0].State == "Victoria") {
        carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.VIC))/(householdCarbonEmissionsAverages.VIC)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.VIC))/(installedSolarAverages.VIC)) * 100  
  } else if (data.data[0].State == "Western Australia") {
        carbonEmissionsDeviance = (((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG) - (householdCarbonEmissionsAverages.WA))/(householdCarbonEmissionsAverages.WA)) * 100
     installedSolarDeviance = (((data.data[0].Installed_Solar_kW) -(installedSolarAverages.WA))/(installedSolarAverages.WA)) * 100  
  } 

  console.log(householdCarbonEmissionsAverages.NSW)

  
  return (
          <div className="absolute flex flex-col z-40 w-72 h-max left-4 top-4 bg-white drop-shadow rounded-md px-6 py-6 content-start">
        <h1 className="text-2xl font-semibold">{data.data[0].Postcode}</h1>
        <p className="text-sm font-medium">{data.data[0].LGA}</p>
        <div className="w-full border-t my-4" />
        <h2 className="text-sm font-medium pb-1">Household Electricity Carbon Emissions (Daily)</h2>
        <p className="text-2xl pb-1">{carbonEmissions} kW</p>
        <p className="text-sm text-neutral-600 pb-3">{carbonEmissionsDeviance}</p>
        <h2 className="text-sm font-medium pb-1">Installed Solar</h2>
    <p className="text-2xl pb-1">{data.data[0].Installed_Solar_kW} kW</p>
    <p className="text-sm text-neutral-600 pb-2">{installedSolarDeviance}</p>
        <h2 className="text-sm font-medium pb-1">Renewable Energy</h2>
    <p className="text-2xl pb-1">{renewableEnergy} %</p>
    <p className="text-sm text-neutral-600 pb-2">placeholder - deviance from state average</p>
      </div>

  )
}