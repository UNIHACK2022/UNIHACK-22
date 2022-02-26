// @ts-nocheck

import React from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function DataCard({
  postcode,
}: {
  postcode: any;
}) {

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

  const carbonEmissions = Number.parseFloat(data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG).toFixed(2)
    const installedSolar = Number.parseFloat(data.data[0].Installed_Solar_kW).toFixed(2)
  const renewableEnergy = Number.parseFloat(data.data[0].Renewable_Energy_Percentage*100).toFixed(2)
  return (
          <div className="absolute flex flex-col z-40 w-72 h-max left-4 top-4 bg-white drop-shadow rounded-md px-6 py-6 content-start">
        <h1 className="text-2xl font-semibold">{data.data[0].Postcode}</h1>
        <p className="text-sm font-medium">{data.data[0].LGA}</p>
        <div className="w-full border-t my-4" />
        <h2 className="text-sm font-medium pb-1">Household Electricity Carbon Emissions (Daily)</h2>
        <p className="text-2xl pb-1">{carbonEmissions} kW</p>
        <p className="text-sm text-neutral-600 pb-3">placeholder - deviance from state average</p>
        <h2 className="text-sm font-medium pb-1">Installed Solar</h2>
    <p className="text-2xl pb-1">{data.data[0].Installed_Solar_kW} kW</p>
    <p className="text-sm text-neutral-600 pb-2">placeholder - deviance from state average</p>
        <h2 className="text-sm font-medium pb-1">Renewable Energy</h2>
    <p className="text-2xl pb-1">{renewableEnergy} %</p>
    <p className="text-sm text-neutral-600 pb-2">placeholder - deviance from state average</p>
      </div>

  )
}