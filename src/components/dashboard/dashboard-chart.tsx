"use client"

import { GlassPanel } from "@/components/ui/glass-panel"
import { Activity } from "lucide-react"
import { useState } from "react"

interface ChartDataPoint {
  name: string
  launches: number
}

interface DashboardChartProps {
  data: ChartDataPoint[]
  title: string
}

export function DashboardChart({ data, title }: DashboardChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Default mock data if empty
  const chartData = data && data.length > 0 ? data : [
    { name: "Sun", launches: 0 },
    { name: "Mon", launches: 0 },
    { name: "Tue", launches: 0 },
    { name: "Wed", launches: 0 },
    { name: "Thu", launches: 0 },
    { name: "Fri", launches: 0 },
    { name: "Sat", launches: 0 },
  ]

  const width = 600
  const height = 240
  const paddingX = 40
  const paddingY = 30

  const maxVal = Math.max(...chartData.map((d) => d.launches), 5)
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  // Generate coordinates for SVG path
  const points = chartData.map((d, i) => {
    const x = paddingX + (i * chartWidth) / (chartData.length - 1)
    const y = height - paddingY - (d.launches * chartHeight) / maxVal
    return { x, y, value: d.launches, label: d.name }
  })

  // Line path command
  const linePath = points.reduce((path, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`
  }, "")

  // Area path command (closing the path to the bottom)
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : ""

  return (
    <GlassPanel interactive className="w-full h-full p-0">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <h3 className="text-base font-semibold text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-secondary drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
          {title}
        </h3>
      </div>
      <div className="p-0 sm:p-6 sm:pt-0">
        <div className="relative w-full aspect-2.5/1 sm:aspect-2.5/1 min-h-[220px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Neon Glow Area Gradient */}
              <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>

              {/* Line Stroke Gradient */}
              <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
              const y = paddingY + ratio * chartHeight
              const val = Math.round(maxVal * (1 - ratio))
              return (
                <g key={index} className="opacity-20">
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                </g>
              )
            })}

            {/* Area Fill */}
            {areaPath && (
              <path
                d={areaPath}
                fill="url(#chartAreaGradient)"
              />
            )}

            {/* Glowing Line */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="url(#chartLineGradient)"
                strokeWidth="3"
                filter="url(#neonGlow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Data Nodes */}
            {points.map((p, i) => (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Larger invisible trigger target */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="15"
                  fill="transparent"
                />

                {/* Visible Data Dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === i ? "6" : "4"}
                  fill={hoveredIndex === i ? "#ffffff" : "#22D3EE"}
                  stroke="#0b1020"
                  strokeWidth="2"
                  className="transition-all duration-150"
                  filter={hoveredIndex === i ? "url(#neonGlow)" : undefined}
                />

                {/* X Axis Labels */}
                <text
                  x={p.x}
                  y={height - 10}
                  fill={hoveredIndex === i ? "#ffffff" : "#94a3b8"}
                  fontSize="10"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* Glowing Vertical Hover Indicator */}
            {hoveredIndex !== null && points[hoveredIndex] && (
              <g>
                <line
                  x1={points[hoveredIndex].x}
                  y1={paddingY}
                  x2={points[hoveredIndex].x}
                  y2={height - paddingY}
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  className="opacity-40"
                />
              </g>
            )}
          </svg>

          {/* HTML Hover Tooltip overlay */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <div
              className="absolute bg-[#11172a]/95 border border-[#22d3ee]/30 rounded-lg p-2 text-xs shadow-xl backdrop-blur-md pointer-events-none transition-all duration-150"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: `${(points[hoveredIndex].y / height) * 100 - 45}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="font-semibold text-slate-200">{points[hoveredIndex].label}</div>
              <div className="text-secondary font-bold">
                {points[hoveredIndex].value} launches
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassPanel>
  )
}
export default DashboardChart
