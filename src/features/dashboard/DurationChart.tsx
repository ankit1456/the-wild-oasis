import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import Heading from "../../ui/Heading";
import { TBooking } from "../bookings/booking.types";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

type TData = {
  duration: string;
  value: number;
  color: string;
};

const startDataLight: TData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark: TData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData: TData[], stays: TBooking[] | undefined) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  const incArrayValue = (arr: TData[], field: string) => {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  };

  const data = stays
    ?.reduce((acc, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(acc, "1 night");
      if (num === 2) return incArrayValue(acc, "2 nights");
      if (num === 3) return incArrayValue(acc, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(acc, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(acc, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(acc, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(acc, "15-21 nights");
      if (num >= 21) return incArrayValue(acc, "21+ nights");
      return acc;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

type Props = {
  confirmedStays: TBooking[] | undefined;
};
function DurationChart({ confirmedStays }: Props) {
  const { isDark } = useTheme();

  const startData = isDark ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);
  return (
    <ChartBox>
      <Heading as="h3">Syay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={2}
          >
            {data?.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: "8px" }} />
          <Legend
            verticalAlign="bottom"
            align="right"
            width={130}
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
