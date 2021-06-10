import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import useDimensions from 'react-cool-dimensions'

const ReAreaChart = ({ title, xAxis, yAxis, data, labelFormat }) => {
  const [mouseData, setMouseData] = useState<string | null>(null)
  // @ts-ignore
  const { observe, width, height } = useDimensions()

  const handleMouseMove = (coords) => {
    if (coords.activePayload) {
      setMouseData(coords.activePayload[0].payload)
    }
  }

  const handleMouseLeave = () => {
    setMouseData(null)
  }

  return (
    <div className="h-full w-full" ref={observe}>
      <div className="absolute h-full w-full pb-4">
        <div className="pb-0.5 text-xs text-th-fgd-3">{title}</div>
        {mouseData ? (
          <>
            <div className="pb-1 text-xl text-th-fgd-1">
              {labelFormat(mouseData[yAxis])}
            </div>
            <div className="text-xs font-normal text-th-fgd-4">
              {new Date(mouseData[xAxis]).toDateString()}
            </div>
          </>
        ) : data.length > 0 && data[data.length - 1][yAxis] ? (
          <>
            <div className="pb-1 text-xl text-th-fgd-1">
              {labelFormat(data[data.length - 1][yAxis])}
            </div>
            <div className="text-xs font-normal text-th-fgd-4">
              {new Date(data[data.length - 1][xAxis]).toDateString()}
            </div>
          </>
        ) : (
          <>
            <div className="animate-pulse bg-th-bkg-3 h-8 mt-1 rounded w-48" />
            <div className="animate-pulse bg-th-bkg-3 h-4 mt-1 rounded w-24" />
          </>
        )}
      </div>
      {width > 0 ? (
        <AreaChart
          width={width}
          height={height}
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Tooltip
            cursor={{
              strokeOpacity: 0,
            }}
            content={<></>}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF9C24" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#FF9C24" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey={yAxis}
            stroke="#FF9C24"
            fill="url(#gradient)"
          />
          <XAxis dataKey={xAxis} hide />
          <YAxis dataKey={yAxis} hide />
        </AreaChart>
      ) : null}
    </div>
  )
}

export default ReAreaChart
