import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";
import { TEST_POKE } from "@/test/fixtures/pokemon";

jest.mock("@/utils/converter", () => ({
  getLineColor: jest.fn(() => "rgb(255, 0, 0)"),
  getColor: jest.fn(() => "rgba(0, 0, 255, 1)"),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="rc">{children}</div>
  ),
  RadarChart: ({ data, children, outerRadius }: any) => (
    <div
      data-testid="radar-chart"
      data-len={data?.length}
      data-outer-radius={outerRadius}
    >
      {children}
    </div>
  ),
  PolarGrid: () => <div data-testid="polar-grid" />,
  PolarAngleAxis: ({ dataKey }: any) => (
    <div data-testid="angle-axis" data-key={dataKey} />
  ),
  PolarRadiusAxis: ({ domain, tickCount, tick }: any) => (
    <div
      data-testid="radius-axis"
      data-domain={JSON.stringify(domain)}
      data-tickcount={tickCount}
      data-tick={String(tick)}
    />
  ),
  Radar: ({ dataKey, stroke, fill, fillOpacity }: any) => (
    <div
      data-testid="radar"
      data-datakey={dataKey}
      data-stroke={stroke}
      data-fill={fill}
      data-opacity={fillOpacity}
    />
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("스탯 표기 컴포넌트가 렌더링 된다", () => {
  test("제목과 총합, 각 스탯 라벨/값이 렌더링 된다", () => {
    render(<StatCard pokemon={TEST_POKE} />);

    expect(screen.getByText("Base Stats")).toBeInTheDocument();
    expect(screen.getByText(/Total:\s*525/)).toBeInTheDocument();

    ["HP", "공격", "방어", "특수공격", "특수방어", "스피드"].forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });
});
