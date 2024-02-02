import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full min-h-[80vh] flex items-center justify-center'>
            <Card className='w-[350px]'>
                <div className='p-6'>
                    <div className='w-full flex justify-center '>
                        <Check className='w-12 h-12 rounded-full bg-green-500 p-2' />
                    </div>
                    <div className='mt-3 text-center sm:mt-5 w-full'>
                        <h3 className='text-lg leading-6 font-medium'>Payment Successfull</h3>
                        <div className='mt-2'>
                            <p className='text-sm text-muted-foreground'>Congrats on your Subscription, please check your email for further details</p>
                        </div>
                        <div className='mt-5 sm:mt-6 w-full'>
                            <Button variant="outline" className='w-full'>
                                <Link href="/dashboard">Return to Dashboard</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default page