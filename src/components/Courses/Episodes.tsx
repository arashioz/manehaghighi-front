"use client";

import { BASE_URL } from "@/api/api";
import { Course, Episode } from "@/types";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Episodes({ course }: { course: Course }) {
  const [data, setData] = useState<Episode[] | null>([]);
  const [quality, setQuality] = useState("480");

  const fetchData = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/episode/${course.id}`, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (!res.ok) {
      setData(null);
    }
    const d = await res.json();
    setData(d);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data || !data?.length) return null;

  return (
    <div
      id="episodes"
      className="shadow-3xl bg-gray-100/50 p-4 rounded-lg my-6"
    >
      <h2 className="text-3xl text-purple-700 font-bold mb-5 text-center">
        فهرست قسمت‌ها
      </h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <p>کیفیت پخش: </p>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setQuality(e.target.value)}
          >
            <option disabled selected>
              کیفیت پخش
            </option>
            <option value={"480"}>480p</option>
            <option value={"720"}>720p</option>
          </select>
        </div>
        {data.map((episode: Episode) => (
          <div key={episode.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">
                {episode.order}. {episode.title}
              </span>
              <span className="text-sm text-gray-500">
                {episode.duration} دقیقه
              </span>
            </div>
            <p>{episode.description}</p>
            <video
              controls
              className="rounded-lg w-full"
              controlsList="nodownload"
              src={
                quality === "480" ? episode.videoUrl480 : episode.videoUrl720
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
