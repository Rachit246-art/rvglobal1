export interface DestinationDetail {
  id: string;
  name: string;
  country: string;
  iataCode: string;
  description: string;
  mainImage: string;
  heroImage: string;
  popularRoutes: string[];
  highlights: string[];
  airportInfo: {
    name: string;
    distance: string;
    features: string[];
  }[];
  content: {
    title: string;
    text: string;
    image: string;
  }[];
}

export const destinationsData: Record<string, DestinationDetail> = {
  'aspen': {
    id: 'aspen',
    name: 'Aspen',
    country: 'USA',
    iataCode: 'ASE',
    description: 'Nestled in the heart of the Colorado Rockies, Aspen is synonymous with luxury mountain living. From world-class skiing on four distinct mountains to elite shopping and high-altitude dining, it is a year-round playground for the global elite.',
    mainImage: '/assets/destinations/aspen.jpg',
    heroImage: '/assets/backgrounds/ny_bg.jpg',
    popularRoutes: ['New York (TEB) to Aspen', 'Los Angeles (VNY) to Aspen', 'Dallas (DAL) to Aspen'],
    highlights: [
      'World-renowned skiing at Snowmass and Aspen Mountain',
      'Exclusive shopping in downtown Aspen',
      'High-altitude gourmet dining experiences',
      'Year-round outdoor adventures and hiking'
    ],
    airportInfo: [
      {
        name: 'Aspen-Pitkin County Airport (ASE)',
        distance: '3 miles from downtown',
        features: ['Dedicated FBO facilities', 'Heated hangar space', 'Expert mountain approach pilots required']
      }
    ],
    content: [
      {
        title: 'The Winter Capital of Luxury',
        text: 'Aspen is not just a ski resort; it\'s a lifestyle. During the winter months, the town transforms into a global hub for private jet travelers seeking the finest powder and the most exclusive apres-ski scenes.',
        image: '/assets/backgrounds/ny_bg.jpg'
      },
      {
        title: 'Summer in the Rockies',
        text: 'When the snow melts, Aspen reveals a different kind of beauty. The Aspen Music Festival, Food & Wine Classic, and endless mountain trails attract those seeking refined culture in a rugged landscape.',
        image: '/assets/destinations/aspen.jpg'
      }
    ]
  },
  'maldives': {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    iataCode: 'MLE',
    description: 'The Maldives is an archipelago of unparalleled beauty, where turquoise lagoons meet white-sand beaches. This secluded paradise offers the ultimate in privacy and overwater luxury, accessible only by the most refined travel methods.',
    mainImage: '/assets/destinations/maldives.jpg',
    heroImage: '/assets/destinations/maldives.jpg',
    popularRoutes: ['Dubai (DXB) to Maldives', 'London (LTN) to Maldives', 'Singapore (SIN) to Maldives'],
    highlights: [
      'Private island resorts with overwater villas',
      'Pristine coral reefs and world-class diving',
      'Exclusive seaplane transfers directly from the jet',
      'Unmatched privacy and serene natural beauty'
    ],
    airportInfo: [
      {
        name: 'Velana International Airport (MLE)',
        distance: 'Island-based terminal',
        features: ['VIP CIP Lounge for private jet guests', 'Direct seaplane transfer coordination', 'Dedicated private jet parking']
      }
    ],
    content: [
      {
        title: 'Secluded Splendor',
        text: 'Each resort in the Maldives is typically located on its own private island, ensuring a level of exclusivity that is hard to find anywhere else on earth.',
        image: '/assets/destinations/maldives.jpg'
      },
      {
        title: 'An Aquatic Paradise',
        text: 'From underwater restaurants to night snorkeling with whale sharks, the Maldives offers unique experiences that center around its vibrant marine ecosystem.',
        image: '/assets/destinations/maldives.jpg'
      }
    ]
  },
  'st-barts': {
    id: 'st-barts',
    name: 'St. Barts',
    country: 'France',
    iataCode: 'SBH',
    description: 'Saint Barthélemy, known as St. Barts, is the most sophisticated island in the Caribbean. A French overseas territory, it blends European chic with tropical allure, attracting a discerning crowd with its gourmet restaurants and hidden coves.',
    mainImage: '/assets/destinations/st_barts.jpg',
    heroImage: '/assets/backgrounds/miami_bg.jpg',
    popularRoutes: ['San Juan (SJU) to St. Barts', 'St. Maarten (SXM) to St. Barts', 'Miami (OPF) to St. Barts'],
    highlights: [
      'Gourmet French cuisine with a Caribbean twist',
      'Exclusive yacht-filled harbor of Gustavia',
      'Pristine, uncrowded beaches like Saline and Colombier',
      'High-end designer boutiques and vibrant nightlife'
    ],
    airportInfo: [
      {
        name: 'Gustaf III Airport (SBH)',
        distance: '1 mile from Gustavia',
        features: ['Iconic short-runway landing experience', 'Specialized STOL aircraft requirement', 'Seamless connection from St. Maarten (SXM)']
      }
    ],
    content: [
      {
        title: 'The Riviera of the Caribbean',
        text: 'St. Barts feels more like a piece of the Cote d\'Azur that drifted across the Atlantic. The island\'s atmosphere is one of relaxed elegance and understated luxury.',
        image: '/assets/backgrounds/miami_bg.jpg'
      }
    ]
  },
  'mykonos': {
    id: 'mykonos',
    name: 'Mykonos',
    country: 'Greece',
    iataCode: 'JMK',
    description: 'Mykonos is the glamorous heart of the Cyclades. Known for its iconic windmills, whitewashed alleys, and legendary beach clubs, it offers a high-energy summer escape for those who want to see and be seen.',
    mainImage: '/assets/destinations/mykonos.jpg',
    heroImage: '/assets/destinations/mykonos.jpg',
    popularRoutes: ['Athens (ATH) to Mykonos', 'London (LTN) to Mykonos', 'Ibiza (IBZ) to Mykonos'],
    highlights: [
      'Legendary beach clubs like Nammos and Scorpios',
      'Iconic sunset views from Little Venice',
      'Charming whitewashed architecture of Chora',
      'Vibrant nightlife and world-class DJ sets'
    ],
    airportInfo: [
      {
        name: 'Mykonos International Airport (JMK)',
        distance: '2 miles from Chora',
        features: ['Executive jet handling', 'Seasonal slot priority for charters', 'Fast-track VIP processing']
      }
    ],
    content: [
      {
        title: 'The Island of the Winds',
        text: 'Mykonos combines traditional Greek charm with a cosmopolitan energy that is unmatched in the Mediterranean.',
        image: '/assets/destinations/mykonos.jpg'
      }
    ]
  },
  'dubai': {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    iataCode: 'DXB',
    description: 'Dubai is a global metropolis where futuristic architecture meets ancient desert traditions. As a major business and leisure hub, it offers endless possibilities for luxury, from sky-high dining to man-made islands.',
    mainImage: '/assets/destinations/dubai.jpg',
    heroImage: '/assets/backgrounds/la_bg.jpg',
    popularRoutes: ['London (LTN) to Dubai', 'Moscow (VKO) to Dubai', 'Riyadh (RUH) to Dubai'],
    highlights: [
      'Burj Khalifa and the world\'s most iconic skyline',
      'Luxury shopping at The Dubai Mall',
      'Desert safaris and private dunes dinners',
      'Palm Jumeirah\'s exclusive beach resorts'
    ],
    airportInfo: [
      {
        name: 'Dubai World Central (DWC) / Al Maktoum',
        distance: 'Dedicated executive terminal',
        features: ['World-class FBO facilities', 'Fastest city access for private jets', 'Discreet VIP terminals']
      }
    ],
    content: [
      {
        title: 'A City of Superlatives',
        text: 'Dubai is a testament to human ambition, offering a level of service and luxury that consistently sets new global standards.',
        image: '/assets/backgrounds/la_bg.jpg'
      }
    ]
  },
  'london': {
    id: 'london',
    name: 'London',
    country: 'UK',
    iataCode: 'LTN',
    description: 'London is a timeless capital of finance, culture, and history. With multiple dedicated private aviation airports, it provides effortless access to the heart of one of the world\'s most influential cities.',
    mainImage: '/assets/destinations/london.jpg',
    heroImage: '/assets/backgrounds/ny_bg.jpg',
    popularRoutes: ['New York (TEB) to London', 'Paris (LBG) to London', 'Geneva (GVA) to London'],
    highlights: [
      'West End theater and world-class museums',
      'Exclusive members-only clubs in Mayfair',
      'Historic landmarks and royal palaces',
      'Michelin-starred dining and high-tea'
    ],
    airportInfo: [
      {
        name: 'London Farnborough (FAB)',
        distance: 'Business-exclusive airport',
        features: ['Award-winning FBO services', 'Discreet and secure environment', 'Excellent motorway links to London']
      },
      {
        name: 'London Biggin Hill (BQH)',
        distance: 'Closest to the City',
        features: ['Helicopter transfer to Battersea in 6 mins', 'Dedicated customs and immigration', 'Extended operating hours']
      }
    ],
    content: [
      {
        title: 'The Global Gateway',
        text: 'Whether for a board meeting in the City or a weekend at Ascot, London remains a primary destination for private aviation.',
        image: '/assets/backgrounds/ny_bg.jpg'
      }
    ]
  },
  'paris': {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    iataCode: 'LBG',
    description: 'Paris, the city of light and haute couture, is an enduring destination for those who appreciate the finer things in life. From the Louvre to the cafes of Saint-Germain-des-Prés, its charm is eternal.',
    mainImage: '/assets/destinations/paris.jpg',
    heroImage: '/assets/destinations/paris.jpg',
    popularRoutes: ['London (LTN) to Paris', 'Geneva (GVA) to Paris', 'New York (TEB) to Paris'],
    highlights: [
      'Haute couture shopping on Avenue Montaigne',
      'World-leading art galleries and museums',
      'Romantic Seine river cruises and fine dining',
      'The iconic Eiffel Tower and Arc de Triomphe'
    ],
    airportInfo: [
      {
        name: 'Paris-Le Bourget (LBG)',
        distance: 'Europe\'s busiest business airport',
        features: ['Exclusive to business aviation', 'Multiple elite FBO operators', 'Closest airport to central Paris']
      }
    ],
    content: [
      {
        title: 'The Capital of Elegance',
        text: 'Paris continues to define luxury through its art, fashion, and culinary heritage.',
        image: '/assets/destinations/paris.jpg'
      }
    ]
  },
  'geneva': {
    id: 'geneva',
    name: 'Geneva',
    country: 'Switzerland',
    iataCode: 'GVA',
    description: 'Geneva is a center of global diplomacy and watchmaking excellence, nestled on the shores of Western Europe\'s largest lake. It serves as a gateway to the world\'s most exclusive ski resorts and private banking centers.',
    mainImage: '/assets/destinations/geneva.jpg',
    heroImage: '/assets/backgrounds/la_bg.jpg',
    popularRoutes: ['London (LTN) to Geneva', 'Paris (LBG) to Geneva', 'Moscow (VKO) to Geneva'],
    highlights: [
      'Luxury watch boutiques on Rue du Rhône',
      'Private banking and international diplomacy',
      'Gateway to the Swiss and French Alps',
      'Serene beauty of Lake Geneva (Lac Léman)'
    ],
    airportInfo: [
      {
        name: 'Geneva Airport (GVA)',
        distance: '3 miles from downtown',
        features: ['Extensive private aviation terminal', 'Efficient customs for high-value goods', 'Direct limousine transfers to the lakefront']
      }
    ],
    content: [
      {
        title: 'Swiss Precision',
        text: 'Geneva offers a unique blend of cosmopolitan efficiency and breathtaking alpine scenery.',
        image: '/assets/backgrounds/la_bg.jpg'
      }
    ]
  }
};
