import { BASE_URL } from "@/api/api";
import CourseCard from "@/components/Courses/CourseCard";
import Filter from "@/components/Courses/Filter";
import { Course } from "@/types";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "دوره‌های آموزشی من حقیقی",
  description: "دوره‌های آموزشی من حقیقی",
};

export default async function Courses({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  let query = "";
  if (searchParams.search) {
    query = `?search=${searchParams.search}`;
  }
  const res = await fetch(`${BASE_URL}/course/${query}`, { cache: "no-store" });
  const courses: Course[] = await res.json();

  return (
    <main className="container mx-auto">
      <h1 className="mb-4 mt-8 text-center text-5xl font-bold">
        دوره‌های من حقیقی
      </h1>
      <Filter search={searchParams.search} />
      <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </main>
  );
}
