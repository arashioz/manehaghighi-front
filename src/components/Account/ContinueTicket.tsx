"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { BASE_URL } from "@/api/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Message } from "@/types";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

const formSchema = z.object({
  message: z
    .string()
    .min(1, {
      message: "توضیحات الزامی است.",
    })
    .max(500, {
      message: "توضیحات نمی‌تواند بیشتر از 500 کاراکتر باشد.",
    }),
});

export default function ContinueTicket({
  id,
  title,
  prev,
  open,
}: {
  id: number;
  title: string;
  prev: Message[];
  open: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/user/continueTicket/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("پیام شما با موفقیت ارسال شد.");
      } else {
        const data = await response.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">مشاهده</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">ادامه تیکت</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-lg font-bold">{title}</h2>
          <div className="flex flex-col gap-2">
            {prev.map((message) => {
              if (message.isAdmin) {
                return (
                  <div
                    key={message.id}
                    className="flex flex-row-reverse gap-2 items-start bg-gray-900 rounded-lg p-2"
                  >
                    <FaUserCircle className="text-3xl text-gray-300" />
                    <p className="text-gray-300">{message.content}</p>
                  </div>
                );
              }
              return (
                <div
                  key={message.id}
                  className="flex gap-2 items-start bg-gray-100 rounded-lg p-2"
                >
                  <FaRegUserCircle className="text-3xl" />
                  <p className="text-gray-700">{message.content}</p>
                </div>
              );
            })}
          </div>
        </div>
        {open && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-right"
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="توضیحات تیکت را وارد کنید"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "در حال ارسال" : "ارسال"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
