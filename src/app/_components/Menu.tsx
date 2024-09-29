"use client"

import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { LucideDiamond } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  className: string,
  setOpen: Dispatch<SetStateAction<boolean>>
}
  
const Menu = ({ className, setOpen }: Props) => {
  const years = ['1st-year', '2nd-year', '3rd-year', '4th-year']
  const close = () => {
    setOpen(false)
  }

  return (
    <div className={className}>
      <Link className="px-4 py-2 text-lg" href="/SystemReview" onClick={close}>
        System Review
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-normal">
              Past Papers
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[143px] p-4 space-y-3">
                {
                  years.map((y) => (
                    <li key={y}>
                      <NavigationMenuLink className={cn("flex gap-1 items text-[#505d70]", navigationMenuTriggerStyle())}>
                        <LucideDiamond size={10}/>
                        <Link href={`/PastPapers/${y}`} onClick={close}>
                          {y.split('-').join(' ')}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))
                }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Menu