import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="mt-6 rounded-lg">
        <Image
          src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/header.webp"
          alt="هدر"
          width={1920}
          height={1080}
          className="hidden h-[500px] w-full rounded-lg object-cover sm:block"
          priority
        />
        <Image
          src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/header-mobile.webp"
          alt="هدر"
          width={400}
          height={600}
          className="block h-[500px] w-full rounded-lg object-cover sm:hidden"
          priority
        />
      </div>

      <div className="z-10 mx-auto -mt-16 grid w-fit grid-cols-2 place-items-center gap-6 md:grid-cols-3">
        <Link
          href="/courses"
          className="flex w-[150px] flex-col items-center rounded-lg bg-white p-4 shadow-md sm:w-[200px]"
        >
          <Image
            width={64}
            height={64}
            src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/hero/video-channel.gif"
            alt="دوره ها"
            className="mb-2 h-20 w-20"
          />
          <span className="text-purple-600">دوره ها</span>
        </Link>
        <Link
          href="/articles"
          className="flex w-[150px] flex-col items-center rounded-lg bg-white p-4 shadow-md sm:w-[200px]"
        >
          <Image
            width={64}
            height={64}
            src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/hero/book.gif"
            alt="مقالات"
            className="mb-2 h-20 w-20"
          />
          <span className="text-purple-600">مقالات</span>
        </Link>
        <Link
          href="/faraz-gift"
          className="flex w-[150px] flex-col items-center rounded-lg bg-white p-4 shadow-md sm:w-[200px]"
        >
          <Image
            width={64}
            height={64}
            src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/hero/gift.gif"
            alt="فراز گیفت"
            className="mb-2 h-20 w-20"
          />
          <span className="text-purple-600">فراز گیفت</span>
        </Link>
      </div>
    </>
  );
}
