import { BASE_URL } from "@/api/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PaymentVerify({
  searchParams,
}:{
  searchParams: { Authority: string, Status: string }
}) {
  const res = await fetch(`${BASE_URL}/payment/verify?Status=${searchParams.Status}&Authority=${searchParams.Authority}`, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`
    },
  });
  const data = await res.json();
  revalidatePath('/account');
  revalidatePath('/account/courses');

  if(data.url) {
    redirect(data.url);
  } else {
    redirect('/payment-failed');
  }

  return (
    <div></div>
  );
}
