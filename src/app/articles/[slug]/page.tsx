import { BASE_URL } from "@/api/api";
import CommentForm from "@/components/Articles/CommentForm";
import Comments from "@/components/Articles/Comments";
import { cookies } from "next/headers";
// import Sections from "@/components/Articles/Sections";
import Image from "next/image";

// const sections = [
//   " 7 روش برخورد با همکاران زن در محیط کار چگونه باید باشد؟",
//   "راهکارهای صحیح برخورد با همکار زن در محیط کار",
// ];

export default async function ArticlesDetail({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${BASE_URL}/article/${params.slug}`, { next: { revalidate: 60 } });
  const article = await res.json();
  const isAuth = cookies().get("token");

  return (
    <main className="w-full my-12">
      <article className="prose-base shadow-xl p-4 rounded-lg container mx-auto">
        <Image
          src={article.hero}
          alt={params.slug}
          width={1280}
          height={720}
          priority
          className="object-cover rounded-lg h-[500px] w-full"
        />
        <h1 className="text-center font-bold">
          {article.title}
        </h1>
        {/* <Sections sections={sections} /> */}
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
      <section className="mt-8 shadow-md p-4 rounded-lg container mx-auto">
        <CommentForm articleId={article.id} isAuth={!!isAuth?.value} />
        <Comments articleId={article.id} />
      </section>
    </main>
  );
}
