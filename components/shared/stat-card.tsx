import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  count: number;
  text: string;
  color: "green" | "orange" | "red" | "blue" | "primary" | "yellow";
}

const colorVariants = {
  green: {
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-400/20",
    border: "border-emerald-400/30",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-500 to-orange-600",
    iconBg: "bg-orange-400/20",
    border: "border-orange-400/30",
  },
  red: {
    bg: "bg-gradient-to-br from-red-500 to-red-600",
    iconBg: "bg-red-400/20",
    border: "border-red-400/30",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-500 to-blue-600",
    iconBg: "bg-blue-400/20",
    border: "border-blue-400/30",
  },
  primary: {
    bg: "bg-gradient-to-br from-slate-700 to-slate-800",
    iconBg: "bg-slate-400/20",
    border: "border-slate-400/30",
  },
  yellow: {
    bg: "bg-gradient-to-br from-amber-500 to-yellow-600",
    iconBg: "bg-amber-400/20",
    border: "border-amber-400/30",
  },
};

export default function StatCard({
  icon: Icon,
  count,
  text,
  color,
}: StatCardProps) {
  const variant = colorVariants[color];

  return (
    <Card
      className={`${variant.bg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`${variant.iconBg} ${variant.border} border rounded-full p-4`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-white">
              {count.toLocaleString()}
            </div>
            <div className="text-white/90 font-medium text-sm uppercase tracking-wide">
              {text}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
