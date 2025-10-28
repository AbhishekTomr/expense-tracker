import Image from "next/image";
import FullLogo from "../../public/full_logo.svg";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 border-2">
      <Link href={"/"}>
        <Image src={FullLogo} alt="logo" width={150} height={100} />
      </Link>
      <div>
        <SignedOut>
          <Button asChild className="w-[100px] mx-1">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
          <Button variant={"ghost"} className="w-[100px] mx-1" asChild>
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
