"use client";

import Image from "next/image";
import React from "react";
import Masonry from "react-masonry-css";

type Item = {
  src: string;
  alt: string;
};

const MasonryGrid = ({ items }: { items: Item[] }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="mt-6 flex w-auto gap-2"
      columnClassName="bg-clip-padding"
    >
      {items.map((item, index) => (
        <div key={index} className="mb-4">
          <Image
            width={600}
            height={500}
            src={item.src}
            alt={item.alt}
            className="w-full rounded-lg"
          />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
