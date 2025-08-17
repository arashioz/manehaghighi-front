import { cn } from "@/lib/utils";
import Link from "next/link";

type CustomLinkProps = {
  href: string;
  title: string;
  className?: string;
};

export default function CustomLink({
  href,
  title,
  className,
}: CustomLinkProps) {
  return (
    <Link
      href={href}
      className={cn("text-gray-700 hover:text-purple-600", className)}
    >
      {title}
    </Link>
  );
}
