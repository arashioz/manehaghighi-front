import { Article } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl h-[400px]">
      <Image
        className="h-[200px] w-full object-contain object-center"
        width={720}
        height={200}
        src={article.hero}
        alt={article.title}
      />
      <div className="flex flex-col justify-between gap-2 h-[200px]">
        <div className="p-4">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            {article.title}
          </h2>
        </div>
        <p className="-mt-4 text-sm px-2">{article.description}</p>
        <Link
          href={`/articles/${article.enTitle}`}
          className="flex items-center justify-center rounded rounded-t-none bg-purple-600 px-3 py-3 text-xs font-medium uppercase text-white"
        >
          <span className="w-full text-center text-lg font-semibold">
            بیشتر بخوانید
          </span>
        </Link>
      </div>
    </div>
  );
}
