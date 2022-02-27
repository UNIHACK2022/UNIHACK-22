// @ts-nocheck

import React from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import ReactDOM from "react-dom";
import {
  CaretUp,
  CaretDown,
  Spinner,
  WarningOctagon,
  Info,
} from "phosphor-react";
import { MathOperations, BookOpen } from "phosphor-react";
import Stars from "./Stars";
import { Tooltip } from "@chakra-ui/react";

export default function DataCard({ postcode }: { postcode: any }) {
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
  };

  const installedSolarAverages = {
    ACT: 26.43565667,
    NSW: 30.19622172,
    NT: 23.1865474,
    QLD: 44.87239447,
    SA: 43.92686272,
    TAS: 18.13184765,
    VIC: 23.81908195,
    WA: 36.92370803,
  };

  const starRatingAverages = {
    ACT: 6.393548387,
    NSW: 5.964411765,
    NT: 6.027906977,
    QLD: 6.3975,
    SA: 6.180701754,
    TAS: 6.521052632,
    VIC: 6.22484277,
    WA: 6.387771739,
  };

  const renewableEnergyNationalAverage = 0.3599782193;

  // API endpoint URL
  const url = `/api/data?postcode=${postcode}`;

  // Fetch data using postcode
  const { data, error } = useSWR(url, fetcher);

  if (error)
    // >400
    return (
      <div className="absolute flex flex-col z-30 w-72 h-[417px] left-[1.5rem] top-16 bg-white drop-shadow rounded-md px-6 py-6 items-center justify-center">
        <div className="flex flex-col gap-2">
          <WarningOctagon size={32} className="text-neutral-600" />
          <p className="text-sm text-neutral-600">
            Error loading data. Refresh page.
          </p>
        </div>
      </div>
    );
  if (!data)
    // Loading ...
    return (
      <div className="absolute flex flex-col z-30 w-72 h-[417px] left-[1.5rem] top-16 bg-white drop-shadow rounded-md px-6 py-6 items-center justify-center">
        <Spinner size={32} className="animate-spin text-neutral-600" />
      </div>
    );
  // Data loaded

  // TODO: When data cleared, RETURN TO LANDING CARD

  const carbonEmissions = Number.parseFloat(
    data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG
  ).toFixed(2);
  const installedSolar = Number.parseFloat(
    (data.data[0].Dwellings_with_Solar / data.data[0].Number_of_Dwellings) * 100
  ).toFixed(2);
  const renewableEnergy = Number.parseFloat(
    data.data[0].Renewable_Energy_Percentage * 100
  ).toFixed(2);

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
  let state;
  let starRatingDeviance;

  const renewableEnergyDeviance = Number.parseFloat(
    ((data.data[0].Renewable_Energy_Percentage -
      renewableEnergyNationalAverage) /
      renewableEnergyNationalAverage) *
      100
  ).toFixed(2);

  if (data.data[0].State == "Australian Capital Territory") {
    state = "ACT";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.ACT) /
        householdCarbonEmissionsAverages.ACT) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.ACT) /
        installedSolarAverages.ACT) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.ACT) /
        starRatingAverages.ACT) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "New South Wales") {
    state = "NSW";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.NSW) /
        householdCarbonEmissionsAverages.NSW) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.NSW) /
        installedSolarAverages.NSW) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.NSW) /
        starRatingAverages.NSW) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "Northern Territory") {
    state = "NT";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.NT) /
        householdCarbonEmissionsAverages.NT) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.NT) /
        installedSolarAverages.NT) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.NT) /
        starRatingAverages.NT) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "Queensland") {
    state = "QLD";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.QLD) /
        householdCarbonEmissionsAverages.QLD) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.QLD) /
        installedSolarAverages.QLD) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.QLD) /
        starRatingAverages.QLD) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "Southern Australia") {
    state = "SA";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.SA) /
        householdCarbonEmissionsAverages.SA) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.SA) /
        installedSolarAverages.SA) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.SA) /
        starRatingAverages.SA) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "Tasmania") {
    state = "TAS";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.TAS) /
        householdCarbonEmissionsAverages.TAS) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.TAS) /
        installedSolarAverages.TAS) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.TAS) /
        starRatingAverages.TAS) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "Victoria") {
    state = "VIC";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.VIC) /
        householdCarbonEmissionsAverages.VIC) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.VIC) /
        installedSolarAverages.VIC) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.VIC) /
        starRatingAverages.VIC) *
        100
    ).toFixed(2);
  } else if (data.data[0].State == "Western Australia") {
    state = "WA";
    carbonEmissionsDeviance = Number.parseFloat(
      ((data.data[0].Daily_Household_Electrcitiy_Carbon_Emmisions_kG -
        householdCarbonEmissionsAverages.WA) /
        householdCarbonEmissionsAverages.WA) *
        100
    ).toFixed(2);
    installedSolarDeviance = Number.parseFloat(
      ((installedSolar - installedSolarAverages.WA) /
        installedSolarAverages.WA) *
        100
    ).toFixed(2);
    starRatingDeviance = Number.parseFloat(
      ((data.data[0].Household_Energy_Efficiency_stars -
        starRatingAverages.WA) /
        starRatingAverages.WA) *
        100
    ).toFixed(2);
  }

  // Star rating
  // Get household star rating from data
  // Split stars into separate react components where you can pass in number of stars
  // React component uses if statements to render different amount of stars (can you render part of svg based on decimal?)
  // Render react component passing number of stars in

  return (
    <div className="absolute flex flex-col z-30 left-[1.5rem] top-16 content-start gap-4">
      <div className="flex flex-col z-30 w-72 h-max left-[1.5rem] top-16 bg-white drop-shadow rounded-md px-6 py-6 content-start">
        <h1 className="text-2xl font-semibold">{data.data[0].Postcode}</h1>
        <p className="text-sm font-medium">{data.data[0].LGA}</p>
        <div className="w-full my-4 border-t" />

        <h2 className="pb-1 text-sm font-medium">
          Household Electricity Carbon Emissions (Daily)
          <span className="absolute inline-flex justify-center pl-1 pt-[2px]">
            <Tooltip label="The amount of greenhouse gas emissions that your electricity usage at home generates daily.">
              <Info size={16} weight="fill" className="text-neutral-600" />
            </Tooltip>
          </span>
        </h2>
        <p className="pb-1 text-2xl">{carbonEmissions} kg</p>
        {carbonEmissionsDeviance > 0 ? (
          <div className="flex flex-row items-center gap-2 pb-3">
            <CaretUp size={16} weight="fill" className="text-red-500" />
            <p className="text-sm text-neutral-500">
              {carbonEmissionsDeviance}% above {state} average
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1 pb-3">
            <CaretDown size={16} weight="fill" className="text-green-500" />
            <p className="text-sm text-neutral-500">
              {carbonEmissionsDeviance}% below {state} average
            </p>
          </div>
        )}
        <h2 className="pb-1 text-sm font-medium">
          Households with Solar
          <span className="absolute inline-flex justify-center pl-1 pt-[2px]">
            <Tooltip label="The percentage of households with solar panels installed in your postcode.">
              <Info size={16} weight="fill" className="text-neutral-600" />
            </Tooltip>
          </span>
        </h2>
        <p className="pb-1 text-2xl">{installedSolar} %</p>
        {installedSolarDeviance > 0 ? (
          <div className="flex flex-row items-center gap-2 pb-3">
            <CaretUp size={16} weight="fill" className="text-green-500" />
            <p className="text-sm text-neutral-500">
              {installedSolarDeviance}% above {state} average
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1 pb-3">
            <CaretDown size={16} weight="fill" className="text-red-500" />
            <p className="text-sm text-neutral-500">
              {installedSolarDeviance}% below {state} average
            </p>
          </div>
        )}
        <h2 className="pb-1 text-sm font-medium">
          Renewable Energy
          <span className="absolute inline-flex justify-center pl-1 pt-[2px]">
            <Tooltip label="The percentage of energy per postcode generated by renewable energy.">
              <Info size={16} weight="fill" className="text-neutral-600" />
            </Tooltip>
          </span>
        </h2>
        <p className="pb-1 text-2xl">{renewableEnergy} %</p>
        {renewableEnergyDeviance > 0 ? (
          <div className="flex flex-row items-center gap-2 pb-3">
            <CaretUp size={16} weight="fill" className="text-green-500" />
            <p className="text-sm text-neutral-500">
              {renewableEnergyDeviance}% above national average
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1 pb-3">
            <CaretDown size={16} weight="fill" className="text-red-500" />
            <p className="text-sm text-neutral-500">
              {renewableEnergyDeviance}% below national average
            </p>
          </div>
        )}
  
        <h2 className="pb-1 text-sm font-medium">
          Average home energy star rating
          <span className="absolute inline-flex justify-center pl-1 pt-[2px]">
            <Tooltip label="The average NatHERS home energy star rating in a postcode. The higher the rating, the less heating and cooling a house requires and thus cost to run.">
              <Info size={16} weight="fill" className="text-neutral-600" />
            </Tooltip>
          </span>
        </h2>
        <Stars rating={data.data[0].Household_Energy_Efficiency_stars} />
        {starRatingDeviance > 0 ? (
          <div className="flex flex-row items-center gap-2 pt-2 pb-2">
            <CaretUp size={16} weight="fill" className="text-green-500" />
            <p className="text-sm text-neutral-500">
              {starRatingDeviance}% above {state} average
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1 pt-2 pb-3">
            <CaretDown size={16} weight="fill" className="text-red-500" />
            <p className="text-sm text-neutral-500">
              {starRatingDeviance}% below {state} average
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col z-30 w-72 h-max left-[1.5rem] top-16 bg-white drop-shadow rounded-md px-6 py-6 content-start">
        <h1 className="pb-2 text-lg font-semibold">What can you do to help?</h1>
        <h2 className="pb-1 font-semibold text-md">Start a conversation</h2>
        <p className="pb-4 text-sm">
          Changing your suburb’s carbon footprint starts with your community.
          Here’s a template you can use to email your local councilor.
        </p>
        <h2 className="pb-1 font-semibold text-md">
          Reduce your carbon footprint
        </h2>
        <p className="text-sm">
          The choices you make everyday contribute to your carbon footprint. You
          can reduce yours by making small changes. And if we do it together,
          it’ll compound into massive change.
        </p>
        <div className="mb-6 border-t mt-9 border-neutral-300" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-row items-center gap-2">
            <MathOperations size={18} weight="fill" />
            <p className="text-base font-medium">Calculators</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <BookOpen size={18} weight="fill" />
            <p className="text-base font-medium">Guides</p>
          </div>
        </div>
      </div>
    </div>
  );
}
