"use client"
import { useRouter } from "next/navigation"

const sleep = (ms: number) => {
    return new Promise((resolve)=> setTimeout(resolve, ms))
}
export const useTransitions = () =>{
    const router = useRouter()
    const handleTransitions = async (Event: React.MouseEvent<HTMLAnchorElement, MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>>) => {
        Event.preventDefault();
        if(!Event.currentTarget.href) return
        console.log("Current Target", Event.currentTarget.href)
        const body = document.querySelector('body')
        // ~Add page transitions class to body
        body?.classList.add('page-transitions')

        // ~ Sleep for 300ms
        await sleep(300)

        // ~ navigate to the link
        router.push(Event.currentTarget.href)

        // ~ Sleep for 300ms
        await sleep(300)
        // ~ Remove page transitions class from body
        body?.classList.remove('page-transitions')
    }


    return { handleTransitions }
}