"use client";

import { FaLinkedinIn } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  // {
  //   label: "حساب کاربری",
  //   href: "/account",
  // },
  // {
  //   label: "تماس با ما",
  //   href: "/account",
  // },
  {
    label: "مقالات",
    href: "/articles",
  },
  {
    label: "دوره‌ها",
    href: "/courses",
  },
  // {
  //   label: "قوانین و مقررات",
  //   href: "/account",
  // },
  // {
  //   label: "آموزش ثبت‌نام در دوره‌ها",
  //   href: "/account",
  // },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/account")) {
    return null;
  }

  return (
    <footer className="bg-[#525084] py-4 pb-0">
      <div className="flex items-center gap-8 px-4">
        <div className="h-[1px] w-full bg-white"></div>
        <div>
          <Image
            src="https://mane-haghighi-bucket.storage.c2.liara.space/assets/signature.png"
            width={300}
            height={100}
            alt="امضا"
            onContextMenu={(e) => e.preventDefault()}
            onDragExit={(e) => e.preventDefault()}
            onDrag={(e) => e.preventDefault()}
            onDragEnd={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <div className="h-[1px] w-full bg-white"></div>
      </div>
      <div className="my-8 grid grid-cols-1 gap-8 px-4 sm:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl text-white">تماس با ما</h3>
            <div className="h-[1px] w-full max-w-[300px] bg-white"></div>
            <a className="text-white underline" href="tel:021-91690112">
              ۰۲۱-۹۱۶۹۰۱۱۲
            </a>
            <a
              className="text-white underline"
              href="mailto:info@manehaghighi.com"
            >
              info@manehaghighi.com
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl text-white">دسترسی سریع</h3>
            <div className="h-[1px] w-full max-w-[300px] bg-white"></div>
            <ul className="grid w-fit grid-cols-2 gap-5">
              {links.map((link, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#E2AC22]"></div>
                  <Link className="text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl text-white">نماد ها</h3>
            <div className="h-[1px] w-full max-w-[300px] bg-white"></div>
            <ul className="flex items-center gap-2">
              <li>
                <Image
                  src={
                    "https://mane-haghighi-bucket.storage.c2.liara.space/assets/namad-1.png"
                  }
                  alt="نماد"
                  width={100}
                  height={100}
                />
              </li>
              <li>
                <Image
                  src={
                    "https://mane-haghighi-bucket.storage.c2.liara.space/assets/namad-2.png"
                  }
                  alt="نشان ملی"
                  width={100}
                  height={100}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-[#464479] p-4">
        <p className="text-sm text-gray-200">
          © 2024 کلیه حقوق مادی و ومعنوی این وبسایت متعلق به موسسه من حقیقی می
          باشد.
        </p>
        <div className="flex gap-2">
          <a href="https://www.linkedin.com/authwall?trk=gf&trkInfo=AQGu5mUMDICUggAAAYs-G_bwY6njeSTNXGw43_9dYGF0qU9-XMEUJEV_EBcCHnbYMgDa2AXh6n-C9XQta_oKZoYpDgua8n4i2rKqVDCQFHiR4qfpQoM_YTrj4frncsOk11cvEqU=&original_referer=https://manehaghighi.com/&sessionRedirect=https%3A%2F%2Fir.linkedin.com%2Fin%2Ffarazghoorchian">
            <FaLinkedinIn
              className="w-[20px] cursor-pointer text-white opacity-75"
              size={24}
            />
          </a>
          <a href="https://telegram.me/manehaghighi">
            <FaTelegram
              className="w-[20px] cursor-pointer text-white opacity-75"
              size={24}
            />
          </a>
          <a href="https://www.youtube.com/channel/UCb2JGON4aEksV2Z8dHGEdYw#:~:text=%D9%85%D9%86%20%D9%81%D8%B1%D8%A7%D8%B2%20%D9%82%D9%88%D8%B1%DA%86%DB%8C%D8%A7%D9%86%20%D9%85%D9%88%D8%B3%D8%B3%20%D9%88,%D8%A8%D9%87%20%D8%A2%D8%B1%D8%A7%D9%85%D8%B4%20%D9%88%20%D9%85%D9%88%D9%81%D9%82%DB%8C%D8%AA%20%D8%A8%D8%B1%D8%B3%D9%86.">
            <FaYoutube
              className="w-[20px] cursor-pointer text-white opacity-75"
              size={24}
            />
          </a>
          <a href="https://twitter.com/FarazGhoorchian">
            <FaXTwitter
              className="w-[20px] cursor-pointer text-white opacity-75"
              size={24}
            />
          </a>
          <a href="https://www.facebook.com/faraz.ghoorchian/">
            <FaFacebookF
              className="w-[20px] cursor-pointer text-white opacity-75"
              size={24}
            />
          </a>
          <a href="https://www.instagram.com/faraz_ghoorchian/?hl=fa">
            <FaInstagram
              className="w-[20px] cursor-pointer text-white opacity-75"
              size={24}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
