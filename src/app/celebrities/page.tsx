const videoLinks = [
  {
    title: "فریبا کوثری",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/fariba-kosari.mp4",
  },
  {
    title: "فرخنده فرمانی زاده",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/farkhonde-farmanizade.mp4",
  },
  {
    title: "لادن مستوفی",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/ladan-mostofi.mp4",
  },
  {
    title: "شراره رخام",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/farkhonde-farmanizade.mp4",
  },
  {
    title: "مجید ترکمان",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/majid-torkaman.mp4",
  },
  {
    title: "ناصر زینالی",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/naser-zeynali.mp4",
  },
  {
    title: "محمدعلی بهمنی",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/mohammadali-bahmani.mp4",
  },
  {
    title: "رضا بنفشه خواه",
    link: "https://mane-haghighi-bucket.storage.c2.liara.space/assets/celebrities-videos/reza-banafshekhah.mp4",
  },
];

export default function CelebritiesPage() {
  return (
    <main className="container mx-auto">
      <h1 className="mb-4 mt-8 text-center text-5xl font-bold">
        همراهان ویژه من حقیقی
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {videoLinks.map((video, index) => (
          <div key={index}>
            <video
              src={video.link}
              className="w-full h-auto rounded-lg"
              controls
            />
            <p className="text-center my-2 text-lg">{video.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
