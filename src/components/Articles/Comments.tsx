import { BASE_URL } from "@/api/api";
import { FaUser } from "react-icons/fa";

export default async function Comments({ articleId }: { articleId: number }) {
  const res = await fetch(`${BASE_URL}/comment/article/${articleId}`, { cache: "no-store" });
  const data = await res.json();

  return (
    <section className="mt-2 flex flex-col gap-2">
      {
        data.map((comment: any) => (
          <div key={comment.id} className="border border-gray-100 p-2 rounded-lg">
            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <FaUser className="-mt-1" />
              <span>{comment.user.name}</span>
            </h4>
            <p>{comment.content}</p>
          </div>
        ))
      }
    </section>
  );
}
