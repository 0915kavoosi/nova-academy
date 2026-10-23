import { Globe, Megaphone, Palette, Search, BarChart3, Code2, Atom, Server, Monitor, Users, Clock, Shield, MessageSquare, Award, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  globe: Globe,
  palette: Palette,
  megaphone: Megaphone,
  search: Search,
  chart: BarChart3,
  atom: Atom,
  server: Server,
  monitor: Monitor,
  users: Users,
  clock: Clock,
  shield: Shield,
  message: MessageSquare,
  award: Award,
};

export default function AppIcon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon size={size} className={className} />;
}
