import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BackLink() {
  return (
    <Link
      href="/children"
      className="inline-flex bg-background p-4 rounded-full absolute left-24 items-center text-text shadow-2xl hover:text-primary transition-colors"
    >
      <ChevronLeft size={26} />
    </Link>
  );
}
