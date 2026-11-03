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
  bookingUrl: "", // Placeholder — set when the booking link exists (prompt 4).
  siteUrl: "https://example.com", // Placeholder until the domain is bought.
  location: "Chennai, Tamil Nadu",
  footerLine: "© 2026 Apex Pixels. Chennai, Tamil Nadu.",
} as const;

/** Prefilled WhatsApp conversation link. */
export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi Apex Pixels, I would like to talk about a website for my business.",
)}`;

/** The booking action. Falls back to the contact page until bookingUrl exists. */
export const bookingHref = site.bookingUrl || "/contact?intent=call";

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
    discovery:
      "Starts with a paid discovery step of ₹15,000, credited in full to the project",
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
    discovery:
      "Starts with a paid discovery step of ₹25,000, credited in full to the project",
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

export const marqueeWords = [
  "Websites",
  "Web apps",
  "Business software",
  "Social media content",
];

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
    question: "Can we meet in person?",
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
  },
  {
    id: "hospitality-critic",
    name: "Hospitality Critic Solutions",
    text: "A website for a Chennai hospitality training and consulting company.",
    href: "https://hospitalitycriticsolutions.com/",
    status: "coming-soon" as const,
    buttonLabel: "Visit the site",
  },
];

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
