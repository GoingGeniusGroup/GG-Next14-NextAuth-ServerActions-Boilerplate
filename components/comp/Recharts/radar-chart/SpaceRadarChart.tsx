"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SkillDataPoint {
  skill_name: string;
  skill_percentage: number;
  [key: string]: string | number;
}

interface SpaceChartProps {
  data: SkillDataPoint[];
}

export default function SpaceRadarChart({ data }: SpaceChartProps) {
  if (!data.length) {
    return (
      <Card className="w-full max-w-3xl border-[#1a2b4b] bg-[#0a0f1f]/80 backdrop-blur-sm">
        <CardContent>
          <p className="text-[#4facfe]">
            No data available to display the chart.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartConfig = {
    skill_percentage: {
      label: "Skill Percentage",
      color: "#00f2fe",
    },
  };

  const isBarChart = data.length <= 4;

  const formattedData = data.map((item) => ({
    ...item,
    skill_percentage: Number(item.skill_percentage),
  }));

  return (
    <Card className="w-full max-w-3xl border-[#1a2b4b] bg-[#0a0f1f]/80 backdrop-blur-sm">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className={`${
            isBarChart ? "h-[300px]" : "aspect-square h-[400px]"
          } [&_.recharts-polar-grid-line]:stroke-[#1a2b4b] [&_.recharts-polar-angle-axis-tick-value]:fill-[#4facfe]`}
        >
          {isBarChart ? (
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2b4b" />
              <XAxis
                dataKey="skill_name"
                tick={{ fill: "#4facfe", fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: "#4facfe" }}
                domain={[0, 100]}
                label={{
                  value: "Skill Percentage",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#4facfe",
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent className="bg-[#0a0f1f]/95 border-[#1a2b4b] text-[#00f2fe]" />
                }
              />
              <Bar
                dataKey="skill_percentage"
                fill={chartConfig.skill_percentage.color}
                name={chartConfig.skill_percentage.label}
              />
              <ChartLegend
                content={
                  <ChartLegendContent className="[&_.recharts-legend-item-text]:text-[#4facfe]" />
                }
              />
            </BarChart>
          ) : (
            <RadarChart data={formattedData}>
              <PolarGrid className="stroke-[#1a2b4b]" />
              <PolarAngleAxis
                dataKey="skill_name"
                tick={{ fill: "#4facfe", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#4facfe" }}
                stroke="#1a2b4b"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent className="bg-[#0a0f1f]/95 border-[#1a2b4b] text-[#00f2fe]" />
                }
              />
              <Radar
                name={chartConfig.skill_percentage.label}
                dataKey="skill_percentage"
                stroke={chartConfig.skill_percentage.color}
                fill={chartConfig.skill_percentage.color}
                fillOpacity={0.3}
              />
              <ChartLegend
                content={
                  <ChartLegendContent className="[&_.recharts-legend-item-text]:text-[#4facfe]" />
                }
              />
            </RadarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
