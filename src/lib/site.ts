/**
 * Fix Eagle Investments Auctioneers · content source of truth.
 * Every fact below is drawn from the company profile (2026) supplied by the
 * client. Nothing here is invented: names, numbers, dates and scopes match
 * the approved source document.
 */

export const site = {
  legalName: "Fix Eagle Investments CC",
  tradingName: "Fix Eagle Investments Auctioneers",
  shortName: "Fix Eagle",
  tagline: "We add value to your assets.",
  closingLine: "With us you can go so much further.",
  description:
    "Exclusively Namibian owned auction house in Windhoek. Live auctions, sworn asset valuation and private sales across all fourteen regions of Namibia.",
  founded: "2013",
  city: "Windhoek",
  country: "Namibia",
  address: "Rem Erf 46, Platinum Street, Prosperita, Windhoek, Namibia",
  email: "NiklaasK@fixeagleinvestments.com",
  phoneDisplay: "+264 81 864 6808",
  phoneHref: "+264818646808",
  whatsapp: "https://wa.me/264818646808",
  whatsappText:
    "Hello Fix Eagle, I would like to enquire about your services.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Platinum+Street+Prosperita+Windhoek+Namibia",
  /**
   * Production domain. The company email domain indicates this is the owned
   * domain; update this single constant if the live domain differs.
   */
  url: "https://fixeagleinvestments.com",
  principal: {
    name: "Niklaas Kisilipile",
    role: "Managing Member",
    bio: "Former corporate banker with seventeen years across Standard Bank, Nedbank, First National Bank and SME Bank. Qualified auctioneer, graduate of the South African College of Auctioneering (2017). Sworn appraiser, admitted to the Magistrate Court of Namibia (2018).",
  },
} as const;

export const stats = [
  { value: "2013", label: "Established in Windhoek" },
  { value: "100+", label: "Auction sales completed" },
  { value: "300+", label: "Private sales facilitated" },
  { value: "97%", label: "Sales achievement" },
  { value: "14", label: "Regions of Namibia covered" },
] as const;

export const services = [
  {
    id: "live-auction",
    name: "Live auction",
    summary:
      "Every type of auction, planned, coordinated and executed on site, in all fourteen regions and beyond.",
    detail:
      "We plan, coordinate and execute all types of auction, remotely across all fourteen regions of Namibia, and anywhere in Africa or the world. Onsite bidding is run for maximum sales and full attendance of prospective bidders.",
  },
  {
    id: "asset-valuation",
    name: "Asset valuation",
    summary:
      "Court-appointed sworn appraisers for every category of moveable asset.",
    detail:
      "Sworn appraisers appointed by the Magistrate Court of Namibia, certified to provide professional valuation services to private clients, government institutions and ministries, and all the courts of Namibia.",
  },
  {
    id: "private-sales",
    name: "Private sales",
    summary:
      "More than three hundred sales facilitated across Namibia since 2013.",
    detail:
      "We have facilitated and coordinated over three hundred sales across Namibia, and partnered on foreign projects in South Africa with our joint venture partners in 2016 and 2017.",
  },
  {
    id: "online-auctioneering",
    name: "Online auctioneering",
    summary:
      "Web-based auction sales for assets that need a wider field of buyers.",
    detail:
      "A web-based online auction sale, offered where specialised equipment requires a wider range of prospective clientele than a live hall allows.",
  },
  {
    id: "scrap-dealing",
    name: "Registered scrap dealers",
    summary:
      "Certified by the office of the Inspector General to trade second-hand goods.",
    detail:
      "Registered, certified and listed with the office of the Inspector General of the Namibian police, holding the certificate to sell second-hand goods: all categories of loose items, scrap steel, vehicles and earthmoving equipment.",
  },
  {
    id: "project-management",
    name: "Project management",
    summary:
      "The full value chain of an auction, managed end to end.",
    detail:
      "A proven track record in managing and executing auctions of any type and size across different categories, excluding livestock auctions, which we have never conducted. Planning, setting of dates, marketing, execution, collection of proceeds, pay-over and site clearance.",
  },
  {
    id: "sales-advisory",
    name: "Sales advisory",
    summary:
      "Advice on how to dispose of surplus and redundant assets, and buyers sourced.",
    detail:
      "We advise on the best possible valuation and disposal method for surplus and redundant assets, including scrap and specialised equipment, and source potential clients on your behalf.",
  },
] as const;

export const saleChannels = [
  {
    name: "Live auctions",
    body: "Onsite auctions, planned, coordinated and executed to ensure maximum sales and attendance of prospective bidders, with live onsite bidding.",
  },
  {
    name: "Online auctions",
    body: "A web-based online auction sale, used to dispose of specialised equipment that requires a wider range of prospective clientele.",
  },
  {
    name: "Private treaty",
    body: "The preferred sales method for specialised assets, focusing on a selected group of prospective buyers. We negotiate with buyers on your behalf, to a predetermined end date.",
  },
] as const;

export const processSteps = [
  {
    name: "Sales advisory",
    body: "We advise on the possible valuation and disposal method, and tailor a sales plan to the asset.",
  },
  {
    name: "Asset identification",
    body: "Onsite assessment and appraisal, producing a detailed inventory list with the best possible values.",
  },
  {
    name: "Auction catalogue",
    body: "A detailed catalogue with pictures and descriptions of every asset for disposal.",
  },
  {
    name: "Marketing campaign",
    body: "A detailed marketing and advertising sales plan, aimed at disposing of assets at the best possible market price, with a targeted approach to attract suitable buyers.",
  },
  {
    name: "Project management",
    body: "Management of the value chain and process flow: planning, setting of dates, marketing and advertising, execution, auction day, collection of sales proceeds, pay-over and site clearance.",
  },
  {
    name: "Client fulfilment",
    body: "We remain accountable and responsible throughout, generating data and records through FlexiAuction, the auctioneering software used by auction houses: reports of sales, clients, turnover, proceeds and payments collected.",
  },
] as const;

export type Reference = {
  entity: string;
  scope: string;
  period: string;
  performance: string;
  referee?: string;
};

export const references: Reference[] = [
  {
    entity: "Hollard Insurance Namibia",
    scope: "Storage and auctioning of vehicles",
    period: "2020 to 2024, three years with a 24-month extension",
    performance: "All vehicles executed and sold over the period of the contract",
    referee: "J. Vermaak, Sales and Administration Manager",
  },
  {
    entity: "Namibia Water Corporation (NamWater)",
    scope:
      "Appraisal and auctioning of all moveable assets: scrap metal, furniture, over 500 vehicles, earthmoving and specialised equipment",
    period: "2018 to 2021 and 2022 to 2025, three-year contract awarded twice",
    performance: "Sales targets exceeded on all auctions conducted",
    referee: "N. Mufika, Assets Department",
  },
  {
    entity: "Road Contractors Company (RCC)",
    scope:
      "Appraisal and auctioning of moveable assets including earthmoving equipment, industrial trucks, engines, loose items and scrap metal",
    period: "2016 to 2019, three-year contract",
    performance: "Sales targets exceeded on all auctions conducted",
  },
  {
    entity: "French Embassy in Namibia",
    scope: "Appraisal and auctioning of vehicles, office and household furniture",
    period: "June 2020, one-year contract",
    performance: "Sales targets exceeded on all auctions conducted",
    referee: "T. Wastable, General Manager",
  },
  {
    entity: "Whale Cheetah Cement",
    scope:
      "Appraisal and auctioning of furniture, industrial building equipment and earthmoving equipment, northern Namibia",
    period: "2022, one-year contract",
    performance: "Sales targets exceeded on all auctions conducted",
    referee: "N. Balzar, General Manager",
  },
  {
    entity: "Namibia Power Corporation (NamPower)",
    scope:
      "Auctioning of moveable assets: loose goods, household furniture, building material, all categories of vehicles, earthmoving equipment and scrap steel",
    period: "2021 to 2024, with a one-year extension to August 2025",
    performance: "More than twenty public live auctions, sold out, targets exceeded",
    referee: "R. Witbooi, Auction Committee Chairman",
  },
  {
    entity: "Namibia Wildlife Resorts (NWR)",
    scope:
      "Appraisal and auctioning of loose items, vehicles, industrial, household and building material",
    period: "2023 to 2026, three-year contract",
    performance: "Sales targets exceeded on all auctions conducted",
    referee: "A. Kauapirura, Chief Operating Officer",
  },
  {
    entity: "Development Bank of Namibia (DBN)",
    scope:
      "Appraisal and valuation of moveable assets countrywide, including industrial and earthmoving equipment and industrial trucks",
    period: "Ad hoc from 2022, three-year contract from 2024",
    performance: "Successfully delivered on all assessments",
    referee: "R. Bezuidenhout, Head of DBN Collections",
  },
  {
    entity: "Law firms of Namibia",
    scope:
      "Appraisal and valuation of all categories of moveable assets, submission of confirmatory affidavits and statements to the High Court of Namibia",
    period: "2022 to 2025",
    performance: "Appraisals executed and reports submitted to all courts in Namibia",
    referee:
      "Shikongo Law Chambers, Kangueehi & Kavendjii, Anne Shilengudwa Inc.",
  },
  {
    entity: "Private sales and private clients",
    scope:
      "Short-term contracts to appraise and sell moveable assets: farming tractors, loose goods, household and building materials",
    period: "2018 to 2025, ad hoc",
    performance: "All goods sold, an 85 percent success rate",
  },
] as const;

export const faqs = [
  {
    q: "How do I sell assets through Fix Eagle?",
    a: "It starts with a conversation. We advise on the best valuation and disposal method, assess the assets on site, and produce a written inventory and sales plan before anything is committed. From there we build the catalogue, run the marketing campaign, execute the sale and manage the pay-over and site clearance.",
  },
  {
    q: "What does a sworn appraisal mean?",
    a: "A sworn appraiser is admitted to the Magistrate Court of Namibia to appraise all categories of moveable assets. Valuations we produce are accepted by the courts, banks, insurers and government institutions that rely on them.",
  },
  {
    q: "Which regions do you cover?",
    a: "All fourteen regions of Namibia, and we have executed auctions and projects anywhere in Africa and the world. If an auction falls outside Windhoek, we train and remunerate local casuals to be part of the auction team.",
  },
  {
    q: "What asset categories do you handle?",
    a: "Vehicles, salvage accident vehicles, earthmoving and industrial specialised equipment, household and office furniture, loose goods, and all categories of scrap steel. We do not conduct livestock auctions.",
  },
  {
    q: "Live, online or private treaty: which is right for my assets?",
    a: "Live auctions suit volume disposals where a crowd drives price. Online auctions suit specialised equipment that needs a wider field of buyers. Private treaty suits specialised assets sold to a selected group of buyers, negotiated on your behalf to a predetermined end date. We advise on the right channel before the sale is planned.",
  },
  {
    q: "Are you certified to sell scrap and second-hand goods?",
    a: "Yes. Fix Eagle is registered, certified and listed with the office of the Inspector General of the Namibian police, holding the certificate to sell second-hand goods, including scrap steel, loose items, vehicles and earthmoving equipment.",
  },
  {
    q: "Who do you work for?",
    a: "Government institutions and ministries, state-owned enterprises, banks, insurers, embassies, law firms and private individuals. Our trade references include NamWater, NamPower, RCC, the French Embassy, Hollard, DBN, NWR and others.",
  },
  {
    q: "What happens after the auction?",
    a: "We manage the close: collection of sales proceeds, pay-over, and site clearance. Every asset and process is documented through FlexiAuction, generating records of sales, clients, turnover and payments collected.",
  },
  {
    q: "How do I request a valuation?",
    a: "Message us on WhatsApp, call, or send an email. We will agree on an onsite assessment and produce a detailed inventory with the best possible values.",
  },
] as const;

export const assetTypes = [
  "Vehicles",
  "Earthmoving equipment",
  "Industrial equipment",
  "Office furniture",
  "Household furniture",
  "Scrap steel",
  "Loose goods",
  "Other",
] as const;

export const regions = [
  "Erongo",
  "Hardap",
  "//Karas",
  "Kavango East",
  "Kavango West",
  "Khomas",
  "Kunene",
  "Ohangwena",
  "Omaheke",
  "Omusati",
  "Oshana",
  "Oshikoto",
  "Otjozondjupa",
  "Zambezi",
  "Elsewhere in Africa",
] as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
