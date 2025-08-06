import type { LucideIcon } from "lucide-react";
import StatCard from "./stat-card";

interface StatData {
  icon: LucideIcon;
  count: number;
  text: string;
  color: "green" | "orange" | "red" | "blue" | "primary" | "yellow";
}

interface StatCardsGridProps {
  statistics: StatData[];
}

export default function StatCardsGrid({ statistics }: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statistics.map((stat) => (
        <StatCard
          key={stat.text}
          icon={stat.icon}
          count={stat.count}
          text={stat.text}
          color={stat.color}
        />
      ))}
    </div>
  );
}
