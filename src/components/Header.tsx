import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/goat.png"
          height={60}
          width={60}
          alt="Logo Image"
          className="rounded-full"
        />
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          Goat <span>Notes</span>
        </h1>
      </Link>
    </header>
  );
}

export default Header;
