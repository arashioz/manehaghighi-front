import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SuccessPaymentPage = ({
  searchParams,
}: {
  searchParams: { refId: string }
}) => {

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-[300px]">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">پرداخت موفق</h1>
        <p className="text-gray-600 mb-4">از خرید شما سپاس گزاریم.</p>
        {
          searchParams.refId !== 'undefined' ? (
            <>
              <p className="text-gray-700 mb-2">کد رهگیری شما:</p>
              <p className="text-xl font-semibold text-blue-600 mb-6">{searchParams.refId}</p>
            </>
          ) : null
        }
        <Link
          className="w-full"
          href="/account"
          passHref
          replace
        >
          <Button>بازگشت به حساب کاربری</Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;