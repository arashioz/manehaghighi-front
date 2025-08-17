import { Exam } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import QuestionModal from "./QuestionModal";

export default function QuestionTable({ data }: { data: Exam[] }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {data.map((exam) => (
        <QuestionModal
          key={exam.id}
          data={exam}
          label={new Date(exam.createdAt).toLocaleDateString("fa-IR")}
        />
      ))}
    </div>
  );
}
