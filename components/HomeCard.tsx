import React from "react";

export default function HomeCard() {
  return (
    <div className="absolute flex flex-col z-30 w-72 h-max left-[1.5rem] top-16 bg-white drop-shadow rounded-md px-6 py-6 content-start gap-4">
      <h1 className="text-2xl font-bold">🍞    Toasty Bread</h1>
      <p className="italic">See how green your suburb is, and what you can do to help reduce your personal impact on the environment.</p>
    </div>
  )
}