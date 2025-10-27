import Image from "next/image";
import FullLogo from "../../public/full_logo.svg";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="flex justify-between border-2 shadow-sm p-5">
      <Image src={FullLogo} alt="logo" width={150} height={100} />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
