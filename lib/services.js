export const SERVICE_CATEGORIES = [
  {
    category: "Construction & Labour",
    icon: "🧱",
    iconName: "HardHat",
    colorClass: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    services: ["Labour Worker", "Mason / Raj Mistri", "Tile Worker", "POP Worker", "Painter", "Carpenter", "Welder", "Iron Fabricator", "Glass Worker", "False Ceiling Worker"]
  },
  {
    category: "Electrical & Repair",
    icon: "⚡",
    iconName: "Zap",
    colorClass: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white",
    services: ["Electrician", "AC Repair", "Cooler Repair", "Fridge Repair", "TV Repair", "Mobile Repair", "CCTV Installer", "Inverter Repair", "Solar Panel Technician"]
  },
  {
    category: "Plumbing & Water",
    icon: "🚰",
    iconName: "Droplets",
    colorClass: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    services: ["Plumber", "Borewell Service", "Water Tank Cleaning", "Motor Repair", "RO Service"]
  },
  {
    category: "Agriculture Services",
    icon: "🚜",
    iconName: "Tractor",
    colorClass: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    services: ["Farm Labour", "Tractor Service", "Harvester Service", "Seeder Machine", "Spray Machine Service", "Tube Well Operator", "Dairy Helper"]
  },
  {
    category: "Transport & Vehicle",
    icon: "🚚",
    iconName: "Truck",
    colorClass: "bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
    services: ["Driver", "Tractor Trolley", "Pickup Vehicle", "Tempo Service", "Truck Service", "JCB Operator", "Crane Service"]
  },
  {
    category: "Home Services",
    icon: "🏠",
    iconName: "Home",
    colorClass: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    services: ["House Cleaning", "Maid", "Cook", "Babysitter", "Security Guard", "Gardener"]
  },
  {
    category: "Beauty & Personal",
    icon: "💇",
    iconName: "Scissors",
    colorClass: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    services: ["Barber", "Salon Service", "Mehndi Artist", "Makeup Artist", "Tailor / Boutique"]
  },
  {
    category: "Education & Digital",
    icon: "🧑‍🏫",
    iconName: "Laptop",
    colorClass: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    services: ["Tutor", "Computer Teacher", "CSC Center", "Online Form Service", "Aadhaar/PAN Help", "Graphic Designer", "Photographer", "Video Editor"]
  },
  {
    category: "Health & Emergency",
    icon: "🏥",
    iconName: "HeartPulse",
    colorClass: "bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white",
    services: ["Ambulance", "Nurse", "Compounder", "Physiotherapist", "Veterinary Doctor"]
  },
  {
    category: "Event Services",
    icon: "🎉",
    iconName: "PartyPopper",
    colorClass: "bg-fuchsia-100 text-fuchsia-600 group-hover:bg-fuchsia-600 group-hover:text-white",
    services: ["DJ Service", "Tent House", "Caterer", "Photographer", "Decoration Service"]
  }
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap(c => c.services);
