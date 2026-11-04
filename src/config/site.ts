/**
 * Apex Pixels — single source of truth for every editable fact.
 * Components import from here; never hard-code a business fact twice.
 */

export const site = {
  name: "Apex Pixels",
  tagline: "Websites built. Brands seen. Growth measured.",
  founder: "Manish. S",
  whatsappNumber: "917988065129",
  whatsappDisplay: "+91 79880 65129",
  email: "apexpixels.admin@gmail.com",
  address:
    "Plot - 1A, 3F, Sadayandi Nayakar Street, RG Nagar, Medavakkam, Chennai - 600100, Tamil Nadu",
  // Paste the booking page link here, for example https://cal.com/your-name/15min
  bookingUrl: "",
  // Web3Forms access key. Prefer setting VITE_WEB3FORMS_KEY in a .env file; this is the fallback.
  formKey: "",
  siteUrl: "https://www.theapexpixels.com", // Live domain. Update here, in public/sitemap.xml and in public/robots.txt if it ever changes.
  location: "Chennai, Tamil Nadu",
  footerLine: "© 2026 Apex Pixels. Chennai, Tamil Nadu.",
} as const;

/** WhatsApp link with a prefilled message. */
export const waLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const whatsappMessages = {
  general: "Hi Apex Pixels, I would like to talk about a project.",
  call: "Hi Apex Pixels, I would like to book a 15-minute call.",
  package: (packageName: string) =>
    `Hi Apex Pixels, I am interested in the ${packageName} package.`,
} as const;

/** General WhatsApp link, used by every WhatsApp button. */
export const whatsappUrl = waLink(whatsappMessages.general);

/** WhatsApp link for a package card. */
export const packageWhatsappUrl = (packageName: string) =>
  waLink(whatsappMessages.package(packageName));

/**
 * The booking action, shared by every "Book a 15-minute call" button.
 * Opens the booking page when bookingUrl is set; otherwise opens WhatsApp with
 * a call request, so the button never leads nowhere.
 */
export const getBookingHref = () => site.bookingUrl || waLink(whatsappMessages.call);
export const bookingHref = getBookingHref();

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Package = {
  id: string;
  name: string;
  price: string;
  label: string;
  timeline: string;
  discovery?: string;
  text: string;
  features: string[];
  group: "small" | "serious";
};

export const packages: Package[] = [
  {
    id: "launch",
    name: "Launch",
    price: "₹12,000",
    label: "Starting from",
    timeline: "1 to 2 weeks",
    text: "A credible online presence in up to three pages, with an enquiry form and a WhatsApp button.",
    features: [
      "Up to 3 pages, or one long page",
      "Custom design in the client's colours and logo, responsive on every screen",
      "Enquiry form to email, WhatsApp button and Google Maps",
      "Basic search setup",
      "2 revision rounds and a recorded handover video",
      "1 month of free bug fixes",
    ],
    group: "small",
  },
  {
    id: "business",
    name: "Business",
    price: "₹25,000",
    label: "Starting from",
    timeline: "2 to 3 weeks",
    text: "A complete website of up to seven pages, with a gallery and enquiries recorded in a Google Sheet.",
    features: [
      "Up to 7 pages with a custom design",
      "Service or portfolio pages and an image gallery",
      "Enquiries written into a Google Sheet, with an email alert",
      "WhatsApp button, Google Maps and a link to the Google Business Profile",
      "Search setup and analytics setup",
      "3 revision rounds, written approvals at each stage and a 60-minute online walkthrough",
      "3 months of free bug fixes",
    ],
    group: "small",
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹65,000",
    label: "Starting from",
    timeline: "4 to 6 weeks",
    text: "For established businesses: a professional website of 10 to 15 pages, or an online store of up to 100 products. Both include an admin panel.",
    features: [
      "Option A: a 10 to 15 page website with a news or blog section and lead forms that write into a Google Sheet",
      "Option B: an online store with up to 100 products, categories, a cart or enquiry list, one payment gateway and order emails",
      "An admin panel so the client's team can edit content without a developer",
      "Security hardening, backups, search setup and analytics setup",
      "3 revision rounds, written approvals at each stage and a 90-minute training session",
      "3 months of free bug fixes",
    ],
    group: "serious",
  },
  {
    id: "webapp",
    name: "Web App",
    price: "₹1,50,000",
    label: "Starting from",
    timeline: "8 to 12 weeks",
    discovery: "Starts with a paid discovery step of ₹15,000, credited in full to the project",
    text: "One custom web application that replaces spreadsheets and WhatsApp, with logins, roles, dashboards and reports.",
    features: [
      "User accounts with up to 3 roles",
      "A dashboard and up to 3 core modules, for example orders, customers, stock or bookings",
      "An admin panel, and reports that export to CSV or PDF",
      "Email notifications and one third-party integration",
      "Secure cloud deployment with daily backups",
      "A user guide, a training session and two rounds of acceptance testing",
      "3 months of warranty for bug fixes",
    ],
    group: "serious",
  },
  {
    id: "suite",
    name: "Business Suite",
    price: "₹4,50,000",
    label: "Starting from, by assessment",
    timeline: "12 to 20 weeks",
    discovery: "Starts with a paid discovery step of ₹25,000, credited in full to the project",
    text: "Multi-module, multi-branch business management software, planned and delivered in phases.",
    features: [
      "4 to 5 modules chosen from inventory and stock, billing and invoicing, CRM and leads, purchase and vendors, basic accounts, staff records and attendance, and reports",
      "Branch-wise users, permissions, stock and reports, with a combined view for the head office",
      "Up to 25 users and an audit log",
      "One-time import of existing spreadsheet data",
      "Training sessions and manuals",
      "6 months of warranty for bug fixes",
    ],
    group: "serious",
  },
];

export const packageGroups = {
  small: "For small businesses",
  serious: "For serious projects",
} as const;

export type CarePlan = {
  id: string;
  name: string;
  price: string;
  forWhom: string;
  text: string;
};

export const carePlans: CarePlan[] = [
  {
    id: "site-care",
    name: "Site Care",
    price: "₹1,000 per month",
    forWhom: "For websites",
    text: "Covers updates, backups, uptime checks, security fixes and 2 small content changes a month.",
  },
  {
    id: "store-care",
    name: "Store Care",
    price: "₹3,000 per month",
    forWhom: "For online stores",
    text: "Covers everything in Site Care plus order and payment issues and product updates.",
  },
  {
    id: "app-care",
    name: "App Care",
    price: "15% of the build price per year, minimum ₹5,000 per month",
    forWhom: "For Web App and Business Suite",
    text: "Covers bug fixes, security updates, backups and monitoring. New features are quoted separately.",
  },
];

export type Extra = { name: string; price: string };

export const extras: Extra[] = [
  { name: "Extra page (Launch and Business)", price: "₹2,500 per page" },
  { name: "Writing the text for a page", price: "₹1,500 per page" },
  { name: "Extra revision round", price: "₹2,500 per round" },
  {
    name: "Out-of-scope work",
    price: "₹1,200 per hour, with a minimum of 2 hours",
  },
  {
    name: "In-person session in Chennai",
    price: "From ₹2,500 per session",
  },
];

export const priceNote =
  "Starting prices. Domain registration, hosting, payment gateway fees, app registration and app setup are paid by the client; Apex Pixels can help set them up. The final quote is confirmed after a short call.";

export const marqueeWords = ["Websites", "Web apps", "Business software", "Social media content"];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How long does a project take?",
    answer:
      "A Launch site usually takes one to two weeks, a Business site two to three weeks and a Professional site four to six weeks, counted from when the content arrives. Web apps and business software take eight weeks or more and are scheduled after a paid discovery step.",
  },
  {
    question: "What is needed from me?",
    answer:
      "A logo, text and photos if you have them, one person who can approve work, and feedback sent as one list per round.",
  },
  {
    question: "What is included in the price?",
    answer:
      "Design, build, testing and launch of everything the chosen package lists, two or three rounds of revisions depending on the package, a handover guide and a recorded walkthrough.",
  },
  {
    question: "What is not included?",
    answer:
      "Domain registration, hosting, app registration and app setup are paid by the client, and Apex Pixels can help set them up. Extra pages, new features or content writing outside the agreed scope are quoted separately.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Free bug fixes follow the launch: one month for Launch, three months for Business, Professional and Web App, and six months for Business Suite. After that, an optional care plan starts at ₹1,000 a month for websites. Stores and apps have their own plans.",
  },
  {
    question: "Who owns the website?",
    answer:
      "The client owns it once the final payment is made. Domain and hosting accounts are registered in the client's name.",
  },
  {
    question: "Can meetings be held in person?",
    answer:
      "Meetings are online by default. In-person sessions in Chennai can be arranged and are quoted separately.",
  },
];

/** Recent work shown on the Home page. */
export const workItems = [
  {
    id: "excel-packaging",
    name: "Excel Packaging and Taste Foods",
    text: "A product catalogue and enquiry website for a Chennai packaging supplier.",
    href: "/work/excel-packaging",
    status: "live-case-study" as const,
    buttonLabel: "Read the case study",
    image: "/work/excel-packaging-1.jpg",
  },
  {
    id: "hospitality-critic",
    name: "Hospitality Critic Solutions",
    text: "A website for a Chennai hospitality training and consulting company.",
    href: "https://hospitalitycriticsolutions.com/",
    status: "coming-soon" as const,
    buttonLabel: "Visit the site",
    image: "/work/hospitality-critic.jpg",
  },
];

/* Real client testimonials only. Add one object per testimonial and the Home
   section shows them. With 4 or fewer they sit in a grid; with more than 4 the
   section becomes a horizontal carousel automatically. Until enough real ones
   exist, the grid is padded with "coming soon" cards. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Owner, Excel Packaging and Taste Foods"
};

export const testimonials: Testimonial[] = [];

export const buildTopics = [
  {
    id: "websites",
    title: "Websites",
    text: "Clear, fast websites that show a business properly: services, products, contact details and an enquiry form. From a simple three-page site to a full online store.",
    href: "/services#websites",
  },
  {
    id: "software",
    title: "Web apps and business software",
    text: "Custom web applications and day-to-day business software, for example order, customer and stock management, or systems that run several branches.",
    href: "/services#software",
  },
  {
    id: "content",
    title: "Social media and content",
    tag: "Also offered",
    text: "Social media content, product and service photography, and corporate video.",
    href: "/services#content",
  },
];

export const steps = [
  {
    number: "01",
    title: "Talk",
    text: "A free 15-minute call to understand what the business needs.",
  },
  {
    number: "02",
    title: "Agree",
    text: "A written scope, price and timeline, signed before work begins, with an advance to start.",
  },
  {
    number: "03",
    title: "Build",
    text: "Work happens in stages. The design, the build and the final site are each approved in writing. Two or three rounds of revisions are included, depending on the package.",
  },
  {
    number: "04",
    title: "Launch and support",
    text: "The site goes live with a handover guide and a recorded walkthrough, followed by a period of free bug fixes that depends on the package.",
  },
];

/* ---- Prompt 2: inner pages ---- */

export type ServiceSection = {
  id: string;
  anchor: string;
  title: string;
  description: string;
  goodFor?: string;
  items: string[];
  note?: string;
  size: "full" | "small";
};

export const serviceSections: ServiceSection[] = [
  {
    id: "websites",
    anchor: "websites",
    title: "Websites",
    description:
      "Websites that show a business clearly and make it easy to get in touch. Built to load fast, look right on every screen and be simple to update.",
    goodFor:
      "Shops, clinics, manufacturers, service providers and institutions that need a professional presence online.",
    items: [
      "Responsive design for phone, tablet and desktop",
      "Enquiry form and WhatsApp button",
      "Service or product pages",
      "Image galleries",
      "Google Maps",
      "Basic search engine setup",
      "Analytics setup, so you can see how the site is doing",
      "Online store with a cart and one payment gateway, in the Professional package (Option B)",
    ],
    size: "full",
  },
  {
    id: "software",
    anchor: "software",
    title: "Web apps and business software",
    description:
      "Custom web applications and business software built around how a business actually works, replacing spreadsheets, paper and scattered messages with one system.",
    goodFor:
      "Businesses that manage orders, customers, stock, bookings or several branches and want one place to do it.",
    items: [
      "User logins and roles",
      "Dashboards and reports",
      "Data import and export",
      "Admin panel",
      "Multi-branch management",
      "Notifications",
    ],
    size: "full",
  },
  {
    id: "content",
    anchor: "content",
    title: "Social media and content",
    description:
      "A smaller service for businesses that want their online presence to look consistent.",
    items: [
      "Social media content creation",
      "Product and service photography",
      "Corporate video content for internal company use",
    ],
    note: "Quoted per project.",
    size: "small",
  },
];

/** Plain-words explanation of the paid discovery step for Web App and Business Suite. */
export const discoveryNote = {
  amounts: "₹15,000 for Web App and ₹25,000 for Business Suite",
  text: "Both start with a paid discovery step, credited in full to the project. Discovery produces a written scope, screen designs and a fixed quote.",
  payment: "Payment is by milestone, with the last part due at go-live.",
};

export const excelLiveUrl = "http://excelpackagingandtastefoods.com/";

export const caseStudy = {
  slug: "excel-packaging",
  title: "Excel Packaging and Taste Foods",
  tags: ["Product catalogue", "Enquiry system", "Admin panel"],
  liveUrl: excelLiveUrl,
  client:
    "Excel Packaging and Taste Foods is a Chennai-based business-to-business supplier, operating since 2019. It supplies food-safe packaging, eco-friendly disposables, wraps and aluminium foils, and cleaning and sanitisation chemicals to restaurants, cloud kitchens and hotels.",
  brief:
    "The client needed a professional online catalogue that buyers can browse and enquire from, and a simple way for its own team to keep the catalogue up to date.",
  built: [
    {
      icon: "grid",
      text: "A product catalogue organised into nine categories, including an eco-friendly range, plastic containers, disposable cutlery, beverage packaging, napkins, hospitality amenities, custom branding and a cleaning chemicals range.",
    },
    {
      icon: "images",
      text: "Category filters, and a product image gallery with a full-screen viewer.",
    },
    {
      icon: "clipboard",
      text: "An enquiry list: buyers add products and send a single enquiry. The form collects company name, products, quantity and contact details, and records each enquiry in a Google Sheet.",
    },
    {
      icon: "lock",
      text: "A password-protected admin area where the client's team adds and edits products and categories without a developer.",
    },
    {
      icon: "sparkles",
      text: "The cleaning and hygiene range set up as its own section, so it can grow into a separate brand later.",
    },
    {
      icon: "smartphone",
      text: "A mobile-first layout.",
    },
  ],
  look: "A fresh green palette taken from the client's own brand, with sunflower yellow and orange as accents. Plain, factual language throughout, in line with the client's guidelines.",
  screenshots: [1, 2, 3, 4, 5, 6].map((n) => `/work/excel-packaging-${n}.jpg`),
  screenshotLabels: ["Home", "E-Catalog", "Cleaning and Hospitality", "About", "Contact and enquiry", "Admin dashboard"],
  nextProject: {
    name: "Hospitality Critic Solutions",
    url: "https://hospitalitycriticsolutions.com/",
    badge: "Case study coming soon",
  },
};

export const lionStory = [
  "Every business starts as small pieces: a product, a promise, a handful of good people. Apart, they are easy to overlook.",
  "The stripes in this mark are those pieces. Navy stands for the thinking behind the work: structure, code and care. Orange is the spark that gives it life. Follow the stripes inward and they gather into a face. A lion, calm and watchful.",
  "That is the idea behind Apex Pixels. A pixel is almost nothing on its own. Thousands of them, placed with attention, become something people recognise and trust.",
  "The triangle points to a single point, because good work comes down to focus: one clear idea, held steadily. The lion is not there to roar. It stands for a simple belief: strength is quiet, and presence is built one careful detail at a time.",
];

export const principles = [
  {
    icon: "scope",
    title: "Written scope",
    text: "Every project starts with a signed scope, price and timeline.",
  },
  {
    icon: "approval",
    title: "Approval at every stage",
    text: "Design, build and final site are approved in writing.",
  },
  {
    icon: "revisions",
    title: "A clear revision limit",
    text: "Two or three rounds of revisions are included, depending on the package, and extra changes are quoted before they begin.",
  },
  {
    icon: "communication",
    title: "Plain communication",
    text: "Updates in simple language, by WhatsApp or email.",
  },
  {
    icon: "pricing",
    title: "Honest pricing",
    text: "Starting prices are shown openly, with the costs paid by the client listed clearly.",
  },
];

export const founder = {
  name: site.founder,
  title: "Founder, Apex Pixels",
  photo: "/manish.jpg", // Optional; hidden until the file is uploaded.
  text: "I started Apex Pixels to build websites and software that businesses can be proud of and actually use. I work directly with every client, from the first call to the day the project goes live.",
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address,
)}`;

export const needOptions = [
  "Website",
  "Online store",
  "Web app or business software",
  "Social media and content",
  "Not sure yet",
];

export const timelineOptions = [
  "As soon as possible",
  "Within a month",
  "In two to three months",
  "Just exploring",
];

export const lastUpdated = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
}).format(new Date());
