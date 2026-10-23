import { Star } from "lucide-react";
import { toFa } from "../../lib/format";

export default function StarRating({
  rating,
  size = 14,
  showValue = true,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-amber-500">
      <Star size={size} fill="currentColor" strokeWidth={0} />
      {showValue && (
        <span className="text-xs font-bold text-navy-800">
          {toFa(rating.toFixed(1))}
        </span>
      )}
    </span>
  );
}
