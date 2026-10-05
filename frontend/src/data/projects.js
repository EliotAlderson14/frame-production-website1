const img = (id) => `/media/stock/${id}.jpg`;

export const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "commercial", label: "COMMERCIAL" },
  { key: "branded", label: "BRANDED CONTENT" },
  { key: "social", label: "SOCIAL" },
  { key: "sports", label: "SPORTS" },
  { key: "music", label: "MUSIC" },
];

export const PROJECTS = [
  {
    slug: "alex-topuria-edit",
    number: "01",
    title: "ALEX TOPURIA",
    category: "SPORTS",
    categoryKey: "sports",
    year: "",
    format: "SPORTS EDIT",
    client: null,
    role: "Editing",
    tools: [],
    poster: "/media/posters/alex-topuria.svg",
    video: "/videos/alex.mp4",
    orientation: "landscape",
    description: "An independent sports edit featuring Alex Topuria, assembled from UFC fight clips.",
    synopsis: "A first editing piece focused on pacing and impact, built from existing footage.",
    gallery: [],
    additionalVideos: [],
    details: [],
  },
  {
    slug: "mate-motors",
    number: "02",
    title: "MATE MOTORS",
    category: "COMMERCIAL",
    categoryKey: "commercial",
    year: "",
    format: "VERTICAL COMMERCIAL",
    client: "Mate Motors",
    clientLabel: "BRAND",
    role: null,
    tools: [],
    poster: "/media/posters/mate-motors.svg",
    video: "/videos/Mate Motors.mp4",
    orientation: "portrait",
    description: "Two short-form advertisements for Mate Motors, presented together as one project.",
    synopsis: "Both videos retain their original vertical format.",
    gallery: [],
    additionalVideos: [
      { src: "/videos/TEST-GB 1.mp4", label: "MATE MOTORS — FILM 02" },
    ],
    details: [],
  },
  {
    slug: "socar",
    number: "03",
    title: "SOCAR",
    category: "COMMERCIAL",
    categoryKey: "commercial",
    year: "",
    format: "VERTICAL COMMERCIAL",
    client: "SOCAR",
    clientLabel: "BRAND",
    role: null,
    tools: [],
    poster: "/media/posters/socar.svg",
    video: "/videos/Nika Final.mp4",
    orientation: "portrait",
    description: "A short-form advertisement for SOCAR, presented in its original vertical format.",
    synopsis: null,
    gallery: [],
    additionalVideos: [],
    details: [],
  },
  {
    slug: "zooplus",
    number: "04",
    title: "ZOOPLUS",
    category: "COMMERCIAL",
    categoryKey: "commercial",
    year: "",
    format: "VERTICAL COMMERCIAL",
    client: "Zooplus",
    clientLabel: "BRAND",
    role: null,
    tools: [],
    poster: "/media/posters/zooplus.svg",
    video: "/videos/Comp 1.mp4",
    orientation: "portrait",
    description: "A vertical advertisement for Zooplus, a pet store.",
    synopsis: null,
    gallery: [],
    additionalVideos: [],
    details: [],
  },
  {
    slug: "brunch-and-dine",
    number: "05",
    title: "BRUNCH & DINE",
    category: "BRANDED CONTENT",
    categoryKey: "branded",
    year: "",
    format: "ADVERTISING EDIT",
    client: "Brunch & Dine",
    clientLabel: "BRAND",
    role: "Editing",
    tools: [],
    poster: "/media/posters/brunch-and-dine.svg",
    video: "/videos/BRUNCH & DINE PROMO FINAL.mp4",
    orientation: "portrait",
    description: "A short-form advertising edit for Brunch & Dine.",
    synopsis: null,
    gallery: [],
    additionalVideos: [],
    details: [],
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "FILM PRODUCTION",
    desc: "Short films and documentaries produced end to end — development, crewing, locations and delivery.",
    image: img("photo-1612544409025-e1f6a56c1152", 1400),
  },
  {
    n: "02",
    title: "COMMERCIALS & BRANDED CONTENT",
    desc: "Advertising built to be watched on purpose. Concepts, shoots and finishes for brands with taste.",
    image: img("photo-1784609525368-67166041bc7c", 1400),
  },
  {
    n: "03",
    title: "SOCIAL CONTENT",
    desc: "Vertical-first campaigns and always-on content systems, framed 9:16 from the first take.",
    image: img("photo-1776548067882-2bc950786b6a", 1400),
  },
  {
    n: "04",
    title: "EDITING & POST-PRODUCTION",
    desc: "Edit, colour grade, sound design and finishing suites that give every frame its final weight.",
    image: img("photo-1789922129898-a23555ffdf63", 1400),
  },
  {
    n: "05",
    title: "DIRECTING & CREATIVE",
    desc: "Creative direction and on-camera direction — the eye and the voice that hold a film together.",
    image: img("photo-1777683536740-22807240296b", 1400),
  },
];

export const PROCESS = [
  { n: "01", title: "CONCEPT", desc: "Idea, treatment and the one line the film is about." },
  { n: "02", title: "PRE-PRODUCTION", desc: "Casting, locations, scheduling and every plan that saves a shoot." },
  { n: "03", title: "SHOOT", desc: "Cameras, light and a calm set where the best take can happen." },
  { n: "04", title: "EDIT", desc: "Structure, rhythm and the discipline to cut what doesn't serve." },
  { n: "05", title: "COLOR & SOUND", desc: "Grade, mix and design — the half of the film you feel." },
  { n: "06", title: "FINAL DELIVERY", desc: "Masters, cutdowns and formats for every screen it will live on." },
];

export const TEAM = [
  {
    n: "01",
    discipline: "CAMERA / PRODUCTION",
    role: "Director & Shooter",
    portrait: img("photo-1759830849296-b4339df60c58", 1200),
    bio: "Frames the film before the camera is ever built. Directs on set and shoots with a documentary pulse.",
  },
  {
    n: "02",
    discipline: "EDIT / POST-PRODUCTION",
    role: "Editor & Colorist",
    portrait: img("photo-1765539160785-e7953620488f", 1200),
    bio: "Where every film is really made. Rhythm, structure and a grade that gives the story its temperature.",
  },
  {
    n: "03",
    discipline: "ON-CAMERA / TALENT",
    role: "Actress & Presenter",
    portrait: img("photo-1506863530036-1efeddceb993", 1200),
    bio: "The face and voice in front of the lens — scripts delivered, hosts directed, brands given a human register.",
  },
];

export const INDUSTRIES = [
  "BRANDS",
  "AGENCIES",
  "SPORT",
  "AUTOMOTIVE",
  "FASHION",
  "HOSPITALITY",
  "MUSIC",
  "SOCIAL CAMPAIGNS",
];

export const HERO_IMAGE = img("photo-1632187981988-40f3cbaeef5e", 2400);
export const SHOWREEL_POSTER = img("photo-1577190651915-bf62d54d5b36", 2200);
export const SHOWREEL_VIDEO =
  null;

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
export const nextProject = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
