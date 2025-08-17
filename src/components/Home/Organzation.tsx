import Image from "next/image";

const organizations = [
  {
    title: "چای احمد",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/ahmad-tea.png",
  },
  {
    title: "چای محمود",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/mahmoud-tea.png",
  },
  {
    title: "دانشگاه امیرکبیر",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/amirkabir-university.png",
  },
  {
    title: "دانشگاه تهران",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/tehran-university.png",
  },
  {
    title: "دانشگاه بهشتی",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/beheshti-university.png",
  },
  {
    title: "بارز",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/barez.png",
  },
  {
    title: "بانک ملت",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/melat-bank.png",
  },
  {
    title: "هتل هما",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/homa-hotel.png",
  },
  {
    title: "ایران خودرو",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/irankhodro.png",
  },
  {
    title: "مهرگان",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/mehregan.png",
  },
  {
    title: "شهرداری",
    image:
      "https://mane-haghighi-bucket.storage.c2.liara.space/assets/organizations/municipality.png",
  },
];

export default function Organization() {
  return (
    <div className="my-16">
      <h2 className="text-center text-3xl font-bold text-purple-700">
        سازمان هایی که به ما اعتماد کردند
      </h2>
      <ul className="flex flex-wrap items-center justify-center gap-6">
        {organizations.map((organization, index) => (
          <li key={index} className="mt-8 flex items-center justify-center">
            <Image
              width={64}
              height={64}
              src={organization.image}
              alt={organization.title}
              className="object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
