import { describe, test, expect } from 'vitest'
import DashboardLayout from '../DashboardLayout'

describe('DashboardLayout', () => {
  test('component is defined', () => {
    expect(DashboardLayout).toBeDefined()
    expect(typeof DashboardLayout).toBe('function')
  })

  test('component has correct name', () => {
    expect(DashboardLayout.name).toBe('DashboardLayout')
  })
})