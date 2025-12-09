import { describe, test, expect } from 'vitest'
import Vehicles from '../Vehicles'

describe('Vehicles', () => {
  test('component is defined', () => {
    expect(Vehicles).toBeDefined()
    expect(typeof Vehicles).toBe('function')
  })

  test('component has correct name', () => {
    expect(Vehicles.name).toBe('Vehicles')
  })
})