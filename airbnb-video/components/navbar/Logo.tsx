"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
    return (
        <div className="hidden md:block cursor-pointer">
            <Image
            alt="Logo"
            width={100}
            height={100}
            src='/images/logo.png' />
        </div>
        
    )
}

export default Logo
