export const allServices = [
  {
    id: 1,
    title: "Solar",
    category: 20,
    description:
      "Harness the power of the sun with our advanced solar solutions. Reduce energy costs, lower your carbon footprint, and enjoy sustainable energy tailored to your needs.",
    image: "/assets/images/solar-cell.png",
    inputs: [
      {
        question: "How much is your currency bill?",
        options: [
          "50$",
          "100$",
          "200$",
          "300$",
          "400$",
          "500$",
          "600$",
          "700$",
          "800$",
          "900$",
          "More than 900$",
        ],
      },
      {
        question: "How much sun hits your roof?",
        options: ["Full sun", "Partially shaded", "Mostly shaded", "Not sure"],
      },
      {
        question: "Who is your energy provider?",
        
      },
      {
        question: "What is the nature of your project?",
        options: ["New", "Repair", "Remodeling"],
      },
    ],
  },
  {
    id: 2,
    title: "Windows",
    category: 18,
    description:
      "Enhance your home’s and offices beauty and efficiency with our premium window services. From installations to replacements, we provide energy-saving, stylish, and durable options.",
    image: "/assets/images/windows.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["Install", "Repair","Remodeling"],
      },
      {
        question: "How many windows are involved?",
        options: [
          "1 window",
          "2 windows",
          "3-5 windows",
          "6-9 windows",
          "10+ windows",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
      {
        question: "What is the material of your windows",
        options: ["Vinyl", "Wood", "Aluminium", "Brick", "Stone", "Metal","Windows Cleaning"],
      },
    ],
  },
  {
    id: 3,
    title: "Roofing",
    category: 15,
    description:
      "Protect your home with our reliable roofing solutions. Whether you need new roof, repairs, or maintenance, we ensure durability, safety, and top-notch craftsmanship.",
    image: "/assets/images/roof.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New", "Repair", "Remodelling"],
      },
      {
        question: "What type of material do you need",
        options: [
          "Asphalt Shingle",
          "Cedar Shake",
          "Metal",
          "Natural Slate",
          "Tar",
          "Commercial Roofing",
          "Flat, Foam, or Single Ply Roofing",
          "Traditional Tile Roofing",
          "Wood or Composite Roofing",
          "Water proof coatings",
          "Roof Removal",
          "Roof Maintenance or Cleaning",
          "Other",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 4,
    title: "HVAC",
    category: 19,
    description:
      "Stay comfortable year-round with our HVAC services. From installation to maintenance, we optimize your heating and cooling systems for peak efficiency.",
    image: "/assets/images/air.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New", "Repair", "Remodeling"],
      },
      {
        question: "What type of HVAC do you need",
        options: [
          "Air Ducts Repair & Replace",
          "Boiler & Radiators New Install",
          "Central air Cleaning & maintenance",
          "Central Air-New Install",
          "Central Air-Repair",
          "Commercial Cooling",
          "Commercial Heat-New Install",
          "Commercial Heat-Repair",
          "Ductless Air Conditioning",
          "Furnaces-New Install",
          "Furnaces-Repair",
          "Gas Heat-New install",
          "Gas Heat-Repair",
          "Geothermal Systems",
          "Heating-New Install",
          "Heating-Repair",
          "Heat Pumps-New Install",
          "Heat Pumps-Repair",
          "Oil Heat-New Install",
          "Oil Heat-Repair",
          "Radiant Floor System",
          "Thermostats",
          "Boiler & Radiators Repair",
          "Ductless AC Repair",
          "Ducts and Vents Install",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 5,
    title: "Painting",
    category: 13,
    description:
      "Transform your space with our expert painting services. We deliver flawless finishes and vibrant colors that breathe life into your home or business.",
    image: "/assets/images/painting.png",
    inputs: [
      {
        question: "Type of painting needed",
        options: [
          "Exterior painting - Trim/Shutters",
          "Exterior painting - Whole House",
          "Paint or Stain - Deck/Fence/Porch",
          "Interior Painting 1-2 Rooms",
          "Interior Painting 3+ Rooms",
          "Wallpaper Hanging/Removal",
          "Speciality- Faux Finishes",
          "Speciality - Textures",
          "Commercial",
          "Paint Removal or Stripping",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 6,
    title: "Plumbing",
    category: 14,
    description:
      "Solve your plumbing problems with our fast and efficient services. From leaky faucets to major installations, we ensure everything flows smoothly.",
    image: "/assets/images/water-supply.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New", "Repair", "Remodeling"],
      },
      {
        question: "Type of plumbing needed?",
        options: [
          "Basement Drainage Channel",
          "Bathtubs",
          "Commercial Industrial Plumbing",
          "Faucets Fixtures Pipes",
          "Gas pipes",
          "General Repair",
          "Leak Detection And Repair",
          "Remodeling and construction",
          "Sewer and Drain",
          "Walk-In Bath Install",
          "Fire Sprinkler System",
          "Pump out a septic tank",
          "Septic system install",
          "Septic system repair",
          "SUMP pump repair",
          "Water heater install",
          "Water heater repair",
          "Water Line",
          "Water main install",
          "Water main repair",
          "Other Install",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 7,
    title: "Gutters",
    category: 22,
    description:
      "Keep your home safe from water damage with our seamless gutter solutions. We offer installation, repair, and cleaning services for optimal drainage.",
    image: "/assets/images/gutter.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New", "Repair", "Remodeling"],
      },
      {
        question: "Type of product needed",
        options: ["Galvanized", "Seamless Metal", "PVC","Wood","Gutter Cleaning","Gutter Protection","Other"],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 8,
    title: "HomeSecurity",
    category: 23,
    description:
      "Secure your peace of mind with our advanced home security systems. Protect your loved ones with cutting-edge technology and professional installation.",
    image: "/assets/images/insurance.png",
    inputs: [
      {
        question: "Type of service needed",
        options: [
          "Equipment Only",
          "New System Installation",
          "Reactivating The Existing System",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Kitchen",
    category: 11,
    description:
      "Create your dream kitchen with our expert remodeling and installation services. We blend functionality and style to make your culinary space extraordinary.",
    image: "/assets/images/kitchen.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New Kitchen", "Repair Kitchen", "Kitchen Remodelling"],
      },
      {
        question: "Type of remodeling needed?",
        options: [
          "Appliances",
          "Cabinets",
          "Cabinet Repair",
          "Counter Tops or Sinks",
          "Floor Plan",
          "Flooring",
          "Full Kitchen",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 10,
    title: "Siding",
    category: 16,
    description:
      "Enhance your home’s curb appeal and durability with our top-quality siding services. Choose from a variety of styles and materials for lasting beauty.",
    image: "/assets/images/siding.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New", "Repair", "Remodeling"],
      },
      {
        question: "What type of project",
        options: [
          "Aluminium - Install/Replace",
          "Aluminium Repair",
          "BrickFace Install/Replace",
          "BrickFace Repair",
          "Composite Wood - Install/Replace",
          "Composite Wood - Repair",
          "StoneFace- Install/Replace",
          "StoneFace- Repair",
          "Stucco- Install/Replace",
          "Stucco - Repair",
          "Vinyl- Install/Replace",
          "Vinyl-Repair",
          "Other Repair",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 11,
    title: "Bathroom",
    category: 2,
    description:
      "Revitalize your bathroom with our modern renovation solutions. From luxurious upgrades to practical fixes, we craft spaces that blend comfort and elegance.",
    image: "/assets/images/public-toilet.png",
    inputs: [
      {
        question: "What is the nature of your project?",
        options: ["New Bath Install", "Bathroom Remodel"],
      },
      {
        question: "Type of remodeling needed",
        options: [
          "BathTub Install",
          "BathTub Linear Install",
          "Cabinets",
          "Counter Tops",
          "Full Remodel",
          "General Remodeling",
          "New Florring",
          "Shower Install",
          "Sink Install",
          "Toilet Install",
          "Walk-In Tub Install",
          "Complete Remodel",
          "Vanity Install",
          "Vanity Repair",
          "Other",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 12,
    title: "Fencing",
    category: 8,
    description:
      "Define your property with our custom fencing solutions. We provide durable, stylish, and secure options to fit your needs and style.",
    image: "/assets/images/fence.png",
    inputs: [
      {
        question: "Type of fencing project?",
        options: [
          "Wood Fence Install/Replace",
          "Wood Fence Repair",
          "Vinyl or PVC Fence Install/Replace",
          "Vinyl or PVC Fence Repair",
          "Chain Link Fence Install/Replace",
          "Chain Link Fence Repair",
          "Wrought Iron Fence Install/Replace",
          "Wrought Iron Fence Repair",
          "Aluminium Or Steel Fence Install/Replace",
          "Aluminium Or Steel Fence Repair",
          "Barbed Wired Fence Install/Replace",
          "Barbed Wired Fence Repair",
          "Electric Pet Fence Install/Replace",
          "Electric Pet Fence Repair",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 13,
    title: "Flooring",
    category: 9,
    description:
      "Upgrade your home with our premium flooring services. From hardwood to tiles, we offer elegant, durable, and cost-effective solutions for every space.",
    image: "/assets/images/tiles.png",
    inputs: [
      {
        question: "Floor Type?",
        options: [
          "Carpet - install",
          "Carpet- Repair or Refasten",
          "Epoxy Flooring",
          "Hardwood Floor- Install",
          "Laminate Floor- Install",
          "Laminate Floor- Repair",
          "Tile Floor- Install/Repair",
          "Vinyl Or Linoleum Floor-Install",
          "Vinyl Or Linoleum Floor - Repair",
          "Wood Floor - Refinishing",
          "Wood Floor - Repair or Partially Replace",
        ],
      },
      {
        question: "Project status?",
        options: ["Ready to hire", "Planning and budgeting"],
      },
    ],
  },
  {
    id: 14,
    title: "Movers",
    category: 21,
    description:
      "Make your move seamless with our professional moving services. we ensure safe, and stress-free relocation for homes and businesses.",
    image: "/assets/images/shipping-truck.png",
    inputs: [
      {
        question: "Current zip code",
      },
      {
        question: "Moving zip code",
      },
      {
        question: "Move size",
        options: [
          "Studio",
          "1 Bedroom",
          "2 Bedrooms",
          "3 Bedrooms",
          "4 Bedrooms",
          "Over 4 Bedrooms",
          "Partial Home",
        ],
      },
      {
        question: "Moving Distance",
        options: [
          "Long Distance",
          "Local",
          "Other",
        ],
      },
      {
        question: "When are you planning to move", 
        type: "date",
      },
    ],
  },
];
