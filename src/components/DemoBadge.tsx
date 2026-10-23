import Badge from "./ui/Badge";
import { FlaskConical } from "lucide-react";

export default function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <Badge tone="amber" className={className}>
      <FlaskConical size={12} />
      داده نمایشی — بدون بک‌اند واقعی
    </Badge>
  );
}
