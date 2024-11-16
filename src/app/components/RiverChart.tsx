"use client";
import { useMemo } from "react";
import {
  LineChart,
  Label,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { formatNumber } from "../utils";

type GraphDataFlow = {
  timestamp: string;
  unit: string;
  value: string;
  date: string;
};

export const RiverChart = ({ riverFlows }: { riverFlows: ValueEntry[] }) => {
  const graphDataFlows = useMemo(
    () =>
      riverFlows.reduce((acc, f) => {
        const entryExists = acc.find((v: any) => v.timestamp === f.timestamp);
        // Check for any potential duplicates
        if (!entryExists) {
          const date = new Date(f.timestamp).toLocaleString("default", {
            month: "short",
            day: "numeric",
          });

          acc = [
            ...acc,
            {
              ...f,
              date,
            },
          ];
        }
        return acc;
      }, [] as GraphDataFlow[]),
    [riverFlows]
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div className="text-sm bg-white border rounded p-2">
          <p>{`${label}, ${new Date(
            payload?.[0]?.payload.timestamp
          ).toLocaleTimeString(navigator.language, {
            hour: "numeric",
            minute: "2-digit",
          })}`}</p>
          <p className="font-semibold">
            {formatNumber(payload?.[0]?.payload.value)} cfs
          </p>
        </div>
      );
    }

    return null;
  };

  // Forms X axis tick marks, grouped by day
  const xAxisTicks = useMemo(
    () =>
      graphDataFlows.reduce((acc, currentValue) => {
        if (!acc.includes(currentValue.date)) {
          acc = [...acc, currentValue.date];
        }
        return acc;
      }, [] as string[]),
    [graphDataFlows]
  );

  // Finds max value for y axis
  const maxFlowValue = useMemo(
    () =>
      graphDataFlows.reduce((acc, currentValue) => {
        const value = formatNumber(currentValue.value);
        if (value > acc) {
          acc = value;
        }
        return acc;
      }, 0),
    [graphDataFlows]
  );

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        width={500}
        height={300}
        data={graphDataFlows}
        margin={{
          top: 0,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="date" ticks={xAxisTicks} fontSize={14} />
        <YAxis
          type="number"
          domain={[0, Math.floor(maxFlowValue) + Math.floor(maxFlowValue / 2)]}
          fontSize={14}
        >
          <Label
            offset={0}
            angle={270}
            position="left"
            style={{ textAnchor: "middle" }}
            fontSize={14}
          >
            Flow
          </Label>
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          name="Flow"
          type="monotone"
          dataKey="value"
          stroke="#1E3A8A"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
