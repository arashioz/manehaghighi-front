import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { TbError404 } from "react-icons/tb";

export default function Error() {
  return (
    <div className='min-h-[90vh] flex flex-col gap-5 items-center justify-center'>
      <TbError404 className='text-purple-500 text-9xl mx-auto' />
      <h2 className="text-2xl font-bold">
        صفحه مورد نظر یافت نشد
      </h2>
      <Link
        href="/"
        passHref
      >
        <Button
          variant={'secondary'}
        >
          بازگشت به خانه
        </Button>
      </Link>
    </div>
  )
}