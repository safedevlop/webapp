import { describe, test, expect, vi, beforeEach } from 'vitest'

// Create proper mock chain
const createMockQuery = () => ({
  select: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis()
})

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
  auth: {
    getUser: vi.fn()
  }
}

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabase)
}))

describe('Supabase Services', () => {
  let mockQuery

  beforeEach(() => {
    vi.clearAllMocks()
    mockQuery = createMockQuery()
    mockSupabase.from.mockReturnValue(mockQuery)
  })

  describe('vehicleService', () => {
    test('getAll fetches all vehicles', async () => {
      const mockVehicles = [
        { id: 1, model: 'Toyota Camry', status: 'Active' },
        { id: 2, model: 'Honda Civic', status: 'In Service' }
      ]
      
      mockQuery.order.mockResolvedValue({ data: mockVehicles, error: null })
      
      const { vehicleService } = await import('../supabase')
      const result = await vehicleService.getAll()
      
      expect(mockSupabase.from).toHaveBeenCalledWith('vehicles')
      expect(mockQuery.select).toHaveBeenCalledWith('*')
      expect(mockQuery.order).toHaveBeenCalledWith('id', { ascending: true })
      expect(result).toEqual(mockVehicles)
    })

    test('getById fetches single vehicle', async () => {
      const mockVehicle = { id: 1, model: 'Toyota Camry', status: 'Active' }
      
      mockQuery.single.mockResolvedValue({ data: mockVehicle, error: null })
      
      const { vehicleService } = await import('../supabase')
      const result = await vehicleService.getById(1)
      
      expect(mockSupabase.from).toHaveBeenCalledWith('vehicles')
      expect(mockQuery.eq).toHaveBeenCalledWith('id', 1)
      expect(mockQuery.single).toHaveBeenCalled()
      expect(result).toEqual(mockVehicle)
    })
  })

  describe('serviceRecordService', () => {
    test('getAll fetches all service records', async () => {
      const mockServices = [
        { id: 1, type: 'Oil Change', cost: 5000 },
        { id: 2, type: 'Brake Service', cost: 8000 }
      ]
      
      mockQuery.order.mockResolvedValue({ data: mockServices, error: null })
      
      const { serviceRecordService } = await import('../supabase')
      const result = await serviceRecordService.getAll()
      
      expect(mockSupabase.from).toHaveBeenCalledWith('service_records')
      expect(mockQuery.order).toHaveBeenCalledWith('date', { ascending: false })
      expect(result).toEqual(mockServices)
    })

    test('create adds user_id to service record', async () => {
      const mockUser = { id: 'user-123' }
      const serviceData = { type: 'Oil Change', cost: 5000 }
      const expectedData = { ...serviceData, user_id: 'user-123' }
      
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
      mockQuery.select.mockResolvedValue({ data: [expectedData], error: null })
      
      const { serviceRecordService } = await import('../supabase')
      const result = await serviceRecordService.create(serviceData)
      
      expect(mockSupabase.auth.getUser).toHaveBeenCalled()
      expect(mockQuery.insert).toHaveBeenCalledWith([expectedData])
      expect(result).toEqual(expectedData)
    })

    test('throws error when user not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } })
      
      const { serviceRecordService } = await import('../supabase')
      
      await expect(serviceRecordService.create({})).rejects.toThrow('User not authenticated')
    })
  })
})