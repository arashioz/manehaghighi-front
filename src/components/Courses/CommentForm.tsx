'use client';

import { BASE_URL } from "@/api/api";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CommentForm({ courseId, isAuth }: { courseId: number; isAuth: boolean; }) {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const token = Cookies.get('token');

    if (comment.trim() === '') {
      toast.error("متن نظر نمی‌تواند خالی باشد")
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/comment/course/${courseId}`, {
         method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (response.ok) {
        toast.success("نظر شما با موفقیت ثبت شد, پس از تایید ادمین نظر شما در این صفحه نشان داده می‌شود.");
      }
    } catch (error) { 
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <div>
      <h3 className="font-bold text-xl">
        نظرات کاربران
      </h3>
      <div>
        <textarea
          name="content"
          className="w-full h-24 border border-gray-300 rounded-lg p-2 mt-4"
          placeholder="نظر خود را بنویسید"
          disabled={!isAuth}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          {
            isAuth ? (
              <Button className="mb-4 w-[150px]" disabled={loading} onClick={handleSubmit}>
                {loading ? 'در حال ثبت...' : 'ثبت نظر'}
              </Button>
            ) : (
              <Button type="button" className="mb-4 w-[150px]" disabled>
                برای ثبت نظر باید وارد شوید
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
}