import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "فراز گیفت",
  description: "فراز گیفت",
};

export default function FarazGiftPage() {
  return (
    <main className="container mx-auto">
      <h1 className="mb-4 mt-8 text-center text-5xl font-bold">فراز گیفت</h1>
      <video
        src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/faraz-gift/200B.mp4"
        className="w-full h-auto rounded-lg mb-5"
        controls
      />
    </main>
  );
}
