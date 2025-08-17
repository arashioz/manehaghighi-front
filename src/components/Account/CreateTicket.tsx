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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { BASE_URL } from "@/api/api";
import router from "next/router";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "عنوان الزامی است.",
        })
        .max(100, {
            message: "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد.",
        }),
    message: z
        .string()
        .min(1, {
            message: "توضیحات الزامی است.",
        })
        .max(500, {
            message: "توضیحات نمی‌تواند بیشتر از 500 کاراکتر باشد.",
        }),
});

export default function CreateTicketModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            const response = await fetch(`${BASE_URL}/user/createTicket`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                toast.success("تیکت با موفقیت ارسال شد");
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
            router.refresh();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">ایجاد تیکت</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-right">
                        ایجاد تیکت جدید
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 text-right"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>عنوان</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="عنوان تیکت را وارد کنید"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "در حال ارسال" : "ارسال"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
