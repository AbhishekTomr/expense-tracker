import Image from "next/image";
import FullLogo from "../../public/full_logo.svg";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 border-2">
      <Link href={"/"}>
        <Image src={FullLogo} alt="logo" width={150} height={100} />
      </Link>
      <SignedOut>
        <Button asChild className="w-[100px] mx-1">
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
        <Button variant={"ghost"} className="w-[100px] mx-1" asChild>
          <Link href={"/sign-up"}>Sign Up</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="flex gap-10">
          <div className="bg-gray-100 border-2 w-2xl p-2 flex gap-1">
            <SearchIcon className="mr-1" />
            Search Bar
          </div>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}

export default Header;
