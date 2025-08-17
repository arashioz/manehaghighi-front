"use client";

import Image from "next/image";
import CustomDrawer from "../Layout/CustomDrawer";

import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { Button } from "../ui/button";
import { CustomLoginDialog } from "./CustomLoginDialog";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export const navLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/courses", label: "دوره ها" },
  { href: "/articles", label: "مقالات" },
  { href: "/biography", label: "بیوگرافی" },
  // { href: "/contact", label: "ارتباط با ما" },
];

export const accountLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/account", label: "پنل کاربری" },
  { href: "/account/courses", label: "دوره‌های من" },
  { href: "/account/tickets", label: "تیکت‌ها" },
  { href: "/account/questions", label: "آزمون جدید" },
  { href: "/account/survey", label: "نظرسنجی" },
];

export default function Navbar({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex items-center justify-between bg-white px-4 py-2 shadow-lg">
      <CustomDrawer
        links={pathname.startsWith("/account") ? accountLinks : navLinks}
      />
      <div className="logo">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="من حقیقی"
            width={160}
            height={50}
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <nav className="hidden sm:block">
        <ul className="flex gap-6">
          {(pathname.startsWith("/account") ? accountLinks : navLinks).map(
            (link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            )
          )}
        </ul>
      </nav>
      {isAuth ? (
        pathname.startsWith("/account") ? (
          <Link href="/account">
            <Button
              className="bg-purple-600 p-0 w-[70px]"
              onClick={handleLogout}
            >
              خروج
            </Button>
          </Link>
        ) : (
          <Link href="/account">
            <Button className="aspect-square bg-purple-600 p-0 sm:aspect-auto sm:px-2 sm:py-4">
              <CiUser className="block h-6 w-6 sm:hidden" />
              <span className="hidden sm:block">پنل کاربری</span>
            </Button>
          </Link>
        )
      ) : (
        <CustomLoginDialog />
      )}
    </header>
  );
}
