import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="container-app flex flex-col items-center py-28 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-50 text-royal-500">
        <Compass size={30} />
      </span>
      <p className="text-5xl font-black text-navy-900">۴۰۴</p>
      <h1 className="mt-3 text-xl font-black text-navy-900">
        صفحه موردنظر پیدا نشد
      </h1>
      <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
        ممکن است آدرس اشتباه بوده باشد یا صفحه جابه‌جا شده باشد.
      </p>
      <Link to="/" className="mt-7">
        <Button size="lg">
          <Home size={17} />
          بازگشت به صفحه اصلی
        </Button>
      </Link>
    </div>
  );
}
