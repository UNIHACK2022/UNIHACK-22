import React from "react";

export default function HomeCard() {
  return (
    <div className="absolute flex flex-col z-30 left-[1.5rem] top-16 content-start gap-4">
      <div className="flex flex-col px-6 py-6   w-96 h-max content-start drop-shadow bg-white rounded-md">
        <h1 className="text-xl pb-2 font-semibold">How green's your suburb?</h1>
        <p className="">Fighting climate change starts with reducing our carbon footprint - the amount of carbon we release into the atmosphere - on a community level.</p>
        <p className="">See how your suburb stacks up to others.</p>
      </div>

            <div className="flex flex-col px-6 py-6   w-96 h-max content-start drop-shadow bg-white rounded-md">
        <h1 className="text-xl font-semibold pb-2">You can help fight climate change</h1>
        <p className="">Fighting climate change starts with reducing our carbon footprint - the amount of carbon we release into the atmosphere - on a community level.</p>
        <p className="">See how your suburb stacks up to others.</p>
      </div>
    </div>
  )
}