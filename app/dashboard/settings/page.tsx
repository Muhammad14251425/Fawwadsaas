import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import prisma from "@/app/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from '@/components/ui/button'
import SubmitButtons from '@/app/components/SubmitButtons'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });

  return data;
}


const page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string);

  async function posData(formData: FormData) {
    "use server"
    const name = formData.get('name') as string
    const colorScheme = formData.get('color') as string
    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        name: name ?? undefined,
        colorScheme: colorScheme ?? undefined,
      },
    });
    revalidatePath("/","layout")
  }
  return (
    <div className='grid items-start gap-8'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='text-3xl md:text-4xl'>Settings</h1>
          <p className='text-lg text-muted-foreground'>Your Profile Settings</p>
        </div>
      </div>
      <Card>
        <form action={posData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>Please provide general information about yourself. Please dont forget to save</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='space-y-1'>
                <label>Your Name</label>
                <Input type="text" name='name' id='name' placeholder='Your Name' defaultValue={data?.name} />
              </div>
              <div className='space-y-1'>
                <label>Your Email</label>
                <Input type="email" name='email' id='email' placeholder='Your Email' disabled defaultValue={data?.email} />
              </div>
              <div className='space-y-1'>
                <label>Color Scheme</label>
                <Select name='color' defaultValue={data?.colorScheme}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select a Color" />
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Color</SelectLabel> */}
                        <SelectItem value='theme-green'>Green</SelectItem>
                        <SelectItem value='theme-blue'>Blue</SelectItem>
                        <SelectItem value='theme-orange'>Orange</SelectItem>
                        <SelectItem value='theme-violet'>Violet</SelectItem>
                        <SelectItem value='theme-yellow'>Yellow</SelectItem>
                        <SelectItem value='theme-red'>Red</SelectItem>
                        <SelectItem value='theme-rose'>Rose</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButtons />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default page