import { Button } from "./button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-center m-1">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} />
    </div>
  );
};
export default Header;
