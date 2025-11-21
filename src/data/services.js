export const services = [
  { 
    id: 1, 
    vehicleId: 1, 
    date: "2025-08-20", 
    type: "Oil Change", 
    mechanic: "John Smith", 
    cost: 150, 
    status: "Completed" 
  },

  { id: 2, 
    vehicleId: 2, 
    date: "2025-09-12", 
    type: "Brake Service", 
    mechanic: "Mike Johnson", 
    cost: 450, 
    status: "In Progress" },

  { 
    id: 3, 
    vehicleId: 3, 
    date: "2025-07-15", 
    type: "Tire Rotation", 
    mechanic: "Sarah Wilson", 
    cost: 80, 
    status: "Completed" },

  { id: 4, 
    vehicleId: 4, 
    date: "2025-06-30", 
    type: "Engine Tune-up", 
    mechanic: "David Brown", 
    cost: 320, 
    status: "Completed" },

  { id: 5, 
    vehicleId: 5, 
    date: "2025-09-05", 
    type: "Oil Change", 
    mechanic: "John Smith", 
    cost: 150, 
    status: "Completed" }
    
];

export const alerts = [
  { 
    id: 1, 
    vehicleId: 4, 
    type: "warning", 
    message: "Vehicle 4 due for maintenance in 7 days", 
    date: "2025-12-18" },

  { id: 2, 
    vehicleId: 2, 
    type: "critical", 
    message: "Low tire pressure detected", 
    date: "2025-12-20" },
    
  { id: 3, 
    vehicleId: 1, 
    type: "info", 
    message: "Scheduled maintenance reminder", 
    date: "2025-12-22" }
    
];