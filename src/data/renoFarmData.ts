import { UserProfile } from '../types';

export interface SustainablePractice {
  id: string;
  title: string;
  description: string;
  badge: string;
  metric: string;
  iconName: 'Sprout' | 'Droplets' | 'Layers' | 'Sun';
}

export interface ClientReview {
  id: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialty: string;
  avatar: string;
  bio: string;
}

export interface EducationalTour {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  groupSize: string;
  highlights: string[];
}

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Martin Saris',
    email: 'martin.saris@renofarm.com',
    role: 'Farm Director',
    farmName: 'Reno Farm Dairy Estate',
    avatarUrl: '/images/avatar-martin.jpg',
    facilityLocation: 'North Pasture & Milking Station A',
  },
  {
    id: 'usr-2',
    name: 'Dr. Sarah Jenkins, DVM',
    email: 'dr.sarah@renofarm.com',
    role: 'Chief Veterinarian',
    farmName: 'Reno Farm Biometrics Lab',
    avatarUrl: '/images/avatar-sarah.jpg',
    facilityLocation: 'Clinical Quarantine & Diagnostics Center',
  },
  {
    id: 'usr-3',
    name: 'Lincoln Botosh',
    email: 'lincoln.b@renofarm.com',
    role: 'Herd Operations Lead',
    farmName: 'Reno Farm Livestock Pen 4B',
    avatarUrl: '/images/avatar-lincoln.jpg',
    facilityLocation: 'IoT Ear-Tag & Bolus Gateway Terminal',
  },
];

export const SUSTAINABLE_PRACTICES: SustainablePractice[] = [
  {
    id: 'practice-1',
    title: 'Organic Crop Cultivation',
    description:
      'Discover our commitment to cultivating pesticide-free, non-GMO crops, ensuring that our produce is not only nutritious but also environmentally friendly with zero chemical residues.',
    badge: '100% Non-GMO',
    metric: '450 Hectares Certified',
    iconName: 'Sprout',
  },
  {
    id: 'practice-2',
    title: 'Water Conservation Methods',
    description:
      'Learn about our innovative water conservation techniques, such as drip irrigation, closed-loop dairy cooling, and rainwater harvesting, which help us efficiently manage water resources and minimize wastage.',
    badge: 'Closed-Loop Tech',
    metric: '42% Water Recycled',
    iconName: 'Droplets',
  },
  {
    id: 'practice-3',
    title: 'Soil Enrichment Strategies',
    description:
      'Explore our practices of natural composting, clover cover cropping, and rotational grazing, which foster rich microbial soil ecosystems, promote biodiversity, and replenish organic matter naturally.',
    badge: 'Zero Synthetic Fertilizer',
    metric: '+3.8% Organic Soil Matter',
    iconName: 'Layers',
  },
  {
    id: 'practice-4',
    title: 'Renewable Energy Initiatives',
    description:
      'Delve into our use of solar micro-arrays, barn-roof photovoltaic panels, and dairy methane bio-digesters that power our farm operations, reducing our carbon footprint to net-neutral levels.',
    badge: 'Solar & Bio-gas',
    metric: '92% Green Energy Powered',
    iconName: 'Sun',
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    title: 'RICH, CREAMY, AND DELICIOUS',
    quote:
      'The farm milk from Reno Farm feels like a taste that brings back memories of the old-fashioned fresh milk I used to enjoy as a child. It is a genuine organic delight with unmatched texture.',
    author: 'Jordyn Passaquindici Arcand',
    role: 'CEO, Farming Oasis Markets',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'rev-2',
    title: 'HEALTHY AND NOURISHING',
    quote:
      'The farm milk here is not only delicious but also nourishing. It is refreshing to know that my family is consuming milk that comes from happy, pasture-raised cows without added hormones or artificial additives.',
    author: 'Haylie Saris',
    role: 'COO, Farming Oasis',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'rev-3',
    title: 'A TASTE OF FRESHNESS',
    quote:
      'Every sip of the farm milk feels like a burst of freshness straight from the source. It is evident that the cows are treated with great dignity, and the milk quality reflects the care and dedication put into the farm operations.',
    author: 'Carter Curtis',
    role: 'CFO, Green Valley Artisans',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'rev-4',
    title: 'A FARM-TO-TABLE DELIGHT',
    quote:
      'The farm milk is the epitome of a farm-to-table delight. You can really taste the difference in the quality and purity of the milk, knowing it comes from cows raised in a sustainable and ethical environment.',
    author: 'Giana Dokidis',
    role: 'CDO, Pure Harvest Organics',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  },
];

export const FARMERS_ROSTER: FarmerProfile[] = [
  {
    id: 'farm-1',
    name: 'Lincoln Botosh',
    role: 'Senior Cattle Specialist',
    experienceYears: 18,
    specialty: 'Ruminant Nutrition & Herd Genetics',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    bio: 'Pioneered Reno Farm’s rotational grazing and low-stress cattle handling protocols since 2008.',
  },
  {
    id: 'farm-2',
    name: 'Martin Saris',
    role: 'Head Farm Director',
    experienceYears: 24,
    specialty: 'Sustainable Agronomy & Dairy Operations',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Leads our 1,000+ livestock estate with a dedicated focus on organic certification and precision IoT health.',
  },
  {
    id: 'farm-3',
    name: 'Wilson Aminoff',
    role: 'Biometric Telemetry Tech',
    experienceYears: 12,
    specialty: 'IoT Ear-Tag Sensors & ML Predictive Health',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bio: 'Oversees daily calibration of rumination boluses and temperature telemetry transmitters across all pens.',
  },
  {
    id: 'farm-4',
    name: 'Roger Vetrovs',
    role: 'Lead Dairy Agronomist',
    experienceYears: 15,
    specialty: 'Soil Regeneration & Pasture Ecology',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Develops nutrient-dense clover and rye grass pastures that naturally elevate milk CLA and Omega-3 levels.',
  },
  {
    id: 'farm-5',
    name: 'Jakob Botosh',
    role: 'Dairy Processing Master',
    experienceYears: 10,
    specialty: 'Artisanal Batch Bottling & Quality Assurance',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    bio: 'Guarantees milk reaches chilling and bottling under 4°C within 15 minutes of automated collection.',
  },
];

export const EDUCATIONAL_TOURS: EducationalTour[] = [
  {
    id: 'tour-1',
    number: '01',
    title: 'INTERACTIVE FARM EXPERIENCE',
    subtitle: 'Hands-on organic farming, milking observation & livestock care',
    description:
      'Immerse yourself in an engaging and hands-on tour that offers a comprehensive understanding of our farm’s sustainable practices and agricultural processes. Participate in informative sessions led by our knowledgeable staff, where you can learn about topics such as crop cultivation, animal husbandry, and sustainable farming techniques.',
    duration: '2.5 Hours',
    groupSize: 'Up to 20 Visitors',
    highlights: [
      'Gentle interaction with calves and pasture cows',
      'Observation of precision IoT ear-tag monitoring',
      'Automated sanitary milking parlor demonstration',
      'Fresh raw & pasteurized dairy tasting flight',
    ],
  },
  {
    id: 'tour-2',
    number: '02',
    title: 'PASTURE & SOIL BIODIVERSITY WALK',
    subtitle: 'Regenerative ecology & solar microgrid walkthrough',
    description:
      'Walk through our 450-hectare organic pasture lands. Learn how cover crops, natural rainwater retention ponds, and microbial composting create a self-sustaining ecosystem without artificial fertilizers.',
    duration: '2.0 Hours',
    groupSize: 'Up to 15 Visitors',
    highlights: [
      'Live soil microbiome examination with agronomists',
      'Solar farm and bio-digester energy walkthrough',
      'Honeybee apiary and wild pollinator corridors',
      'Seasonal organic fruit picking',
    ],
  },
  {
    id: 'tour-3',
    number: '03',
    title: 'ARTISANAL DAIRY WORKSHOP',
    subtitle: 'Masterclass in small-batch butter, cream & cheese making',
    description:
      'Step into our culinary creamery and discover how our cold-filtered milk is transformed into gold-medal artisanal butter, rich yogurt, and aged farmstead cheeses.',
    duration: '3.0 Hours',
    groupSize: 'Up to 12 Visitors',
    highlights: [
      'Traditional wooden-churn butter making masterclass',
      'Fermentation science & yogurt culture workshop',
      'Gourmet cheese pairing & sommelier tasting',
      'Personalized take-home dairy crate',
    ],
  },
];
