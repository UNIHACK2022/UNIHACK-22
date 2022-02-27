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
import { X, DotsSix } from "phosphor-react";
import { useEffect, useState } from "react";

export default function SolarCalculator({close}) {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const [size, setSize] = React.useState(6);
  const [bill, setBill] = React.useState(1600);

  const generation = 4.4 * size * 365.25;
  const savings = bill - generation * 0.11;
  const carbon = generation * 0.2 ;
  const trees = carbon * 0.0117 ;


  return (
    <Draggable>
      <div className="absolute z-50 flex flex-col justify-start px-5 pb-6 pt-8 rounded-lg bg-emerald-800 w-[400px] top-0 left-[26rem] h-max drop-shadow-md">
        <div className="flex flex-row items-center justify-between">
          <button className="absolute top-0 left-1/2 translate-x-[-50%] text-emerald-200">
            <DotsSix size={24} weight="fill"/>
          </button>
          <h1 className="text-lg font-semibold text-emerald-50">
            Solar Panel Calculator
          </h1>
          <button>
            <X size={28} weight="fill" className="text-emerald-100" onClick={close}/>
          </button>
        </div>
        <div className="mt-4 mb-4 border-t border-emerald-600" />
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-medium text-md text-emerald-50">Size</h2>
          <p className="text-lg text-emerald-50">{size} kW</p>
        </div>

        <Slider
          defaultValue={5}
          min={3}
          max={15}
          step={1}
          onChange={(v) => setSize(v)}
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
            Yearly bill cost
          </h2>
          <NumberInput
            step={100}
            defaultValue={1600}
            onChange={(valueString) => setBill(parse(valueString))}
            value={format(bill)}
            className="text-emerald-50"
            width={125}
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
          <h2 className="font-medium text-md text-emerald-50">
            Generation (yearly)
          </h2>
          <p className="text-lg text-emerald-50">
            {Number.parseFloat(generation).toFixed(2)} kW
          </p>
        </div>
          { savings < 0 ? 
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-medium text-md text-emerald-50">New yearly bill credit</h2>
            <p className="text-lg text-emerald-50">
              ${Math.abs(Number.parseFloat(savings).toFixed(2))}
            </p>
          </div>
          :
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-medium text-md text-emerald-50">New yearly bill cost</h2>
            <p className="text-lg text-emerald-50">
              ${Number.parseFloat(savings).toFixed(2)}
            </p>
          </div>         
          }

        <div className="flex flex-row items-center justify-between">
          <h2 className="font-medium text-md text-emerald-50">
            Carbon savings
          </h2>
          <p className="text-lg text-emerald-50">
            {Number.parseFloat(carbon).toFixed(2)} kg
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
