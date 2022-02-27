// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { X } from "phosphor-react";

export default function EVCalculator({close}) {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const [distance, setDistance] = React.useState(15000);
  const [petrol, setPetrol] = React.useState(2.0);
  const [electricity, setElectricity] = React.useState(0.25);

  const savings = distance * (0.1 * petrol - 0.15 * electricity);
  const carbon = distance * 0.015;
  const trees = carbon * 0.0117;

  return (
    <Draggable>
      <div className="absolute z-50 flex flex-col justify-start px-5 py-6 rounded-lg bg-emerald-800 w-[400px] top-5 h-max drop-shadow-md">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-semibold text-emerald-50">
            Electric Car Calculator
          </h1>
          <button>
            <X
              size={28}
              weight="fill"
              className="text-emerald-100"
              onClick={close}
            />
          </button>
        </div>
        <div className="mt-4 mb-4 border-t border-emerald-600" />
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-medium text-md text-emerald-50">
            Distance driven
          </h2>
          <p className="text-lg text-emerald-50">{distance} km</p>
        </div>

        <Slider
          defaultValue={15000}
          min={10000}
          max={100000}
          step={5000}
          onChange={(v) => setDistance(v)}
          className="my-2"
        >
          <SliderTrack bg="green.600">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="green.200" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="green.100" />
        </Slider>
        <div className="flex flex-row items-center justify-between gap-12 pt-4">
          <h2 className="font-medium text-md text-emerald-50">
            Petrol cost ($/L)
          </h2>
          <NumberInput
            step={0.1}
            defaultValue={2.0}
            onChange={(valueString) => setPetrol(parse(valueString))}
            value={format(petrol)}
            className="text-emerald-50"
            width={150}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className="flex flex-row items-center justify-between gap-12 pt-4">
          <h2 className="font-medium text-md text-emerald-50">
            Electricity cost ($/kWh)
          </h2>
          <NumberInput
            step={0.05}
            defaultValue={0.25}
            onChange={(valueString) => setElectricity(parse(valueString))}
            value={format(electricity)}
            className="text-emerald-50"
            width={150}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>

        <div className="mt-4 mb-6 border-t border-emerald-600" />
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-medium text-md text-emerald-50">Savings</h2>
          <p className="text-lg text-emerald-50">
            {Number.parseFloat(savings).toFixed(2)} kW
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-medium text-md text-emerald-50">Carbon saved</h2>
          <p className="text-lg text-emerald-50">
            ${Number.parseFloat(carbon).toFixed(2)} kg
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-medium text-md text-emerald-50">Trees saved</h2>
          <p className="text-lg text-emerald-50">
            {Number.parseFloat(trees).toFixed(2)}
          </p>
        </div>
      </div>
    </Draggable>
  );
}
