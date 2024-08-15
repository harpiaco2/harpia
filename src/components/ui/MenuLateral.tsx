"use client";

import { FaHome } from "react-icons/fa";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MenuLateral() {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger className="m-4">
        <Image src="/logo.svg" alt="Logo" width={45} height={45} />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[400px] sm:w-[300px]">
        <SheetHeader className="m-3">
          <SheetTitle className="flex gap-4 items-center">
            <Image src="/logo.svg" alt="Logo" width={45} height={45} />
            Painel Harpia TCU
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col m-6 mt-10 gap-4">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="ghost"
            className="flex items-center justify-start gap-3"
          >
            <FaHome size="25px" />
            Home
          </Button>
          <Button
            onClick={() => router.push("/form/infra")}
            variant="ghost"
            className="flex items-center justify-start gap-3"
          >
            <BsFillFileEarmarkSpreadsheetFill size="25px" />
            Formulário
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
