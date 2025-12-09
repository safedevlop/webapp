import { describe, test, expect } from 'vitest'

describe('AuthContext', () => {
  test('can import AuthContext module', async () => {
    const module = await import('../AuthContext')
    expect(module).toBeDefined()
    expect(module.useAuth).toBeDefined()
    expect(module.AuthProvider).toBeDefined()
  })

  test('exports are functions', async () => {
    const { useAuth, AuthProvider } = await import('../AuthContext')
    expect(typeof useAuth).toBe('function')
    expect(typeof AuthProvider).toBe('function')
  })
})