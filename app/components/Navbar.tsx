import Link from 'next/link'
import React from 'react'

import { ThemeToggle } from './Themetoggle'
import { Button } from '@/components/ui/button'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession  } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from './UserNav';
const Navbar = async () => {
    const { isAuthenticated , getUser } = getKindeServerSession();
    const user = await getUser();
    // console.log(user?.picture);
    
    return (
        <nav className='border-b bg-background h-[10vh] flex items-center'>
            <div className='container flex items-center justify-between'>
                <Link href="/">
                    <h1 className='font-bold text-3xl '>Fawwad
                    <span className='text-primary'>SaaS</span>
                    </h1>
                </Link>
                <div className='flex items-center gap-x-5'>
                    <ThemeToggle />

                    {(await isAuthenticated()) ? (
                        <UserNav 
                        name={user?.given_name as string}
                        email={user?.email as string}
                        image={user?.picture as string}
                        />
                    ) : (
                        <div className='flex items-center gap-x-5'>
                            <Button>
                                <LoginLink>
                                    Sign In
                                </LoginLink>
                            </Button>
                            <Button variant="secondary">
                                <RegisterLink>
                                    Sign UP
                                </RegisterLink>
                            </Button>
                        </div>
                    )}


                </div>

            </div>
        </nav>
    )
}

export default Navbar