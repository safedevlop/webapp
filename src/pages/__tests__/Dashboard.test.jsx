import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Dashboard from '../Dashboard'

// Mock all dependencies
vi.mock('../../lib/supabase', () => ({
  vehicleService: {
    getAll: vi.fn().mockResolvedValue([])
  },
  serviceRecordService: {
    getAll: vi.fn().mockResolvedValue([])
  }
}))

vi.mock('../../data/vehicles', () => ({
  dashboardMetrics: {
    activeVehicles: 0,
    vehiclesInService: 0,
    maintenanceDue: 0,
    totalRevenue: 0
  },
  mileageData: [],
  serviceData: []
}))

vi.mock('recharts', () => ({
  LineChart: () => null,
  Line: () => null,
  BarChart: () => null,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  ResponsiveContainer: () => null
}))

vi.mock('lucide-react', () => ({
  Car: () => null,
  Wrench: () => null,
  AlertTriangle: () => null,
  DollarSign: () => null
}))

describe('Dashboard', () => {
  test('renders without crashing', () => {
    const { container } = render(<Dashboard />)
    expect(container).toBeInTheDocument()
  })
})