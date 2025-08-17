"use client";

import { BASE_URL } from "@/api/api";
import { Button } from "@/components/ui/button";
import { surveyAnswers, surveyQuestions } from "@/utils/questions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Survey() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (answers.length !== surveyQuestions.length) {
      toast.error("لطفا به همه سوالات پاسخ دهید.");
      return;
    }

    try {
      setLoading(true);
      const token = Cookies.get("token");
      const res = await fetch(`${BASE_URL}/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      if (res.ok) {
        router.push("/account");
        toast.success("نظرسنجی با موفقیت ثبت شد.");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-6">
      {surveyQuestions.map((question, index) => (
        <div key={index} className="mb-4 flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            {index + 1}
            {"-"}
            {question}
          </h2>
          <div className="flex flex-wrap gap-2">
            {surveyAnswers.map((answer, i) => (
              <div key={i} className="flex gap-1 items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  id={`question-${index}-${i}`}
                  required
                  className="mr-2"
                  value={i + 1}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = surveyAnswers[i];
                    setAnswers(newAnswers);
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
        disabled={loading || answers.length !== surveyQuestions.length}
      >
        {loading ? "در حال ارسال..." : "ثبت"}
      </Button>
    </main>
  );
}
