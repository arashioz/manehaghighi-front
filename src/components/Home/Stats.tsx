"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/api/api";
import { useIncrementalCount } from "@/hooks/useIncrementalCount";

export default function Stats() {
  const [data, setData] = useState({
    usersCount: { _count: 0 },
    articlesCount: { _count: 0 },
    coursesCount: { _count: 0 },
    episodesCount: { _count: 0 },
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/general/stats`);
      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, []);

  const usersCount = useIncrementalCount(data.usersCount._count);
  const articlesCount = useIncrementalCount(data.articlesCount._count);
  const coursesCount = useIncrementalCount(data.coursesCount._count);
  const episodesCount = useIncrementalCount(data.episodesCount._count);

  return (
    <section className="mx-auto mt-12 w-full px-2 py-4 shadow-lg lg:w-2/3">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-3xl">{usersCount}</p>
          <div className="h-[3px] w-full bg-gray-200"></div>
          <h3 className="mt-2 text-xl font-bold text-gray-600">
            تعداد کاربران
          </h3>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-3xl">{articlesCount}</p>
          <div className="h-[3px] w-full bg-gray-200"></div>
          <h3 className="mt-2 text-xl font-bold text-gray-600">
            محتوای آموزشی
          </h3>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-3xl">{coursesCount}</p>
          <div className="h-[3px] w-full bg-gray-200"></div>
          <h3 className="mt-2 text-xl font-bold text-gray-600">دوره‌ها</h3>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-3xl">{episodesCount}</p>
          <div className="h-[3px] w-full bg-gray-200"></div>
          <h3 className="mt-2 text-xl font-bold text-gray-600">قسمت‌ها</h3>
        </div>
      </div>
    </section>
  );
}
