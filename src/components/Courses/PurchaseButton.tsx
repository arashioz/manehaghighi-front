'use client';

import { IoPricetagOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { CustomLoginDialog } from "../Layout/CustomLoginDialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "@/api/api";
import Cookies from "js-cookie";
import { MdDone } from "react-icons/md";

export default function PurchaseButton({ isAuth, courseId, meHaveCourse }: { isAuth: boolean, courseId: number, meHaveCourse: boolean }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/payment/request`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}` 
        },
        body: JSON.stringify({ courseId }),
      });
      if(!res.ok)  {
        toast.error("خطایی رخ داده است");
        return;
      }
      const data = await res.json();
      window.location.href = data.paymentUrl;
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }

  }

  if (meHaveCourse) {
    return (
      <Button className="bg-purple-950 text-xl hover:bg-purple-950 cursor-auto py-6">
        <MdDone className="text-xl -mt-1 mx-1" />
        دوره خریداری شده
      </Button>
    )
  }

  if (!isAuth) {
    return <CustomLoginDialog
      buttonText="برای خرید دوره وارد شوید"
      redirect={false}
    />
  }
  return (
    <Button className="bg-purple-950 text-2xl py-6" onClick={handlePurchase}>
      <IoPricetagOutline className="text-xl -mt-1 mx-1" />
      {
        loading ? "در حال خرید..." : "خرید دوره"
      }
    </Button>
  )
}
