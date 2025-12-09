import { describe, test, expect } from 'vitest'
import GlassCard from '../GlassCard'

describe('GlassCard', () => {
  test('component is defined', () => {
    expect(GlassCard).toBeDefined()
    expect(typeof GlassCard).toBe('function')
  })

  test('component accepts props', () => {
    const props = { className: 'test', children: 'content' }
    expect(() => GlassCard(props)).not.toThrow()
  })
})