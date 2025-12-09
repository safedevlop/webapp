import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Car } from 'lucide-react'
import MetricCard from '../MetricCard'

describe('MetricCard', () => {
  test('renders title and value correctly', () => {
    render(
      <MetricCard 
        title="Active Vehicles" 
        value="25" 
        icon={Car} 
      />
    )
    
    expect(screen.getByText('Active Vehicles')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  test('renders without icon', () => {
    render(
      <MetricCard 
        title="Test Metric" 
        value="100" 
      />
    )
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  test('applies metric card classes', () => {
    const { container } = render(
      <MetricCard title="Test" value="50" />
    )
    
    expect(container.firstChild).toHaveClass('glass-card')
  })
})