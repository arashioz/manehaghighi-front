"use client";

import World from "@react-map/world";

export default function VideoWorld() {
  return (
    <div className="w-full flex flex-col gap-8 mt-8">
      <h2 className="text-center text-4xl font-bold text-gray-800">
        نقشه جهان
      </h2>
      <div className="w-full mx-auto sm:w-[500px] md:w-[700px]">
        <World
          type="select-single"
          onSelect={(country) => console.log(country)}
          selectColor="#9333ea"
        />
      </div>
    </div>
  );
}
