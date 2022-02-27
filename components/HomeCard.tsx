import React from "react";
import { MathOperations, BookOpen } from "phosphor-react";


export default function HomeCard() {
  return (
    <div className="absolute flex flex-col z-30 left-[1.5rem] top-16 content-start gap-4">
      <div className="flex flex-col content-start px-6 py-6 bg-white rounded-lg w-96 h-max drop-shadow">
        <h1 className="pb-2 text-xl font-semibold">How green&apos;s your suburb?</h1>
        <p className="pb-4">
          Fighting climate change starts with reducing our carbon footprint -
          the amount of carbon we release into the atmosphere - on a community
          level.
        </p>
        <p className="">See how your suburb stacks up to others.</p>
        <div className="h-full px-3 py-2 mt-4 rounded-md bg-emerald-100 w-max">
          <p className="text-sm font-medium">💡&nbsp;Tip: Try clicking on map layers!</p> 
        </div>
      </div>

      <div className="flex flex-col content-start px-6 py-6 bg-white rounded-lg w-96 h-max drop-shadow">
        <h1 className="pb-2 text-xl font-semibold">
          You can help fight climate change
        </h1>
        <p className="">
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

      <div className="flex flex-col content-start px-6 py-6 bg-white rounded-lg w-96 h-max drop-shadow">
        <h1 className="pb-2 text-lg font-semibold leading-7">
          Empowering individuals, communities and governments to visualise and accelerate their progress towards stopping climate change.
        </h1>

        <p>Data sources</p>
        <p>Credits</p>

        <p className="pb-2">
          Greenway
        </p>
        <p className="text-sm text-neutral-500">Made with <span className="text-red-700">♥</span> by Luke, Tiff, Terrie, Jeff and Ayush at UNIHACK ‘22 in Sydney.</p>
      </div>
    </div>
  );
}
