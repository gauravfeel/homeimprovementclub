import broadwayAlmaImg from "@/assets/broadway-alma.jpg";
import customHomeBurnabyImg from "@/assets/custom-home-burnaby.jpg";
import projectStevensonImg from "@/assets/project-stevenson.jpg";
import customHomeDeltaImg from "@/assets/custom-home-delta.jpg";
import projectCloverdaleImg from "@/assets/project-cloverdale.jpg";
import joyce2Img from "@/assets/joyce-2.jpg";
import m4BuildingImg from "@/assets/m4-building.webp";
import theGrandImg from "@/assets/the-grand.jpg";
import grandLionImg from "@/assets/grand-lion.webp";
import theButterflyImg from "@/assets/the-butterfly.jpg";
import skyviewImg from "@/assets/skyview.webp";
import satoriImg from "@/assets/satori.webp";
import logo from "@/assets/hic-logo-small.png";

/** Replace placeholders after HIC confirms attribution, image rights and client consent. */
export type GalleryProject = {
  slug: string;
  title: string;
  location: string;
  category: string;
  scope: string;
  teaser: string;
  overview: string[];
  year?: string;
  workCompleted?: string[];
  upcomingWork?: string[];
  serviceSlug: string;
  image: string;
  imageAlt: string;
  beforeImage?: string;
  beforeAlt?: string;
  comingSoon?: boolean;
  placeholderImage?: boolean;
  verified?: boolean;
  youtubeUrl?: string;
};

const STANDARD_DOOR_PACKAGE: string[] = [
  "Unit entry doors and hardware",
  "Unit interior doors and hardware",
  "Washroom accessories",
  "Baseboards",
  "Window sills",
  "Door trims",
  "Metal doors and hardware",
  "ADOs",
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    slug: "broadway-alma",
    title: "Broadway & Alma",
    location: "Vancouver, BC, Canada",
    category: "Finishing & Carpentry",
    scope: "Finishing & Carpentry",
    teaser:
      "3709 West Broadway — contemporary mixed-use design with a glass storefront at street level and textured residential levels above.",
    overview: [
      "The Broadway Alma building at 3709 West Broadway features a contemporary mixed use design with a glass storefront at street level and a textured exterior above. The contrast between the transparent commercial base and the solid residential levels creates a strong architectural presence, while the stepped massing adds visual interest and defines the building along the West Broadway corridor.",
    ],
    year: "January 2025 – present",
    workCompleted: STANDARD_DOOR_PACKAGE,
    serviceSlug: "custom-homes-multiplex",
    image: broadwayAlmaImg,
    imageAlt:
      "Contemporary mixed-use building at Broadway and Alma, Vancouver, with glass storefront and stepped residential massing",
  },
  {
    slug: "joyce-2",
    title: "Joyce 2",
    location: "Vancouver, BC, Canada",
    category: "Finishing & Carpentry",
    scope: "Finishing & Carpentry",
    teaser:
      "Modern residential tower with warm wood-toned exterior, a grid of balconies, and planted outdoor spaces.",
    overview: [
      "Joyce 2 is a modern residential tower in Vancouver with a warm wood toned exterior and a distinctive grid of balconies. The building incorporates greenery through planted balconies and open podium levels which help create a welcoming street level presence and a strong connection between urban living and nature.",
    ],
    year: "January 2025 – present",
    workCompleted: STANDARD_DOOR_PACKAGE,
    serviceSlug: "custom-homes-multiplex",
    image: joyce2Img,
    imageAlt: "Joyce 2 residential tower in Vancouver with wood-toned facade and balcony grid",
  },
  {
    slug: "m4-building",
    title: "M4 Building",
    location: "Vancouver, BC, Canada",
    category: "Finishing & Carpentry",
    scope: "Finishing & Carpentry",
    teaser:
      "Contemporary mixed-use tower with bold stacked form and dark glass exterior in Vancouver.",
    overview: [
      "The M4 building in Vancouver is a contemporary mixed use building with a bold stacked form and a dark glass exterior. Its design features layered rectangular volumes that create a strong visual presence at the street level while large windows bring in natural light and emphasize its modern urban character.",
    ],
    year: "February 2023 – February 2024",
    workCompleted: STANDARD_DOOR_PACKAGE,
    serviceSlug: "custom-homes-multiplex",
    image: m4BuildingImg,
    imageAlt: "M4 Building in Vancouver with stacked dark glass volumes at sunset",
  },
  {
    slug: "the-grand",
    title: "The Grand",
    location: "Surrey, BC, Canada",
    category: "Finishing & Carpentry",
    scope: "Finishing & Carpentry",
    teaser:
      "Tall residential tower on King George Boulevard with slim form, neutral exterior, and landscaped podium.",
    overview: [
      "The Grand building in King George Surrey is a tall residential tower with a sleek modern design and a light neutral exterior. Its slim vertical form and repeating balconies give it a clean and contemporary look while the lower levels connect to the street with landscaped areas that help it fit into the surrounding neighborhood.",
    ],
    year: "April 2023 – February 2024",
    workCompleted: STANDARD_DOOR_PACKAGE,
    serviceSlug: "custom-homes-multiplex",
    image: theGrandImg,
    imageAlt: "The Grand residential tower in Surrey with landscaped podium and river views",
  },
  {
    slug: "the-grand-lion",
    title: "The Grand Lion",
    location: "North Vancouver, BC, Canada",
    category: "Finishing & Carpentry",
    scope: "Finishing & Carpentry",
    teaser:
      "Mid-rise Vancouver residential building with light exterior, large windows, and glass balconies.",
    overview: [
      "The Grand Lion is a mid rise residential building in Vancouver with a clean modern design and a light coloured exterior. It features large windows and glass balconies that create an open and bright appearance while the street level is designed to blend smoothly with the surrounding neighborhood and provide a comfortable residential feel.",
    ],
    year: "July 2021 – September 2022",
    workCompleted: STANDARD_DOOR_PACKAGE,
    serviceSlug: "custom-homes-multiplex",
    image: grandLionImg,
    imageAlt: "The Grand Lion mid-rise residential building with glass balconies",
  },
  {
    slug: "the-butterfly",
    title: "The Butterfly",
    location: "Vancouver, BC, Canada",
    category: "Finishing & Carpentry",
    scope: "Finishing & Carpentry",
    teaser:
      "Sculptural Vancouver tower with curved white form and twisting balconies on the skyline.",
    overview: [
      "The Butterfly in Vancouver is a striking residential tower known for its sculptural curved form and twisting balconies. Its smooth white exterior and flowing design create a dynamic presence on the skyline while the stacked balconies provide outdoor space and emphasize the building’s unique organic appearance.",
    ],
    year: "2024 – March 2025",
    workCompleted: [
      "Backing installed for kitchens, washrooms, doors, and window bracket coverings",
    ],
    serviceSlug: "custom-homes-multiplex",
    image: theButterflyImg,
    imageAlt: "The Butterfly tower in Vancouver with sculptural curved balconies",
  },
  {
    slug: "custom-home-burnaby",
    title: "Custom Home Burnaby BC",
    location: "Burnaby, BC, Canada",
    category: "Custom home",
    scope: "Custom home",
    teaser:
      "Two-storey custom home in Burnaby with a warm stucco and stone exterior, tall windows, and a wide concrete drive.",
    overview: [
      "This custom home in Burnaby is a two-storey residence with warm stucco, stone accents, and tall black-framed windows. The photo shows the home during construction, with the garage opening and front yard still in progress.",
    ],
    serviceSlug: "custom-homes-multiplex",
    image: customHomeBurnabyImg,
    imageAlt:
      "Custom two-storey home in Burnaby, BC during construction, with stone garage, tall windows, and concrete drive",
  },
  {
    slug: "custom-home-project-stevenson",
    title: "Custom Home — Project Stevenson",
    location: "British Columbia, Canada",
    category: "Custom home",
    scope: "Custom home",
    teaser:
      "Custom home under construction with a light gable facade, covered upper decks, and a walk-out lower level.",
    overview: [
      "Project Stevenson is a custom home with a light gable facade, covered upper decks, and a walk-out lower level. The build is shown in progress, with the same multiplex project walkthrough used on the custom homes and multiplex service page.",
    ],
    youtubeUrl: "https://youtu.be/CuLh6_YciqM",
    serviceSlug: "custom-homes-multiplex",
    image: projectStevensonImg,
    imageAlt:
      "Custom Home Project Stevenson under construction, with gable entry, upper decks, and open lower level",
  },
  {
    slug: "custom-home-delta",
    title: "Custom Home Delta BC",
    location: "Delta, BC, Canada",
    category: "Custom home",
    scope: "Custom home",
    teaser:
      "White gable custom home in Delta with a two-car garage, board-and-batten siding, and a paver driveway.",
    overview: [
      "This custom home in Delta is a white gable residence with board-and-batten siding, a two-car garage, and a paver driveway. Tall windows and a landscaped side yard give the street a calm, finished residential presence.",
    ],
    serviceSlug: "custom-homes-multiplex",
    image: customHomeDeltaImg,
    imageAlt:
      "Custom home in Delta, BC with white gable garage, board-and-batten siding, and paver driveway",
  },
  {
    slug: "project-cloverdale",
    title: "Project Cloverdale",
    location: "Cloverdale, BC, Canada",
    category: "Custom home",
    scope: "Custom home",
    teaser:
      "Contemporary custom home in Cloverdale with stone, stucco, a glass garage door, and an upper balcony.",
    overview: [
      "Project Cloverdale is a contemporary custom home with a stone garage base, white stucco walls, a glass garage door, and an upper balcony. A paver drive and planted front lawn complete the street presence.",
    ],
    serviceSlug: "custom-homes-multiplex",
    image: projectCloverdaleImg,
    imageAlt:
      "Custom home in Cloverdale, BC with stone garage, glass door, balcony, and landscaped front yard",
  },
  {
    slug: "skyview",
    title: "Skyview",
    location: "Mission, BC, Canada",
    category: "Upcoming",
    scope: "Finishing & Carpentry",
    teaser:
      "Upcoming townhouse-style residences with large windows, private balconies, and landscaped walkways.",
    overview: [
      "Sky View is an upcoming residential project featuring modern low rise buildings with a clean and contemporary design. The development includes multiple townhouse style residences with large windows private balconies and landscaped walkways creating a calm and community focused living environment that blends with the surrounding greenery.",
    ],
    year: "August 2026",
    upcomingWork: STANDARD_DOOR_PACKAGE,
    serviceSlug: "custom-homes-multiplex",
    image: skyviewImg,
    imageAlt: "Rendering of Skyview townhouses in Mission, BC",
    comingSoon: true,
  },
  {
    slug: "satori",
    title: "SATORI",
    location: "Coquitlam, BC, Canada",
    category: "Upcoming",
    scope: "Finishing & Carpentry",
    teaser:
      "Upcoming Coquitlam low-rise homes with minimalist design, light exterior, and private outdoor space.",
    overview: [
      "Satori is an upcoming residential project in Coquitlam featuring modern low rise homes with a clean minimalist design. The building uses light coloured exterior materials large windows and private outdoor spaces to create a calm and contemporary living environment that blends with its landscaped surroundings.",
    ],
    year: "September 2026",
    upcomingWork: ["Supply doors and moulding", "Install metal doors"],
    serviceSlug: "custom-homes-multiplex",
    image: satoriImg,
    imageAlt: "Rendering of SATORI residential development in Coquitlam",
    comingSoon: true,
  },
  {
    slug: "photon-control",
    title: "Photon Control",
    location: "Richmond, BC, Canada",
    category: "Upcoming",
    scope: "Finishing & Carpentry",
    teaser:
      "Upcoming Richmond industrial and office development with modern, functional exterior.",
    overview: [
      "The Photon Control project in Richmond is an upcoming industrial and office development scheduled for completion in September 2026. The building is designed with a modern and functional exterior featuring clean lines large windows and a professional appearance that supports advanced technology and manufacturing uses while fitting into the surrounding industrial area.",
    ],
    year: "September 2026",
    upcomingWork: [
      "Supply all required hardware including hinges, handles, locks, closers, stops, and related accessories",
      "Install unit entry doors and hardware",
      "Install unit interior doors and hardware",
      "Washroom accessories",
      "Baseboards",
      "Window sills",
      "Door trims",
      "Metal doors and hardware",
      "ADOs",
    ],
    serviceSlug: "custom-homes-multiplex",
    image: logo,
    imageAlt: "",
    comingSoon: true,
    placeholderImage: true,
  },
];

export const GALLERY_SECTIONS = [
  { id: "finishing-carpentry", label: "Finishing & Carpentry" },
  { id: "custom-home", label: "Custom home" },
  { id: "upcoming", label: "Upcoming" },
] as const;

export function getGalleryProject(slug: string) {
  return GALLERY_PROJECTS.find((project) => project.slug === slug);
}

export function galleryProjectsByCategory(category: string) {
  return GALLERY_PROJECTS.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase(),
  );
}

export function youtubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
  );
  const id = match?.[1];
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

/** @deprecated Use GALLERY_PROJECTS — kept for older imports */
export interface VerifiedProject {
  title: string;
  location: string;
  serviceSlug: string;
  scope: string[];
  description: string;
  image: string;
  imageAlt: string;
  beforeImage?: string;
  beforeAlt?: string;
  verified: true;
}

export const VERIFIED_PROJECTS: VerifiedProject[] = GALLERY_PROJECTS.filter(
  (project) => project.verified && !project.comingSoon,
).map((project) => ({
  title: project.title,
  location: project.location,
  serviceSlug: project.serviceSlug,
  scope: [project.scope],
  description: project.teaser,
  image: project.image,
  imageAlt: project.imageAlt,
  beforeImage: project.beforeImage,
  beforeAlt: project.beforeAlt,
  verified: true as const,
}));
