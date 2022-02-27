import React from "react";
import { useEffect, useState, useRef } from "react";

export default function Legend({ mapLayer }) {
  return (
    <div key={mapLayer}>
      {mapLayer == 1 && null}
      {(mapLayer == 2 || mapLayer == 3 || mapLayer == 4) && (
        <div className="absolute z-50 px-2 py-2 text-black translate-x-[-50%] bg-white rounded-lg bottom-12 left-1/2 w-max h-max drop-shadow">
          {mapLayer == 2 && (
            <div className="flex flex-row gap-3 text-sm">
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#FF0505] rounded" />
                0%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#E6160B] rounded" />
                5%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#CD2711] rounded" />
                10%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#B43817] rounded" />
                15%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#9C491D] rounded" />
                20%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#835A23] rounded" />
                25%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#6A6B29] rounded" />
                30%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#517C2F] rounded" />
                35%
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#388D35] rounded" />
                40%
              </div>
            </div>
          )}
          {mapLayer == 3 && (
            <div className="flex flex-row gap-3 text-sm">
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#FF0505] rounded" />
                0/km<span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#E6160B] rounded" />
                5000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#CD2711] rounded" />
                10000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#B43817] rounded" />
                15000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#9C491D] rounded" />
                20000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#835A23] rounded" />
                25000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#6A6B29] rounded" />
                30000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#517C2F] rounded" />
                35000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="w-4 h-4 bg-[#388D35] rounded" />
                35000/km
                <span className="text-xs translate-x-[-2.5px] pb-2">2</span>
              </div>
            </div>
          )}
          {mapLayer == 4 && (
            <div className="flex flex-row gap-3 text-sm">
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#FF3838] rounded" />
                High humidity summer & warm winter
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#FFF133] rounded" />
                Hot dry summer & warm winter
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#FF8614] rounded" />
                Hot dry summer & cool winter
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#FFE8BD] rounded" />
                Warm temperate
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#31FF1F] rounded" />
                Mild temperate
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#38DEFF] rounded" />
                Cool temperate
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-[#261FFF] rounded" />
                Alpine
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
