"use client"

import Link from "next/link"
import { useState } from "react"
import { Poppins } from "next/font/google"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { NavbarSidebar } from "./navbar-sidebar"
import { MenuIcon } from "lucide-react"

const poppins = Poppins({
    variable: "--font-geist-sans",
    weight: ["700"],
})

interface NavbarItemsProps {
    href: string
    children: React.ReactNode
    isActive?: boolean
}

const NavbarItems = ({
    href,
    children,
    isActive
}: NavbarItemsProps) => {
    return (
        <Button
            asChild
            variant="outline"
            className={cn(
                "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
                isActive && "bg-black text-white hover:bg-black hover:text-white"
            )}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}

const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/features", children: "Features" },
    { href: "/pricing", children: "Pricing" },
    { href: "/contact", children: "Contact" }
]

export const Navbar = () => {

    const pathname = usePathname()
    const [isSiderbarOpen, setIsSiderbarOpen] = useState(false)

    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link className="pl-6 flex items-center" href="/">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    tecshop
                </span>
            </Link>

            <NavbarSidebar
                items={navbarItems}
                open={isSiderbarOpen}
                onOpenChange={setIsSiderbarOpen}
            />

            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItems
                        key={item.href}
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.children}
                    </NavbarItems>
                ))}
            </div>

            <div className="hidden lg:flex">
                <Button
                    asChild
                    variant="secondary"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white
                    hover:bg-pink-400 transition-colors text-lg"
                >
                    <Link href="/sign-in">
                        Log In
                    </Link>

                </Button>
                <Button
                    asChild
                    variant="secondary"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black
                hover:bg-pink-400 transition-colors text-lg text-white hover:text-black"
                >
                    <Link href="/sign-up">
                        Start Selling
                    </Link>
                </Button>
            </div>

            <div className="flex lg:hidden justify-center items-center">
                <Button
                    variant="ghost"
                    className="size-12 border-transparent bg-white"
                    onClick={() =>
                        setIsSiderbarOpen(!isSiderbarOpen)
                    }
                >
                    <MenuIcon />
                </Button>
            </div>
        </nav>
    )
}