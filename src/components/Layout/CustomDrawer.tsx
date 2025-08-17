"use client";

import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";

export default function CustomDrawer({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <button className="aspect-square sm:hidden">
          <RiMenu3Fill className="text-xl" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-xl">منو اصلی</DrawerTitle>
            <DrawerDescription className="text-sm">
              در این بخش می‌توانید با کلیک بر روی لینک مورد نظر خود به صفحه
              مربوطه هدایت شوید
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      "hover:text-purple-600 hover:text-primary-500 block rounded-md py-2 text-center text-lg text-gray-800 shadow-sm transition-colors duration-200 ease-in-out"
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">بستن</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
