"use client";

import { BASE_URL } from "@/api/api";
import { Button } from "@/components/ui/button";
import { answers, questions, categories } from "@/utils/questions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Questions() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number[]>([]);

  const handleSubmit = async () => {
    if (score.length !== questions.length) {
      toast.error("لطفا به همه سوالات پاسخ دهید.");
      return;
    }

    try {
      setLoading(true);
      const finalScores = categories.map((_, index) => {
        const categoryScore = score.slice(index * 5, index * 5 + 5);
        return categoryScore.reduce((acc, curr) => acc + curr, 0);
      });
      const token = Cookies.get("token");
      const res = await fetch(`${BASE_URL}/exam/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scores: finalScores }),
      });
      if (res.ok) {
        router.push("/account");
        toast.success("امتیاز شما با موفقیت ثبت شد.");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-6">
      {questions.map((question, index) => (
        <div key={index} className="mb-4 flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            {index + 1}
            {"-"}
            {question}
          </h2>
          <div className="flex flex-wrap gap-2">
            {answers.map((answer, i) => (
              <div key={i} className="flex gap-1 items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  id={`question-${index}-${i}`}
                  required
                  className="mr-2"
                  value={i + 1}
                  onChange={(e) => {
                    const newScore = [...score];
                    newScore[index] = i + 1;
                    setScore(newScore);
                  }}
                />
                <label htmlFor={`question-${index}-${i}`}>{answer}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={score.length !== questions.length || loading}
      >
        {loading ? "در حال ثبت..." : "ثبت امتیاز"}
      </Button>
    </main>
  );
}
