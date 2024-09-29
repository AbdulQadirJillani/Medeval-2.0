"use client"

import Image from "next/image";
import logo from "../_assets/logo.png"
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter()
  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push("/")}>
        <Image className="w-[42px] h-[35px]" src={logo} alt="logo"/>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(202,_100%,_56%)] via-[hsl(269,_100%,_61%)] to-[hsl(343,_100%,_50%)]">Medeval</h1>
    </div>
  )
}

export default Logo