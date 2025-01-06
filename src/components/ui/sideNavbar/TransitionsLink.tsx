"use client"
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
const sleep = (ms: number) => {
    return new Promise((resolve)=> setTimeout(resolve, ms))
}

interface ITransitionsProps extends LinkProps  {
    children: ReactNode;
    href: string;

}
export default function TransitionsLink({
    children,
    href,
    ...props
}: ITransitionsProps) {
    const router = useRouter()
    const handleTransitions = async (Event: React.MouseEvent<HTMLAnchorElement, MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>>) => {
        Event.preventDefault();
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
  return (
    <Link href={href} {...props}>{children}</Link>
  )
}
