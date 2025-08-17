import { BiSupport } from "react-icons/bi";
import { RocketIcon } from "@radix-ui/react-icons";
import { LuListVideo } from "react-icons/lu";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { FaWallet } from "react-icons/fa";
import { BASE_URL } from "@/api/api";
import { cookies } from "next/headers";
import { persianNumber } from "@/lib/utils";
import Link from "next/link";
import { User } from "@/types";
import QuestionChart from "@/components/Account/QuestionChart";

export default async function Account() {
  const token = cookies().get("token");
  const res = await fetch(`${BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-store",
  });
  const data: User = await res.json();

  return (
    <main className="container mx-auto py-6">
      <Alert className="bg-purple-600 text-white shadow-lg">
        <AlertTitle className="text-right font-bold flex items-center gap-2 text-xl">
          <RocketIcon className="h-6 w-6" />
          <span>{data.name} عزیز ، به زندگی جدیدت خوش اومدی!</span>
        </AlertTitle>
      </Alert>
      <Image
        src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/account.jpg"
        alt="تبلیغ"
        width={1280}
        height={400}
        className="w-full rounded-lg shadow-lg mt-2 object-contain"
        priority
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
        <div className="aspect-square w-full max-h-[100px] sm:max-h-[200px] bg-green-600/80 rounded-lg shadow-lg flex flex-col justify-center items-center gap-2">
          <LuListVideo className="text-white text-3xl" />
          <Link
            href="/account/courses"
            className="text-center text-white font-semibold w-full text-xl"
          >
            دوره‌های من
          </Link>
          <p className="text-sm text-white/60">
            تعداد دوره‌های خریداری شده: {persianNumber(data.courses.length)}
          </p>
        </div>
        <div className="aspect-square w-full max-h-[100px] sm:max-h-[200px] bg-orange-600/80 rounded-lg shadow-lg flex flex-col justify-center items-center gap-2">
          <FaWallet className="text-white text-2xl" />
          <p className="text-center text-white font-semibold w-full text-xl">
            کیف پول من
          </p>
          <p className="text-sm text-white/60">موجودی کیف پول: ۰ تومان</p>
        </div>
        <div className="aspect-square w-full max-h-[100px] sm:max-h-[200px] bg-blue-600/80 rounded-lg shadow-lg flex flex-col justify-center items-center gap-2">
          <BiSupport className="text-white text-3xl" />
          <Link
            href="/account/tickets"
            className="text-center text-white font-semibold w-full text-xl"
          >
            تیکت‌های من
          </Link>
          <p className="text-sm text-white/60">
            تعداد تیکت‌های باز: {persianNumber(data.tickets.length)}
          </p>
        </div>
      </div>
      <QuestionChart />
    </main>
  );
}
