import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const courses = [
  {
    link: "/courses/1",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/course-introcution/A Journey into Deep Self Moarefi Dore Site.jpg",
    title: "دوره",
  },
  {
    link: "/courses/2",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/course-introcution/A Journey into Unconscious Mind Moarefi Dore Site.jpg",
    title: "دوره",
  },
  {
    link: "/courses/3",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/course-introcution/Act  of Courage Moarefi Dore Site.jpg",
    title: "دوره",
  },
  {
    link: "/courses/4",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/course-introcution/Divine Providence Moarefi Dore Site.jpg",
    title: "دوره",
  },
  {
    link: "/courses/5",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/course-introcution/Enerzhi Pool Moarefi Dore Site.jpg",
    title: "دوره",
  },
  {
    link: "/courses/6",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/course-introcution/From Weakness to Strength Moarefi Dore Site.jpg",
    title: "دوره",
  },
];
export default function Courses() {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <h2 className="text-center text-3xl font-bold">
        پر مخاطب ترین دوره های آموزشی
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.link}
            href={course.link}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <Image
              src={course.image}
              alt={course.title}
              width={300}
              height={200}
              className="h-48 w-full object-cover"
            />
          </Link>
        ))}
      </div>
      <Link href="/courses" className="mx-auto max-w-fit">
        <Button className="bg-purple-600">مشاهده تمام دوره ها</Button>
      </Link>
    </div>
  );
}
