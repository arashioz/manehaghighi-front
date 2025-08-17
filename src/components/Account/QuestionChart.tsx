"use client";

import { Exam } from "@/types";
import React, { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/api/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { categories } from "@/utils/questions";
import { generateRandomRgba } from "@/utils/colors";
import QuestionTable from "./QuestionTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
    },
    point: {
      radius: 5,
      backgroundColor: "rgba(75, 192, 192, 1)",
      borderColor: "rgba(75, 192, 192, 1)",
      hoverRadius: 7,
      hoverBorderWidth: 2,
    },
  },
};

export default function QuestionChart() {
  const [data, setData] = React.useState<Exam[]>([]);

  const chartData = useMemo(() => {
    return {
      labels: categories,
      datasets: data.map((exam) => ({
        label: new Date(exam.createdAt).toLocaleDateString("fa-IR"),
        data: exam.scores,
        borderColor: generateRandomRgba(),
        backgroundColor: generateRandomRgba(),
        fill: true,
        tension: 0.4,
      })),
    };
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BASE_URL}/exam`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-5 flex-col">
      <Line
        data={chartData}
        options={options}
        style={{
          height: window.innerWidth < 768 ? "300px" : "200px",
          width: "100%",
        }}
        height={window.innerWidth < 768 ? 300 : 200}
      />
      <QuestionTable data={data} />
    </div>
  );
}
