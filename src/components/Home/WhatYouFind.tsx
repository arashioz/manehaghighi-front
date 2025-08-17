import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const whatYouFind = [
  {
    title: "کتاب",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/books/books.webp",
  },
  {
    title: "دوره آموزشی",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/books/course.webp",
  },
  {
    title: "پادکست",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/books/podcast.webp",
  },
  {
    title: "راهبری",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/books/rahbari.webp",
  },
  {
    title: "گفتگو",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/books/speakings.webp",
  },
];

const celebrities = [
  {
    name: "ناصر زینالی",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/naser-zinali.webp",
  },
  {
    name: "فرخنده فرمانی زاده",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/farkhonde-farmanizade.webp",
  },
  {
    name: "محمد علی بهمنی",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/mohammad-ali-bahmani.webp",
  },
  {
    name: "لادن مستوفی",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/ladan-mastoufi.webp",
  },
  {
    name: "مجید ترکمان",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/majid-torkaman.webp",
  },
  {
    name: "شراره رخام",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/sharare-rokham.webp",
  },
  {
    name: "رضا بنفشه خواه",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/reza-banafshehkhah.webp",
  },
  {
    name: "فریبا کوثری",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities/fariba-kosari.webp",
  },
];

export default function WhatYouFind() {
  return (
    <div className="mt-8 flex flex-col gap-6 rounded-lg bg-gray-100 px-4 py-4">
      <h2 className="text-center text-3xl font-bold text-gray-600">
        اینجا چی پیدا میکنی؟
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {whatYouFind.map((item) => (
          <div key={item.title} className="overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={200}
              className="w-full object-contain"
            />
            <p className="text-center text-xl font-bold text-purple-700">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-6 rounded-lg bg-white px-2 py-4 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-purple-700">
          همراهان ویژه من حقیقی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
          {celebrities.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-2">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="rounded-full"
              />
              <p className="text-center text-2xl font-bold text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <Link href="/celebrities" passHref className="w-fit mx-auto">
          <Button className="mt-8 bg-purple-500">مشاهده همه</Button>
        </Link>
      </div>
    </div>
  );
}
