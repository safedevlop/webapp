export const vehicles = [
  { 
    id: 1,
    model: "Toyota Hilux", 
    regNumber: "1234 - AU - 20", 
    status: "Active", 
    lastService: "2025-08-20", 
    nextService: "2026-02-15", 
    mileage: 18450, 
    image: "/api/placeholder/300/200" },

  { id: 2, 
    model: "Nissan Patrol", 
    regNumber: "5678 - SP - 19", 
    status: "In Service", 
    lastService: "2025-09-12", 
    nextService: "2026-03-01", 
    mileage: 33000, 
    image: "/api/placeholder/300/200" },

  { id: 3, 
    model: "Ford Ranger", 
    regNumber: "9012 - JL - 21", 
    status: "Active", 
    lastService: "2025-07-15", 
    nextService: "2026-01-10", 
    mileage: 22100, 
    image: "/api/placeholder/300/200" },

  { id: 4, 
    model: "Chevrolet Silverado", 
    regNumber: "3456 - JU - 18", 
    status: "Maintenance", 
    lastService: "2025-06-30", 
    nextService: "2025-12-25", 
    mileage: 45600, 
    image: "/api/placeholder/300/200" },

  { id: 5, 
    model: "Isuzu D-Max", 
    regNumber: "7890 - SP - 22", 
    status: "Active", 
    lastService: "2025-09-05", 
    nextService: "2026-03-02", 
    mileage: 15800, 
    image: "/api/placeholder/300/200" }

];

export const dashboardMetrics = {
  activeVehicles: 3,
  vehiclesInService: 1,
  maintenanceDue: 1,
  totalMileage: 135950
};

export const mileageData = [
  { 
    month: 'Jan', 
    mileage: 12000 },

  { 
    month: 'Feb', 
    mileage: 15000 },

  { 
    month: 'Mar', 
    mileage: 18000 },

  { 
    month: 'Apr', 
    mileage: 22000 },

  { 
    month: 'May', 
    mileage: 25000 
  },

  { 
    month: 'Jun', 
    mileage: 28000 
  }

];

export const serviceData = [
  { 
    month: 'Jan', 
    services: 5 
  },

  { 
    month: 'Feb', 
    services: 8 
  },

  { 
    month: 'Mar', 
    services: 12 
  },

  { 
    month: 'Apr', 
    services: 7 
  },

  { 
    month: 'May', 
    services: 15 
  },

  { 
    month: 'Jun', 
    services: 10
  }
  
];