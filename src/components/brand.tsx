import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({
  inverse = false,
  compact = false,
  className,
}: {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="Sufiaw Store, ir al inicio"
    >
      <Image
        src="/logo-mark.svg"
        alt=""
        width={36}
        height={36}
        className={cn("size-9", inverse && "invert")}
      />
      {!compact && (
        <span className="text-sm font-bold uppercase tracking-[0.2em]">
          Sufiaw Store
        </span>
      )}
    </Link>
  );
}
