import type { STATISTIC_CARD_COLORS } from "./StatisticCard.constants";

type StatisticCardProps = {
  label: string;
  value: number | string;
  icon?: string;
  color: typeof STATISTIC_CARD_COLORS[number];
}

export type { StatisticCardProps };
