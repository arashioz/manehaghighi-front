import { BASE_URL } from "@/api/api";
import { MyCourseTable } from "@/components/Account/MyCourseTable";
import { User } from "@/types";
import { cookies } from "next/headers";

export default async function AccountCourses() {
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
      <MyCourseTable data={data.courses} />
    </main>
  );
}
