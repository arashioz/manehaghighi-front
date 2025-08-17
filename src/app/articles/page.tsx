import { BASE_URL } from "@/api/api";
import CourseCard from "@/components/Articles/ArticleCard";
import Filter from "@/components/Articles/Filter";
import { Article } from "@/types";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "مقالات من حقیقی",
  description: "مقالات من حقیقی",
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
  const res = await fetch(`${BASE_URL}/article${query}`, {
    cache: "no-store",
  });
  const articles: Article[] = await res.json();

  return (
    <main className="container mx-auto">
      <h1 className="mb-4 mt-8 text-center text-5xl font-bold">
        مقالات من حقیقی
      </h1>
      <Filter search={searchParams.search} />
      <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((course, index) => (
          <CourseCard key={index} article={course} />
        ))}
      </div>
    </main>
  );
}
