"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Filter({ search }: { search: string }) {
  const [searchValue, setSearchValue] = useState(search);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchValue) {
      searchParams.set("search", searchValue);
    } else {
      searchParams.delete("search");
    }
    window.location.search = searchParams.toString();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mt-6">
      <Input
        type="text"
        placeholder="جستجوی دوره‌ها"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full rounded-full bg-gray-100 px-4 py-6 text-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <Button
        onClick={handleSearch}
        className="rounded-full py-6 px-8 bg-purple-600 text-white w-full sm:w-fit"
      >
        جستجو
      </Button>
    </div>
  );
}
