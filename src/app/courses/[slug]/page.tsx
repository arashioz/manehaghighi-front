import { BASE_URL } from "@/api/api";
import CommentForm from "@/components/Courses/CommentForm";
import Comments from "@/components/Courses/Comments";
import Episodes from "@/components/Courses/Episodes";
import PurchaseButton from "@/components/Courses/PurchaseButton";
import { Button } from "@/components/ui/button";
import { numberSeparator, persianNumber } from "@/lib/utils";
import { Course } from "@/types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FaRegRectangleList } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiPencilFill } from "react-icons/pi";
import { RxUpdate } from "react-icons/rx";
import { WiTime10 } from "react-icons/wi";

export default async function CourseDetails({
  params,
}: {
  params: { slug: string };
}) {
  const resCourse = await fetch(`${BASE_URL}/course/${params.slug}`, {
    next: { revalidate: 60 },
  });
  const course: Course = await resCourse.json();
  const resMeHaveCourse = await fetch(
    `${BASE_URL}/user/meHaveCourse/${course.id}`,
    {
      headers: {
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
      cache: "no-store",
    }
  );
  const meHaveCourse = await resMeHaveCourse.json();
  const isAuth = cookies().get("token");

  return (
    <main className="container mx-auto py-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
        <video
          controls
          className="rounded-lg w-full lg:col-span-3 min-h-[400px]"
          src={course.Intro}
        />
        <div className="flex flex-col gap-2 bg-purple-700 text-white rounded-lg p-4">
          <h1 className="text-center text-4xl font-bold mb-5">
            دوره {course.title}
          </h1>
          <h2 className="flex justify-center items-center text-lg gap-2">
            <span>
              <WiTime10 className="text-2xl -mt-1" />
            </span>
            <span className="font-bold">{course.time}</span>
          </h2>
          <hr className="my-1" />
          <h2 className="flex justify-center items-center text-lg gap-2">
            <span>
              <HiOutlineDocumentText className="text-2xl -mt-1" />
            </span>
            <span className="font-bold">{course.seasons} سرفصل</span>
          </h2>
          <hr className="my-1" />
          <h2 className="flex justify-center items-center text-lg gap-2 bg-purple-800 rounded-md">
            <span className="font-bold text-3xl whitespace-nowrap p-2">
              {persianNumber(numberSeparator(course.price))} تومان
            </span>
          </h2>
          <PurchaseButton
            isAuth={!!isAuth}
            courseId={course.id}
            meHaveCourse={meHaveCourse?.haveCourse}
          />
        </div>
      </div>
      <div className="mt-5 shadow-3xl bg-gray-100/50 p-4 rounded-lg">
        <h2 className="text-center text-3xl font-bold">توضیحات دوره</h2>
        <p className="mt-5">{course.description}</p>
      </div>
      <div className="mt-5 shadow-3xl bg-gray-100/50 p-4 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
          <div className="relative mx-auto px-2">
            <Image
              src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/biography.webp"
              alt="بیوگرافی"
              width={500}
              height={400}
              className="rounded-full rounded-ss-md object-cover"
            />
            <div className="absolute inset-0 rounded-full rounded-ss-md bg-gradient-to-t from-[#1f0527] to-transparent opacity-75"></div>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-center text-3xl font-bold">
              مدرس این دوره کیست؟
            </h2>
            <p className="text-justify opacity-75">
              فراز قورچیان موسس و راهبر موسسه پیشگامان من حقیقی با برگزاری بیش
              از 1000 گارگاه آموزشی متخصص های کسب و کار که تجربه واقعی و زنده از
              کسب و کار دارند،مربی های با سابقه در زمینه ی خودشناسی پیشرفته و
              محققین مختلف و یک گروه کارکشته در قالب ساعت ها آموزش
              غیرحضوری،حضوری و کوچینگ خصوصی و گروهی به شما کمک میکنیم
              که:استعدادهای خود را کشف کنید،معنای جدیدی برای زندگی پیدا کنید،هدف
              زندگی خود را کشف و خود حقیقی تان را بیابید،از سردرگمی نجات
              یابید،کسب و کار موفقی داشته باشید،روابط سالم ،زنده و پویایی را
              تجربه کنید،در کنار هزاران نفر که برای رشد خود در تلاش و تکاپو
              هستند قدم بردارید.
            </p>
            <div className="flex justify-center items-center">
              <Link href="/biography" passHref>
                <Button>بیشتر بدانید</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 shadow-3xl bg-gray-100/50 p-4 rounded-lg">
        <h2 className="text-center text-3xl font-bold text-purple-700">
          ما تنهاتون نمیذاریم!
        </h2>
        <p className="text-center mt-5 font-bold text-2xl">
          شما بعد از شرکت در دوره احساس ارزشمندی از خدمات زیر بهرمند میشوید.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          <div className="flex justify-center items-center gap-2">
            <BiSupport className="text-3xl text-purple-700" />
            <span className="text-2xl">پشتیبانی ۲۴ ساعته</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <FaRegRectangleList className="text-3xl text-purple-700" />
            <span className="text-2xl">ارائه لیست چکاپ</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <RxUpdate className="text-3xl text-purple-700" />
            <span className="text-2xl">آپدیت رایگان</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <AiOutlineSafetyCertificate className="text-3xl text-purple-700" />
            <span className="text-2xl">گواهی (در صورت درخواست)</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <IoPricetagsOutline className="text-3xl text-purple-700" />
            <span className="text-2xl">شرکت در قرعه کشی</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <PiPencilFill className="text-3xl text-purple-700" />
            <span className="text-2xl">آزمون</span>
          </div>
        </div>
      </div>
      <Episodes course={course} />
      <section className="mt-8 shadow-md p-4 rounded-lg container mx-auto">
        <CommentForm courseId={course.id} isAuth={!!isAuth?.value} />
        <Comments courseId={course.id} />
      </section>
    </main>
  );
}
