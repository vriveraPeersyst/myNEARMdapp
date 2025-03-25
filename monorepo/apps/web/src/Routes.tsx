// monorepo/apps/web/src/Routes.tsx
import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import MarketsScreen from './modules/markets/MarketsScreen'
import ChartScreen from './modules/chart/ChartScreen'
import TradeScreen from './modules/trade/TradeScreen'
import HistoryScreen from './modules/history/HistoryScreen'
import SettingsScreen from './modules/settings/SettingsScreen'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<MarketsScreen />} />
            <Route path="/chart" element={<ChartScreen />} />
            <Route path="/trade" element={<TradeScreen />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}

function TabBar() {
  return (
    <nav style={styles.tabBar}>
      <NavLink to="/" style={styles.tabItem}>Markets</NavLink>
      <NavLink to="/chart" style={styles.tabItem}>Chart</NavLink>
      <NavLink to="/trade" style={styles.tabItem}>Trade</NavLink>
      <NavLink to="/history" style={styles.tabItem}>History</NavLink>
      <NavLink to="/settings" style={styles.tabItem}>Settings</NavLink>
    </nav>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    maxWidth: '100%',       // optional for "mobile" width
    margin: '0 auto',        // center horizontally
    border: '1px solid #ccc' // helpful visual
  },
  content: {
    flex: 1,
    overflow: 'auto' as const,
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    borderTop: '1px solid #ccc',
    padding: '8px 0',
  },
  tabItem: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#333',
  },
}
