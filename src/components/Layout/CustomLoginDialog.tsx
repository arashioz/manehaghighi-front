"use client";

import { BASE_URL } from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

enum AuthType {
  Login = "login",
  Register = "register",
}

enum RegisterStep {
  Register = "register",
  OTP = "otp",
}

const loginSchema = z.object({
  username: z.string().min(1, "ایمیل یا موبایل الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});

const registerSchema = z.object({
  name: z.string().min(3, "نام الزامی است"),
  phone: z
    .string()
    .regex(/^9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/, "شماره موبایل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "کد ارسالی باید ۶ رقمی باشد"),
});

export function CustomLoginDialog({
  redirect = true,
  buttonText = "ورود / ثبت‌نام",
}: {
  buttonText?: string;
  redirect?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AuthType>(AuthType.Login);
  const [registerStep, setRegisterStep] = useState<RegisterStep>(
    RegisterStep.Register
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (
    values:
      | z.infer<typeof loginSchema>
      | z.infer<typeof registerSchema>
      | z.infer<typeof otpSchema>
  ) => {
    setLoading(true);
    if (type === AuthType.Login) {
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          Cookies.set("token", data.accessToken);
          toast.success("با موفقیت وارد شدید");
          if (redirect) {
            window.location.href = "/account";
          } else {
            router.refresh();
          }
        } else {
          const data = await response.json();
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("خطایی رخ داده است");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    } else if (type === AuthType.Register) {
      if (registerStep === RegisterStep.Register) {
        try {
          const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            const data = await response.json();
            Cookies.set("token", data.accessToken);
            toast.success(data.message);
            const res = await fetch(`${BASE_URL}/otp/request`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phone: registerForm.getValues("phone"),
              }),
            });
            if (res.ok) {
              toast.success("کد تایید به شماره موبایل شما ارسال شد");
              setRegisterStep(RegisterStep.OTP);
            }
          } else {
            const data = await response.json();
            Cookies.remove("token");
            toast.error(data.error);
          }
        } catch (error) {
          toast.error("خطایی رخ داده است");
          Cookies.remove("token");
        } finally {
          setLoading(false);
        }
      } else if (registerStep === RegisterStep.OTP) {
        try {
          const response = await fetch(`${BASE_URL}/otp/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: registerForm.getValues("phone"),
              otp: otpForm.getValues("otp"),
            }),
          });

          if (response.ok) {
            toast.success("با موفقیت ثبت‌نام شدید");
            if (redirect) {
              window.location.href = "/account";
            } else {
              router.refresh();
            }
            setOpen(false);
          } else {
            const data = await response.json();
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("خطایی رخ داده است");
          Cookies.remove("token");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <Dialog
      open={registerStep === RegisterStep.OTP ? true : open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <Button className="aspect-square bg-purple-600 p-0 sm:aspect-auto sm:px-2 sm:py-4">
          <CiUser className="block h-6 w-6 sm:hidden" />
          <span className="hidden sm:block">{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">ورود / ثبت‌نام</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={AuthType.Login}
          onValueChange={(value) => setType(value as AuthType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={AuthType.Login}>ورود</TabsTrigger>
            <TabsTrigger value={AuthType.Register}>ثبت‌نام</TabsTrigger>
          </TabsList>
          <TabsContent value={AuthType.Login}>
            <Card className="text-right">
              <CardHeader>
                <CardTitle>ورود</CardTitle>
                <CardDescription>
                  برای ورود لطفا اطلاعات زیر را دقیق وارد کنید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ایمیل یا موبایل</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+۹۸۹۱۲۱۲۳۴۵۶۷ / me@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs opacity-60">
                            حتما قبل از شماره تماس خود ۹۸+ را وارد کنید
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رمز‌عبور</FormLabel>
                          <div className="flex items-center -space-x-8">
                            <FormControl>
                              <Input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="*********"
                                {...field}
                              />
                            </FormControl>
                            <label
                              className="cursor-pointer"
                              onClick={togglePasswordVisibility}
                            >
                              {passwordVisible ? (
                                <FaRegEye />
                              ) : (
                                <FaRegEyeSlash />
                              )}
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {!loading ? "ورود" : "در حال ورود"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value={AuthType.Register}>
            <Card className="text-right">
              {registerStep === RegisterStep.Register ? (
                <CardHeader>
                  <CardTitle>ثبت‌نام</CardTitle>
                  <CardDescription>
                    برای ثبت‌نام لطفا اطلاعات زیر را دقیق وارد کنید
                  </CardDescription>
                </CardHeader>
              ) : registerStep === RegisterStep.OTP ? (
                <CardHeader>
                  <CardTitle>تایید موبایل</CardTitle>
                  <CardDescription>
                    کد تایید به شماره موبایل شما ارسال شد
                  </CardDescription>
                </CardHeader>
              ) : null}
              {registerStep === RegisterStep.Register ? (
                <CardContent key={RegisterStep.Register}>
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نام</FormLabel>
                            <FormControl>
                              <Input
                                className="text-right"
                                placeholder="امیر صالحی"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>شماره موبایل</FormLabel>
                            <FormControl>
                              <Input placeholder="+۹۸۹۱۲۱۲۳۴۵۶۷" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رمز‌عبور</FormLabel>
                            <div className="flex items-center -space-x-8">
                              <FormControl>
                                <Input
                                  type={passwordVisible ? "text" : "password"}
                                  placeholder="*********"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <label
                                className="cursor-pointer"
                                onClick={togglePasswordVisibility}
                              >
                                {passwordVisible ? (
                                  <FaRegEye />
                                ) : (
                                  <FaRegEyeSlash />
                                )}
                              </label>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {!loading ? "ثبت‌نام" : "در حال ثبت‌نام"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              ) : registerStep === RegisterStep.OTP ? (
                <CardContent key={RegisterStep.OTP}>
                  <Form {...otpForm}>
                    <form
                      onSubmit={otpForm.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>کد</FormLabel>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
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
                        {!loading ? "تایید" : "در حال تایید"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              ) : null}
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
