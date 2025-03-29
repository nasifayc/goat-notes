import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./DarkModeToggler";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();
  return (
    <header
      className="relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <SidebarTrigger className="absolute top-1 left-1" />
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

      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}

        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
