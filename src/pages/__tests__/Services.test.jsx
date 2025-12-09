import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Services from '../Services'

// Mock Supabase services
vi.mock('../../lib/supabase', () => ({
  serviceRecordService: {
    getAll: vi.fn(),
    update: vi.fn()
  },
  vehicleService: {
    getAll: vi.fn()
  }
}))

describe('Services', () => {
  const mockServices = [
    {
      id: 1,
      vehicle_id: 1,
      type: 'Oil Change',
      mechanic: 'John Doe',
      cost: 5000,
      status: 'Completed',
      date: '2024-01-15'
    }
  ]

  const mockVehicles = [
    { id: 1, model: 'Toyota Camry' }
  ]

  test('displays loading state initially', async () => {
    const { serviceRecordService, vehicleService } = await import('../../lib/supabase')
    serviceRecordService.getAll.mockImplementation(() => new Promise(() => {}))
    vehicleService.getAll.mockImplementation(() => new Promise(() => {}))
    
    render(<Services />)
    
    expect(screen.getByText('Loading services...')).toBeInTheDocument()
  })

  test('displays service records after loading', async () => {
    const { serviceRecordService, vehicleService } = await import('../../lib/supabase')
    serviceRecordService.getAll.mockResolvedValue(mockServices)
    vehicleService.getAll.mockResolvedValue(mockVehicles)
    
    render(<Services />)
    
    await waitFor(() => {
      expect(screen.getByText('Oil Change')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Rs 5000')).toBeInTheDocument()
    })
  })

  test('shows vehicle model for each service', async () => {
    const { serviceRecordService, vehicleService } = await import('../../lib/supabase')
    serviceRecordService.getAll.mockResolvedValue(mockServices)
    vehicleService.getAll.mockResolvedValue(mockVehicles)
    
    render(<Services />)
    
    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    })
  })

  test('has add service button', async () => {
    const { serviceRecordService, vehicleService } = await import('../../lib/supabase')
    serviceRecordService.getAll.mockResolvedValue([])
    vehicleService.getAll.mockResolvedValue([])
    
    render(<Services />)
    
    await waitFor(() => {
      expect(screen.getByText('Add Service')).toBeInTheDocument()
    })
    
    // Verify button is clickable
    const addButton = screen.getByText('Add Service')
    expect(addButton).toBeEnabled()
  })

  test('handles empty service list', async () => {
    const { serviceRecordService, vehicleService } = await import('../../lib/supabase')
    serviceRecordService.getAll.mockResolvedValue([])
    vehicleService.getAll.mockResolvedValue([])
    
    render(<Services />)
    
    await waitFor(() => {
      expect(screen.getByText('Service Records')).toBeInTheDocument()
      expect(screen.getByText('Date')).toBeInTheDocument()
      expect(screen.getByText('Vehicle')).toBeInTheDocument()
    })
  })
})