// monorepo/apps/web/src/modules/chart/ChartScreen.tsx
import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

export default function ChartScreen() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create a chart instance
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: 'Solid', color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
    })

    const candleSeries = chart.addCandlestickSeries()

    // Example data:
    candleSeries.setData([
      { time: '2023-08-01', open: 2.0, high: 2.1, low: 1.9, close: 2.05 },
      { time: '2023-08-02', open: 2.05, high: 2.2, low: 1.95, close: 2.0 },
      { time: '2023-08-03', open: 2.0, high: 2.05, low: 1.85, close: 1.9 },
      { time: '2023-08-04', open: 1.9, high: 2.0, low: 1.8, close: 1.85 },
      // ...
    ])

    // Resize if container changes
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
        })
      }
    })
    resizeObserver.observe(chartContainerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <h2>Chart</h2>
      <div ref={chartContainerRef} style={{ width: '100%', height: 400 }} />
    </div>
  )
}
