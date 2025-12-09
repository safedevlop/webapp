import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddServiceForm from '../AddServiceForm'

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  serviceRecordService: {
    create: vi.fn()
  }
}))

describe('AddServiceForm', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    vehicles: [
      { id: 1, model: 'Toyota Camry', reg_number: 'ABC123' },
      { id: 2, model: 'Honda Civic', reg_number: 'XYZ789' }
    ],
    onServiceAdded: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders form when open', () => {
    render(<AddServiceForm {...mockProps} />)
    
    expect(screen.getByText('Add Service')).toBeInTheDocument()
    expect(screen.getByText('Vehicle')).toBeInTheDocument()
    expect(screen.getByText('Service Type')).toBeInTheDocument()
    expect(screen.getByText('Mechanic')).toBeInTheDocument()
    expect(screen.getByText('Cost (Rs)')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  test('does not render when closed', () => {
    render(<AddServiceForm {...mockProps} isOpen={false} />)
    
    expect(screen.queryByText('Add Service')).not.toBeInTheDocument()
  })

  test('populates vehicle dropdown correctly', () => {
    render(<AddServiceForm {...mockProps} />)
    
    expect(screen.getByText('Toyota Camry - ABC123')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic - XYZ789')).toBeInTheDocument()
  })

  test('has save and cancel buttons', () => {
    render(<AddServiceForm {...mockProps} />)
    
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  test('calls onClose when cancel button clicked', async () => {
    const user = userEvent.setup()
    render(<AddServiceForm {...mockProps} />)
    
    await user.click(screen.getByText('Cancel'))
    
    expect(mockProps.onClose).toHaveBeenCalled()
  })

  test('has form inputs', () => {
    render(<AddServiceForm {...mockProps} />)
    
    // Check for form elements by their placeholder or type
    expect(screen.getByPlaceholderText('Oil Change, Brake Service, etc.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Mechanic name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument()
  })

  test('has status dropdown with options', () => {
    render(<AddServiceForm {...mockProps} />)
    
    expect(screen.getByDisplayValue('Completed')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Scheduled')).toBeInTheDocument()
  })
})