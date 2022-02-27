import React from "react";
import ReactDOM from "react-dom";
import { Star } from "phosphor-react";


export default function Stars({
  rating,
}: {
  rating: any;
}) {
const starSize = 18;

  // Get whole number of stars
  const starsWhole = Math.floor(rating);

  // Get remainder to calculate fraction of star to render with
  const starsPart = rating - starsWhole;

  const starsPartWidth = Math.ceil(starSize * starsPart);

  var arr = [];

  // Render whole stars
  for (let i = 0; i < starsWhole; i++) {
    arr.push(i);
  }

  var renderedOutput = arr.map((item, i) => <Star size={starSize} key={i} weight="fill" className="text-yellow-500" />);

  return (
      <div className="flex flex-row items-center">
        <div className="absolute z-40 flex flex-row gap-1">
          {renderedOutput}
          <div className="text-yellow-500 overflow-clip" style={{ width: `${starsPartWidth}px` }}>
            <Star size={starSize} weight="fill" />
          </div>
        </div>
        <div className="relative flex flex-row items-center gap-1">
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <Star size={starSize} weight="fill" className="text-neutral-300" />
          <p className="pl-1 font-medium font-sm text-neutral-800">{Number.parseFloat(rating).toFixed(1)}/8</p>
        </div> 
      </div>
  );
}