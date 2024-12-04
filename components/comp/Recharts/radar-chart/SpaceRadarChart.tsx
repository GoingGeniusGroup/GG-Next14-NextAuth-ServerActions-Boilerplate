"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SkillDataPoint {
  subject: string;
  skill1: number;
  skill2: number;
  skill3: number;
  [key: string]: string | number; // Allow string indexing for dynamic access
}

interface SpaceRadarChartProps {
  data: SkillDataPoint[];
  dataKeys: string[];
  title: string;
  description?: string;
}

export function SpaceRadarChart({
  data,
  dataKeys,
  title,
  description,
}: SpaceRadarChartProps) {
  if (!dataKeys?.length) {
    return (
      <Card className="w-full max-w-3xl border-[#1a2b4b] bg-[#0a0f1f]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-[#00f2fe]">{title}</CardTitle>
          {description && (
            <CardDescription className="text-[#4facfe]/80">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-[#4facfe]">
            No data available to display the chart.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartConfig = dataKeys.reduce((acc, key, index) => {
    acc[key] = {
      label: key,
      color: index === 0 ? "#00f2fe" : index === 1 ? "#4facfe" : "#0011ff",
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="w-full max-w-3xl border-[#1a2b4b] bg-[#0a0f1f]/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-[#00f2fe]">{title}</CardTitle>
        {description && (
          <CardDescription className="text-[#4facfe]/80">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[400px] [&_.recharts-polar-grid-line]:stroke-[#1a2b4b] [&_.recharts-polar-angle-axis-tick-value]:fill-[#4facfe]"
        >
          <RadarChart data={data}>
            <PolarGrid className="stroke-[#1a2b4b]" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#4facfe", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, "auto"]}
              tick={{ fill: "#4facfe" }}
              stroke="#1a2b4b"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="bg-[#0a0f1f]/95 border-[#1a2b4b] text-[#00f2fe]" />
              }
            />
            {dataKeys.map((key) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={chartConfig[key].color}
                fill={chartConfig[key].color}
                fillOpacity={0.3}
              />
            ))}
            <ChartLegend
              content={
                <ChartLegendContent className="[&_.recharts-legend-item-text]:text-[#4facfe]" />
              }
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
