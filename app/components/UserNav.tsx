
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import Link from 'next/link'
import { CreditCard, DoorClosed, Home, Settings } from 'lucide-react'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {User} from "lucide-react"
import Image from 'next/image'
export const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard }
]

const UserNav = ({name,email,image}:{name:string,email:string,image:string}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='h-10 w-10 rounded-full relative'>
                    <Avatar className='h-10 w-10 rounded-full'>
                        <AvatarImage src={image} alt='' />
                        <AvatarFallback >
                            <User />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' forceMount>
                <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                        <p>{name}</p>
                        <p className='text-muted-foreground'>{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <DropdownMenuItem asChild key={index}>
                            <Link href={item.href} className='flex justify-between' >
                               
                                <p >{item.name}</p>
                                <span><item.icon /></span>
                                
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <LogoutLink className='flex justify-between'>
                          
                            logout
                            <DoorClosed  />
                         
                        </LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav

