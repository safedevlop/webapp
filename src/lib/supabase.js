import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const vehicleService = {
  async getAll() {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data

  },

  async getById(id) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(vehicle) {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}

export const serviceRecordService = {
  async getAll() {
    const { data, error } = await supabase
      .from('service_records')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByVehicleId(vehicleId) {
    const { data, error } = await supabase
      .from('service_records')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(serviceRecord) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    const recordWithUserId = {
      ...serviceRecord,
      user_id: user.id
    }
    
    const { data, error } = await supabase
      .from('service_records')
      .insert([recordWithUserId])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async update(id, updates) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    const { data, error } = await supabase
      .from('service_records')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
    
    if (error) throw error
    return data[0]

  }
}

export const alertService = {
  async getAll() {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data

  },

  async create(alert) {
    const { data, error } = await supabase
      .from('alerts')
      .insert([alert])
      .select()
    
    if (error) throw error
    return data[0]

  },

  async dismiss(id) {
    const { error } = await supabase
      .from('alerts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
  }
}