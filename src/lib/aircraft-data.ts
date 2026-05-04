export interface AircraftDetail {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  capacity: number;
  rangeNm: number;
  speed: string;
  cabinHeight: string;
  cabinWidth: string;
  cabinLength: string;
  mainImage: string;
  heroImage: string;
  description: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
}

export const aircraftData: Record<string, AircraftDetail> = {
  'citation-m2': {
    id: 'citation-m2',
    name: 'Citation M2',
    type: 'Light Jet',
    manufacturer: 'Cessna',
    capacity: 7,
    rangeNm: 1550,
    speed: '404 ktas',
    cabinHeight: '4 ft 9 in',
    cabinWidth: '4 ft 10 in',
    cabinLength: '11 ft 0 in',
    mainImage: '/assets/aircraft/citation_m2.png',
    heroImage: '/assets/backgrounds/jet_bg_1.jpg',
    description: 'The Citation M2 is the entry-level jet for the Citation family. It combines speed, range, and efficiency with a modern Garmin G3000 avionics suite and a comfortable cabin for up to 7 passengers.',
    features: ['Garmin G3000 Avionics', 'Clarity Cabin Management System', 'Fully Enclosed Lavatory', 'Wireless Connectivity', 'Fuel Efficient Williams FJ44 Engines'],
    specifications: [
      { label: 'Maximum Range', value: '1,550 nm' },
      { label: 'Maximum Cruise Speed', value: '404 ktas' },
      { label: 'Takeoff Distance', value: '3,210 ft' },
      { label: 'Landing Distance', value: '2,590 ft' },
      { label: 'Maximum Payload', value: '1,540 lb' }
    ]
  },
  'phenom-300e': {
    id: 'phenom-300e',
    name: 'Phenom 300E',
    type: 'Light Jet',
    manufacturer: 'Embraer',
    capacity: 10,
    rangeNm: 2010,
    speed: '464 ktas',
    cabinHeight: '4 ft 11 in',
    cabinWidth: '5 ft 1 in',
    cabinLength: '17 ft 2 in',
    mainImage: '/assets/aircraft/phenom_300e.png',
    heroImage: '/assets/backgrounds/la_bg.jpg',
    description: 'The Phenom 300E is one of the most popular light jets in the world, known for its exceptional performance, spacious cabin, and advanced technology.',
    features: ['Prodigy Touch Flight Deck', 'Oval Lite Cabin Profile', 'Largest Windows in Category', 'Lufthansa Technik CMS', 'High-Speed Internet Capability'],
    specifications: [
      { label: 'Maximum Range', value: '2,010 nm' },
      { label: 'Maximum Cruise Speed', value: '464 ktas' },
      { label: 'Maximum Operating Altitude', value: '45,000 ft' },
      { label: 'Takeoff Distance', value: '3,138 ft' },
      { label: 'Payload with Full Fuel', value: '1,396 lb' }
    ]
  },
  'challenger-350': {
    id: 'challenger-350',
    name: 'Challenger 350',
    type: 'Super Mid-Size Jet',
    manufacturer: 'Bombardier',
    capacity: 10,
    rangeNm: 3200,
    speed: 'Mach 0.83',
    cabinHeight: '6 ft 0 in',
    cabinWidth: '7 ft 2 in',
    cabinLength: '25 ft 2 in',
    mainImage: '/assets/aircraft/challenger_350.png',
    heroImage: '/assets/backgrounds/ny_bg.jpg',
    description: 'The Challenger 350 is a super mid-size jet offering exceptional performance, comfort, and reliability.',
    features: ['Flat Floor Cabin Design', 'Safe Flight Auto-throttle System', 'Lufthansa Technik NICE CMS', 'Standard Ka-band Connectivity', 'Advanced Winglet Design'],
    specifications: [
      { label: 'Maximum Range', value: '3,200 nm' },
      { label: 'Maximum Speed', value: 'Mach 0.83' },
      { label: 'Maximum Payload', value: '3,400 lb' },
      { label: 'Takeoff Distance', value: '4,835 ft' },
      { label: 'Landing Distance', value: '2,364 ft' }
    ]
  },
  'g650er': {
    id: 'g650er',
    name: 'Gulfstream G650ER',
    type: 'Heavy Jet',
    manufacturer: 'Gulfstream Aerospace',
    capacity: 19,
    rangeNm: 7500,
    speed: 'Mach 0.925',
    cabinHeight: '6 ft 5 in',
    cabinWidth: '8 ft 6 in',
    cabinLength: '46 ft 10 in',
    mainImage: '/assets/aircraft/generic_jet.jpg',
    heroImage: '/assets/backgrounds/miami_bg.jpg',
    description: 'The Gulfstream G650ER is an ultra-long-range heavy jet, capable of connecting distant cities non-stop at high speeds.',
    features: ['Gulfstream Symmetry Flight Deck', '100% Fresh Air Replenishment', 'Lowest Cabin Altitude in Industry', 'High-Speed Ka-band Connectivity', '16 Panoramic Oval Windows'],
    specifications: [
      { label: 'Maximum Range', value: '7,500 nm' },
      { label: 'Maximum Speed', value: 'Mach 0.925' },
      { label: 'Cruise Altitude', value: '51,000 ft' },
      { label: 'Takeoff Distance', value: '6,299 ft' },
      { label: 'Maximum Payload', value: '6,500 lb' }
    ]
  },
  'global-7500': {
    id: 'global-7500',
    name: 'Global 7500',
    type: 'Ultra Long-Range Jet',
    manufacturer: 'Bombardier',
    capacity: 19,
    rangeNm: 7700,
    speed: 'Mach 0.925',
    cabinHeight: '6 ft 2 in',
    cabinWidth: '8 ft 0 in',
    cabinLength: '54 ft 5 in',
    mainImage: '/assets/aircraft/generic_jet.jpg',
    heroImage: '/assets/backgrounds/hero_bg_1.png',
    description: 'The Bombardier Global 7500 is a flagship ultra-long-range business jet, offering an unparalleled combination of range, speed, and comfort.',
    features: ['Smooth Flĕx Wing Technology', 'Nuage Seat Design', 'Soleil Lighting System', 'Four True Living Spaces', 'En-suite with Stand-up Shower'],
    specifications: [
      { label: 'Maximum Range', value: '7,700 nm' },
      { label: 'Maximum Speed', value: 'Mach 0.925' },
      { label: 'Maximum Payload', value: '5,800 lb' },
      { label: 'Takeoff Distance', value: '5,800 ft' },
      { label: 'Landing Distance', value: '2,520 ft' }
    ]
  },
  'bell-407gxi': {
    id: 'bell-407gxi',
    name: 'Bell 407GXi',
    type: 'Helicopter',
    manufacturer: 'Bell Textron',
    capacity: 6,
    rangeNm: 330,
    speed: '133 kts',
    cabinHeight: '4 ft 2 in',
    cabinWidth: '4 ft 11 in',
    cabinLength: '5 ft 0 in',
    mainImage: '/assets/aircraft/generic_helicopter.jpg',
    heroImage: '/assets/services/helicopter_charter.jpg',
    description: 'The Bell 407GXi is a versatile single-engine helicopter known for its performance, reliability, and advanced Garmin G1000H NXi flight deck.',
    features: ['Garmin G1000H NXi Avionics', 'Rolls-Royce 250-C47E/4 Engine', 'FADEC Controlled Propulsion', 'Club Seating Configuration', 'Quiet Cruise Mode'],
    specifications: [
      { label: 'Maximum Range', value: '330 nm' },
      { label: 'Cruise Speed', value: '133 kts' },
      { label: 'Useful Load', value: '2,300 lb' },
      { label: 'Maximum Altitude', value: '20,000 ft' },
      { label: 'Hover Ceiling (OGE)', value: '11,000 ft' }
    ]
  },
  'pilatus-pc-12': {
    id: 'pilatus-pc-12',
    name: 'Pilatus PC-12 NGX',
    type: 'Turboprop',
    manufacturer: 'Pilatus Aircraft',
    capacity: 10,
    rangeNm: 1803,
    speed: '290 ktas',
    cabinHeight: '4 ft 10 in',
    cabinWidth: '5 ft 0 in',
    cabinLength: '16 ft 11 in',
    mainImage: '/assets/aircraft/generic_jet.jpg',
    heroImage: '/assets/backgrounds/la_bg.jpg',
    description: 'The Pilatus PC-12 NGX is a single-engine turboprop aircraft renowned for its versatility, reliability, and short-field performance.',
    features: ['Electronic Propeller and Engine Control', 'Advanced Avionics by Honeywell', 'Large Cargo Door', 'Executive 6+2 Cabin', 'Quiet Cabin Technology'],
    specifications: [
      { label: 'Maximum Range', value: '1,803 nm' },
      { label: 'Maximum Cruise Speed', value: '290 ktas' },
      { label: 'Takeoff Distance', value: '2,485 ft' },
      { label: 'Maximum Payload', value: '2,236 lb' },
      { label: 'Maximum Altitude', value: '30,000 ft' }
    ]
  },
  'legacy-600': {
    id: 'legacy-600',
    name: 'Legacy 600',
    type: 'Large Jet',
    manufacturer: 'Embraer',
    capacity: 13,
    rangeNm: 3250,
    speed: 'Mach 0.80',
    cabinHeight: '6 ft 0 in',
    cabinWidth: '6 ft 11 in',
    cabinLength: '42 ft 4 in',
    mainImage: '/assets/aircraft/legacy_600.jpg',
    heroImage: '/assets/backgrounds/ny_bg.jpg',
    description: 'The Embraer Legacy 600 is a large business jet offering a spacious three-zone cabin and excellent range.',
    features: ['Three Zone Cabin', 'Largest Baggage Compartment in Class', 'Full Galley and Lavatory', 'High-Speed Connectivity', 'Excellent Short-Field Performance'],
    specifications: [
      { label: 'Maximum Range', value: '3,250 nm' },
      { label: 'Maximum Speed', value: 'Mach 0.80' },
      { label: 'Takeoff Distance', value: '5,614 ft' },
      { label: 'Maximum Payload', value: '5,291 lb' },
      { label: 'Service Ceiling', value: '41,000 ft' }
    ]
  },
  'hawker-800xp': {
    id: 'hawker-800xp',
    name: 'Hawker 800XP',
    type: 'Mid-Size Jet',
    manufacturer: 'Hawker Beechcraft',
    capacity: 8,
    rangeNm: 2600,
    speed: '448 kts',
    cabinHeight: '5 ft 9 in',
    cabinWidth: '6 ft 0 in',
    cabinLength: '21 ft 4 in',
    mainImage: '/assets/aircraft/generic_jet.jpg',
    heroImage: '/assets/backgrounds/miami_bg.jpg',
    description: 'The Hawker 800XP is a popular mid-size business jet known for its comfortable cabin and reliable performance.',
    features: ['Stand-up Cabin', 'Excellent Range for Class', 'Honeywell Avionics', 'Comfortable Club Seating', 'Reliable TFE731-5BR Engines'],
    specifications: [
      { label: 'Maximum Range', value: '2,600 nm' },
      { label: 'Maximum Speed', value: '448 kts' },
      { label: 'Takeoff Distance', value: '5,032 ft' },
      { label: 'Maximum Payload', value: '2,050 lb' },
      { label: 'Service Ceiling', value: '41,000 ft' }
    ]
  },
  'citation-x': {
    id: 'citation-x',
    name: 'Citation X+',
    type: 'Super Mid-Size Jet',
    manufacturer: 'Cessna',
    capacity: 9,
    rangeNm: 3460,
    speed: 'Mach 0.935',
    cabinHeight: '5 ft 8 in',
    cabinWidth: '5 ft 6 in',
    cabinLength: '25 ft 2 in',
    mainImage: '/assets/aircraft/generic_jet.jpg',
    heroImage: '/assets/backgrounds/jet_bg_1.jpg',
    description: 'The Citation X+ is one of the fastest civilian aircraft in the world, offering impressive speed and range.',
    features: ['World-Class Speed', 'Garmin G5000 Avionics', 'Dual-Zone Cabin', 'Fully Enclosed Lavatory', 'Winglet Technology'],
    specifications: [
      { label: 'Maximum Range', value: '3,460 nm' },
      { label: 'Maximum Speed', value: 'Mach 0.935' },
      { label: 'Takeoff Distance', value: '5,250 ft' },
      { label: 'Maximum Payload', value: '2,487 lb' },
      { label: 'Service Ceiling', value: '51,000 ft' }
    ]
  },
  'king-air-350i': {
    id: 'king-air-350i',
    name: 'King Air 350i',
    type: 'Turboprop',
    manufacturer: 'Textron Aviation',
    capacity: 11,
    rangeNm: 1806,
    speed: '312 ktas',
    cabinHeight: '4 ft 9 in',
    cabinWidth: '4 ft 6 in',
    cabinLength: '19 ft 6 in',
    mainImage: '/assets/aircraft/generic_jet.jpg',
    heroImage: '/assets/backgrounds/la_bg.jpg',
    description: 'The King Air 350i is a versatile twin-turboprop aircraft, renowned for its reliability and spacious cabin.',
    features: ['Pro Line Fusion Avionics', 'Quiet Cabin Technology', 'Double-Club Seating', 'Hot and Cold Food Storage', 'Private Aft Lavatory'],
    specifications: [
      { label: 'Maximum Range', value: '1,806 nm' },
      { label: 'Maximum Cruise Speed', value: '312 ktas' },
      { label: 'Takeoff Distance', value: '3,300 ft' },
      { label: 'Maximum Payload', value: '2,545 lb' },
      { label: 'Service Ceiling', value: '35,000 ft' }
    ]
  },
  'h145': {
    id: 'h145',
    name: 'Airbus H145',
    type: 'Helicopter',
    manufacturer: 'Airbus Helicopters',
    capacity: 10,
    rangeNm: 351,
    speed: '133 kts',
    cabinHeight: '4 ft 2 in',
    cabinWidth: '5 ft 3 in',
    cabinLength: '7 ft 10 in',
    mainImage: '/assets/aircraft/generic_helicopter.jpg',
    heroImage: '/assets/services/helicopter_charter.jpg',
    description: 'The Airbus H145 is a high-performance twin-engine helicopter, known for its spacious cabin and low noise levels.',
    features: ['Helionix Avionics Suite', 'Fenestron Shrouded Tail Rotor', 'Spacious Cabin with Flat Floor', 'Sliding Doors for Easy Access', 'Advanced Autopilot System'],
    specifications: [
      { label: 'Maximum Range', value: '351 nm' },
      { label: 'Cruise Speed', value: '133 kts' },
      { label: 'Useful Load', value: '4,200 lb' },
      { label: 'Maximum Altitude', value: '18,000 ft' },
      { label: 'Engine', value: 'Safran Arriel 2E' }
    ]
  }
};
