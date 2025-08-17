import { FaTimesCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FailedPaymentPage = ({
  searchParams,
}: {
  searchParams: { error: string }
}) => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-[300px]">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">پرداخت ناموفق</h1>
        <p className="text-gray-600 mb-4 whitespace-nowrap">متأسفانه پرداخت شما با مشکل مواجه شد.</p>
        <Link 
          className="w-full mt-2"
          href="/account"
          passHref
          replace
        >
          <Button variant="outline">بازگشت به حساب کاربری</Button>
        </Link>
      </div>
    </div>
  );
};

export default FailedPaymentPage;