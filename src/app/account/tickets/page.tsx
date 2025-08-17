import { BASE_URL } from "@/api/api";
import CreateTicketModal from "@/components/Account/CreateTicket";
import { MyTicketTable } from "@/components/Account/MyTicketTable";
import { User } from "@/types";
import { cookies } from "next/headers";

export default async function AccountTickets() {
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
      <CreateTicketModal />
      <MyTicketTable data={data.tickets} />
    </main>
  );
}
