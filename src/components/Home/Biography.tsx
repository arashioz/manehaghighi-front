import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Biography() {
  return (
    <div className="mt-16 grid grid-cols-1 place-content-center gap-4 md:grid-cols-2">
      <div className="relative mx-auto px-2">
        <Image
          src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/biography.webp"
          alt="بیوگرافی"
          width={500}
          height={400}
          className="rounded-full rounded-ss-md object-cover"
        />
        <div className="absolute inset-0 rounded-full rounded-ss-md bg-gradient-to-t from-[#1f0527] to-transparent opacity-75"></div>
        <div className="absolute start-[-10px] top-[-10px] flex w-[110px] flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-t from-[#9D74ED] to-[#180145] p-2 text-white shadow-lg">
          <span className="text-2xl">3M</span>
          <span className="text-xs">دنبال کننده</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 px-4">
        <h2 className="w-full text-3xl font-bold">فراز قورچیان کیست؟</h2>
        <p className="w-full leading-7 text-gray-600">
          فراز قورچیان موسس،مدیرعامل و راهبر گروه آموزشی من حقیقی می باشند.ایشان
          به عنوان محقق،مدرس و سخنران در حوزه ی خودآگاهی و توسعه ی فردی و معنا
          مشغول به فعالیت می باشند.همچنین به عنوان یک کارآفرین مدیریت و رهبری
          تیم کارکنان من حقیقی را برای رسیدن به اهداف، ماموریت و چشم انداز
          سازمان بر عهده دارند.
          <br /> برگزاری موفقیت آمیز بیش از دو هزار کارگاه آموزشی برای بیش از
          دویست هزار نفر در زمینه های مختلف خودشناسی، ناخودآگاه، روابط عاطفی و
          روابط مالی بخشی از فعالیت های درخشان ایشان در مدت هجده سال گذشته می
          باشد.
        </p>
        <div>
          <Link href="/biography">
            <Button className="bg-purple-600">
              <span className="text-white">بیشتر بخوانید</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
