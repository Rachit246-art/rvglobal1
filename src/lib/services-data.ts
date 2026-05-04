export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  heroImage: string;
  benefits: string[];
  features: {
    title: string;
    description: string;
    image: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
}

export const servicesData: Record<string, ServiceDetail> = {
  'private-jet': {
    id: 'private-jet',
    title: 'Private Jet Charter',
    subtitle: 'The Ultimate in Bespoke Travel',
    description: 'Experience unparalleled luxury, privacy, and efficiency with our bespoke private jet charter services. Tailored to your exact schedule and preferences, we provide access to thousands of airports worldwide, ensuring you reach your destination with ease and style.',
    mainImage: '/assets/services/private_jet_charter.jpg',
    heroImage: '/assets/backgrounds/jet_bg_1.jpg',
    benefits: [
      'Complete Privacy and Confidentiality',
      'Flexible Scheduling Tailored to You',
      'Access to Thousands of Private Terminals',
      'Bespoke In-flight Catering and Amenities',
      'Reduced Travel Time and No Queues',
      'Pet-Friendly Travel Options'
    ],
    features: [
      {
        title: 'Bespoke In-flight Experience',
        description: 'From gourmet dining curated by top chefs to personalized entertainment systems, every aspect of your flight is designed to your specifications.',
        image: '/assets/backgrounds/jet_bg_1.jpg'
      },
      {
        title: 'Global Reach',
        description: 'Our extensive network allows us to source the perfect aircraft for any mission, whether it\'s a short regional hop or a long-haul international journey.',
        image: '/assets/backgrounds/ny_bg.jpg'
      }
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Discuss your travel needs with our dedicated aviation experts.' },
      { step: '02', title: 'Selection', description: 'Choose from a curated selection of aircraft perfectly suited for your trip.' },
      { step: '03', title: 'Booking', description: 'Finalize your itinerary and enjoy seamless coordination by our operations team.' },
      { step: '04', title: 'Departure', description: 'Arrive at the private terminal just minutes before your scheduled takeoff.' }
    ]
  },
  'group-charter': {
    id: 'group-charter',
    title: 'Group Charter Flights',
    subtitle: 'Seamless Travel for Large Groups',
    description: 'Our group charter solutions are designed for efficiency and comfort, whether you\'re coordinating corporate events, sports teams, or large family gatherings. We handle every detail, from customized branding to specialized catering, ensuring a unified and stress-free journey.',
    mainImage: '/assets/backgrounds/hero_bg_1.png',
    heroImage: '/assets/backgrounds/la_bg.jpg',
    benefits: [
      'Dedicated Check-in Counters',
      'Customized Aircraft Branding',
      'Flexible Itineraries and Destinations',
      'Cost-Effective for Large Groups',
      'Unified Travel Experience',
      'Specialized Cargo Capacity'
    ],
    features: [
      {
        title: 'Tailored Logistics',
        description: 'We manage all ground handling and logistics to ensure your entire group moves smoothly through every stage of the journey.',
        image: '/assets/backgrounds/hero_bg_1.png'
      },
      {
        title: 'Branding Opportunities',
        description: 'Enhance your corporate identity with customized aircraft interiors, headrest covers, and bespoke catering menus.',
        image: '/assets/backgrounds/la_bg.jpg'
      }
    ],
    process: [
      { step: '01', title: 'Requirement Analysis', description: 'We assess your group size, budget, and specific logistics needs.' },
      { step: '02', title: 'Aircraft Matching', description: 'We source high-capacity aircraft that provide the best value and comfort.' },
      { step: '03', title: 'Operational Planning', description: 'Our team coordinates with airports and ground handlers for a smooth flow.' },
      { step: '04', title: 'Execution', description: 'A dedicated flight manager ensures every detail is perfect on the day of travel.' }
    ]
  },
  'cargo-charter': {
    id: 'cargo-charter',
    title: 'Cargo Charter Services',
    subtitle: 'Rapid and Reliable Global Logistics',
    description: 'When time is critical and standard shipping falls short, our cargo charter services provide the speed and reliability your business demands. We handle specialized freight, from oversized industrial equipment to sensitive medical supplies, with precision and care.',
    mainImage: '/assets/services/cargo_charter.jpg',
    heroImage: '/assets/services/cargo_charter.jpg',
    benefits: [
      'Rapid Deployment and Quick Response',
      'Capacity for Oversized and Heavy Cargo',
      'Secure Handling of Sensitive Goods',
      'Global Reach to Remote Locations',
      'Real-Time Shipment Tracking',
      'Expert Customs and Logistics Support'
    ],
    features: [
      {
        title: 'Specialized Handling',
        description: 'Our experts are trained in handling dangerous goods, perishables, and high-value items with the utmost safety.',
        image: '/assets/services/cargo_charter.jpg'
      },
      {
        title: 'Mission Critical Speed',
        description: 'We provide immediate solutions for "Aircraft On Ground" (AOG) situations and urgent supply chain disruptions.',
        image: '/assets/backgrounds/ny_bg.jpg'
      }
    ],
    process: [
      { step: '01', title: 'Quote Request', description: 'Provide details of your cargo, destination, and urgency.' },
      { step: '02', title: 'Solution Design', description: 'We design a bespoke flight plan and select the optimal cargo aircraft.' },
      { step: '03', title: 'Loading & Dispatch', description: 'Professional loading crews ensure your freight is secured for transport.' },
      { step: '04', title: 'Delivery', description: 'We coordinate the final leg of the journey for door-to-door reliability.' }
    ]
  },
  'helicopter': {
    id: 'helicopter',
    title: 'Helicopter Charter',
    subtitle: 'Point-to-Point Precision',
    description: 'Bypass the limitations of traditional airports and traffic with our versatile helicopter charter services. Ideal for city-to-city transfers, reaching remote retreats, or scenic aerial tours, helicopters offer the ultimate in point-to-point travel flexibility.',
    mainImage: '/assets/services/helicopter_charter.jpg',
    heroImage: '/assets/backgrounds/miami_bg.jpg',
    benefits: [
      'Direct Access to Remote Locations',
      'Avoid Ground Traffic and Delays',
      'Flexible Landing Sites (Helipads)',
      'Scenic Views and Aerial Tours',
      'Ideal for Short-Haul Executive Travel',
      'Rapid Medical or Emergency Response'
    ],
    features: [
      {
        title: 'Executive Transfers',
        description: 'Transfer seamlessly from your private jet directly to your final destination in the heart of the city.',
        image: '/assets/services/helicopter_charter.jpg'
      },
      {
        title: 'Aerial Surveys & Tours',
        description: 'Experience stunning vistas or conduct professional aerial surveys with our state-of-the-art helicopters.',
        image: '/assets/backgrounds/miami_bg.jpg'
      }
    ],
    process: [
      { step: '01', title: 'Route Planning', description: 'We identify the most efficient route and landing sites for your trip.' },
      { step: '02', title: 'Aircraft Selection', description: 'Choose from twin-engine or single-engine helicopters based on your mission.' },
      { step: '03', title: 'Safety Briefing', description: 'Our pilots provide a comprehensive briefing before takeoff for your peace of mind.' },
      { step: '04', title: 'Direct Arrival', description: 'Land exactly where you need to be, saving hours of ground travel.' }
    ]
  }
};
