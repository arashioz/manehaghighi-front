'use client'
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { MdOutlineReportGmailerrorred } from "react-icons/md";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='min-h-[90vh] flex flex-col gap-5 items-center justify-center'>
      <MdOutlineReportGmailerrorred className='text-red-500 text-8xl mx-auto' />
      <h2 className="text-2xl font-bold">
        خطایی رخ داده است
      </h2>
      <Button
        variant={'secondary'}
        onClick={
          () => reset()
        }
      >
        تلاش مجدد
      </Button>
    </div>
  )
}