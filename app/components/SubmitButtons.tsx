'use client'

import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react"
import { useFormStatus } from "react-dom"

const SubmitButtons = () => {
    const { pending } = useFormStatus()
    return (
        <>{pending ? (
            <Button disabled className="w-fit">
                <Loader2 className="animate-spin" />
            </Button>
        ) : (
            <Button type="submit">
                Save Now
            </Button>
        )}</>
    )
}

export default SubmitButtons

export function StripeSubscriptionCreationButton() {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Button disabled className="w-full">
                    <Loader2 className="animate-spin" />
                </Button>
            ) : (
                <Button className='w-full' type="submit">
                    Buy Now
                </Button>
            )}

        </>
    )
}

export function StripePortal() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className="w-fit">
                    <Loader2 className="animate-spin" />
                </Button>
            ) : (
               <Button className='w-fit' type="submit">View payment details</Button> 
            )}

        </>
    )
}

export function TrashDelete() {
    const { pending } = useFormStatus();
  
    return (
      <>
        {pending ? (
          <Button variant={"destructive"} size="icon" disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button variant={"destructive"} size="icon" type="submit">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </>
    );
  }