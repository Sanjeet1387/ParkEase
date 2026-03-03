const sampleparkingspots = [
  {
    title: "Downtown Secure Parking",
    description: "Safe and convenient parking near the city center.",
    location: {
      address: "45 MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India"
    },
    image: {
      filename: "downtown1.jpg",
      url: "https://images.unsplash.com/photo-1709890115362-45140c092145?w=600"
    },
    price: 250,
    is24x7: false,
    type: "covered",
    vehicleType: ["car", "suv"]
  },

  {
    title: "Airport Long Stay",
    description: "Affordable parking spot near the airport terminal.",
    location: {
      address: "Plot 12, NH-8",
      city: "Delhi",
      state: "Delhi",
      country: "India"
    },
    image: {
      filename: "airport1.jpg",
      url: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600"
    },
    price: 400,
    is24x7: true,
    type: "open",
    vehicleType: ["car", "suv"]
  },

  {
    title: "Shopping Mall Parking",
    description: "Covered parking in the central shopping area.",
    location: {
      address: "Sector 17 Market",
      city: "Chandigarh",
      state: "Punjab",
      country: "India"
    },
    image: {
      filename: "mall1.jpg",
      url: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600"
    },
    price: 180,
    is24x7: false,
    type: "covered",
    vehicleType: ["car"]
  },

  {
    title: "IT Park Basement Parking",
    description: "Reserved spot in a tech park basement.",
    location: {
      address: "Phase 2, Hinjewadi",
      city: "Pune",
      state: "Maharashtra",
      country: "India"
    },
    image: {
      filename: "itpark1.jpg",
      url: "https://media.istockphoto.com/id/1728081133/photo/empty-parking-garage.webp"
    },
    price: 300,
    is24x7: false,
    type: "basement",
    vehicleType: ["car"]
  },

  {
    title: "Railway Station Parking",
    description: "Convenient parking near central station.",
    location: {
      address: "Station Road",
      city: "Patna",
      state: "Bihar",
      country: "India"
    },
    image: {
      filename: "station1.jpg",
      url: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600"
    },
    price: 200,
    is24x7: true,
    type: "open",
    vehicleType: ["bike", "car"]
  },

  {
    title: "Hospital Parking",
    description: "24x7 parking facility near hospital.",
    location: {
      address: "AIIMS Main Gate",
      city: "Delhi",
      state: "Delhi",
      country: "India"
    },
    image: {
      filename: "hospital1.jpg",
      url: "https://images.unsplash.com/photo-1526626607369-f89fe1ed77a9?w=600"
    },
    price: 220,
    is24x7: true,
    type: "covered",
    vehicleType: ["bike", "car"]
  },

  {
    title: "Highway Motel Parking",
    description: "Overnight parking along the highway.",
    location: {
      address: "NH-27",
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India"
    },
    image: {
      filename: "motel1.jpg",
      url: "https://images.unsplash.com/photo-1613676581453-c561d09d1e76?w=600"
    },
    price: 280,
    is24x7: true,
    type: "open",
    vehicleType: ["car", "suv"]
  },

  {
    title: "Luxury Hotel Parking",
    description: "Premium valet parking for hotel guests.",
    location: {
      address: "Taj Mahal Palace",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India"
    },
    image: {
      filename: "hotel1.jpg",
      url: "https://images.unsplash.com/photo-1640686644956-dc6b5a3c7448?w=600"
    },
    price: 600,
    is24x7: true,
    type: "covered",
    vehicleType: ["car", "suv"]
  }
];

module.exports = { data: sampleparkingspots };