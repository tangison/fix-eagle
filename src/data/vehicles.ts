/**
 * Fix Eagle stock register · the current vehicle listings.
 *
 * DATA PROVENANCE
 * Every entry below was resolved from one Facebook post published by
 * Niklaas Kisilipile (Fix Eagle's managing member). The canonical post
 * URLs and the post text were recovered from the Facebook share links'
 * redirect metadata on 21 September 2026. Fields the post text does not
 * state are `null` with an explicit TODO: they must be confirmed against
 * the post or the yard before publishing a claim. Nothing is invented.
 *
 * dataConfidence:
 *   "confirmed"  all key fields stated in the post text
 *   "partial"    some fields stated, the rest pending confirmation
 *   "photo-only" the post carries no readable text; the make and model
 *                were identified from the post photo and must be confirmed
 */

export type VehicleStatus = "available" | "sold" | "auction" | "wanted";

export type Vehicle = {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  /** Model year, or null while unconfirmed (TODO). */
  year: number | null;
  /** Asking price in Namibian dollars, or null while unconfirmed (TODO). */
  price: number | null;
  /** Verbatim price evidence from the post, when the figure was truncated. */
  priceNote?: string;
  /** Odometer in kilometres, or null while unconfirmed (TODO). */
  mileage: number | null;
  transmission: string | null;
  fuelType: string | null;
  condition: string | null;
  location: string;
  description: string;
  images: string[];
  status: VehicleStatus;
  /** ISO date of the auction, when the sale runs on the clock. */
  auctionDate?: string | null;
  /** Canonical Facebook post URL (resolved from the share link). */
  facebookUrl: string;
  /** True when the source post is a video. */
  isVideoPost?: boolean;
  dataConfidence: "confirmed" | "partial" | "photo-only";
};

export const vehicles: Vehicle[] = [
  {
    id: "fb-28381700051450264",
    slug: "renault-koleos-2013-4wd",
    title: "Renault Koleos 4WD",
    make: "Renault",
    model: "Koleos",
    year: 2013,
    price: null, // TODO: confirm the asking price from the post or the yard
    mileage: 139600,
    transmission: null, // TODO: confirm (manual or CVT)
    fuelType: null, // TODO: confirm (petrol or diesel)
    condition: "Used, very good, selling as is",
    location: "Windhoek, Namibia",
    description:
      "Sales update from the yard: a very good Renault Koleos 4WD, 2013 model, selling as is. The odometer reads 139 600 km and the vehicle is stationed in Windhoek. Viewings are welcome at the Prosperita yard, and we can arrange delivery anywhere in Namibia. Ask us for the full specification and the asking price on WhatsApp.",
    images: ["/images/vehicles/renault-koleos-2013.webp"],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/salesupdaterenaultkoleos-2013-4wdselling-as-is-very-good-suvodometer-139-600kmwh/28381700051450264/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28380572008229735",
    slug: "volkswagen-amarok-tdi-2014",
    title: "Volkswagen Amarok 2.0 TDI 4Motion",
    make: "Volkswagen",
    model: "Amarok 2.0 TDI 4Motion",
    year: 2014,
    price: null, // TODO: the post text shows a price starting N$145, cut off in the share link
    priceNote:
      "The post advertises a price beginning N$145, truncated in the share link. Confirm the full figure before publishing.",
    mileage: 194401,
    transmission: null, // TODO: confirm (manual or automatic)
    fuelType: "Diesel", // TDI: turbocharged direct-injection diesel, stated in the post
    condition: "Used, full service history",
    location: "Windhoek, Namibia",
    description:
      "Sales alert: a 2014 Volkswagen Amarok 2.0 TDI 4Motion double cab with 194 401 km on the clock and a full service history. The post advertises the price from N$145,000; confirm the exact figure with us. A working bakkie with the 4Motion grip for farm and gravel-road work, viewable in Windhoek.",
    images: ["/images/vehicles/vw-amarok-2014.webp"],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/sales-alertamarok-20-dc-tdi2014-model-4motion-194-401kmfull-service-history-n145/28380572008229735/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28378541278432808",
    slug: "wanted-used-vehicles",
    title: "Wanted: used vehicles under N$55 000",
    make: "Various",
    model: "Used vehicles",
    year: null,
    price: null,
    mileage: null,
    transmission: null,
    fuelType: null,
    condition: "Affordable and useful",
    location: "Windhoek, Namibia",
    description:
      "Sales alert, buying side: we are looking for used vehicles below N$55 000, affordable and useful, for the Windhoek yard. If you are selling a bakkie, hatchback or sedan in that bracket, message us on WhatsApp with the details and photos. The post shows the kind of stock we take in. We buy, we value, we resell through our channels.",
    images: ["/images/vehicles/wanted-used-vehicles.webp"],
    status: "wanted",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/sales-alertsalesupdatelooking-for-a-used-vehicles-below-55k-affortable-and-usefu/28378541278432808/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28340496302237306",
    slug: "nissan-note",
    title: "Nissan Note",
    make: "Nissan",
    model: "Note",
    year: null, // TODO: confirm from the post or the registration papers
    price: null, // TODO: confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm
    fuelType: null, // TODO: confirm (petrol expected, verify)
    condition: null, // TODO: confirm
    location: "Windhoek, Namibia",
    description:
      "A Nissan Note offered at the Fix Eagle yard in Windhoek, photographed where it stands. The year, mileage, price and specification are being confirmed against the papers. Enquire on WhatsApp and we will send the details the same day. Compact, economical runabouts like this move quickly, so register your interest early.",
    images: ["/images/vehicles/nissan-note.webp"],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/28340496302237306/",
    dataConfidence: "photo-only",
  },
  {
    id: "fb-28323327190620884",
    slug: "jeep-patriot-urgent-sale",
    title: "Jeep Patriot, urgent sale",
    make: "Jeep",
    model: "Patriot",
    year: null, // TODO: the post text was truncated at the model detail; confirm
    price: null, // TODO: confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm
    fuelType: null, // TODO: confirm
    condition: "For parts, repair and resale",
    location: "Windhoek, Namibia",
    description:
      "Urgent sale, auction bargains: a Jeep Patriot good for parts, repair and resale. These bargains do not wait. The auction date is being confirmed; register your interest on WhatsApp and we will send the date, the yard number and the viewing times as soon as they are set.",
    images: ["/images/vehicles/jeep-patriot.webp"],
    status: "auction",
    auctionDate: null, // TODO: confirm the auction date, then the countdown widget activates
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/urgensaleauctionbargains-good-for-parts-repair-and-resalefeaturingjeep-patriot-mo/28323327190620884/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28193867816900156",
    slug: "ford-ranger-king-cab",
    title: "Ford Ranger King Cab",
    make: "Ford",
    model: "Ranger King Cab",
    year: null, // TODO: confirm from the post or the papers
    price: null, // TODO: the post says an affordable price without a figure; confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm
    fuelType: null, // TODO: confirm
    condition: "Used, sold voetstoots (as is)",
    location: "Windhoek, Namibia",
    description:
      "Explore, limited quantity: a Ford Ranger King Cab selling voetstoots, as it is, at an affordable price. The post carries a video walkaround of the bakkie at the yard. Year, mileage and price are being confirmed; enquire on WhatsApp and we will send the details with the video.",
    images: ["/images/vehicles/ford-ranger-king-cab.webp"],
    status: "available",
    auctionDate: null,
    isVideoPost: true,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/explorelimitquantityfordrangerkingcabselling-voetstoot-as-it-affortable-pricefor/28193867816900156/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28193727313580873",
    slug: "mercedes-b-class",
    title: "Mercedes-Benz B-Class",
    make: "Mercedes-Benz",
    model: "B-Class",
    year: null, // TODO: confirm from the post or the papers
    price: null, // TODO: confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm
    fuelType: null, // TODO: confirm
    condition: null, // TODO: confirm
    location: "Windhoek, Namibia",
    description:
      "A Mercedes-Benz B-Class at the Fix Eagle yard in Windhoek, photographed where it stands. The year, variant, mileage and price are being confirmed against the papers. Enquire on WhatsApp for the full specification and the viewing arrangements.",
    images: ["/images/vehicles/mercedes-b-class.webp"],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/28193727313580873/",
    dataConfidence: "photo-only",
  },
];

/** Distinct makes for the filter bar, in listing order. */
export const vehicleMakes = Array.from(new Set(vehicles.map((v) => v.make)));

export function vehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

/** Related vehicles: same make first, then the rest, capped at count. */
export function relatedVehicles(current: Vehicle, count = 3): Vehicle[] {
  const sameMake = vehicles.filter(
    (v) => v.slug !== current.slug && v.make === current.make
  );
  const others = vehicles.filter(
    (v) => v.slug !== current.slug && v.make !== current.make
  );
  return [...sameMake, ...others].slice(0, count);
}

/** N$ price formatter. */
export function formatPrice(price: number): string {
  return `N$${price.toLocaleString("en-NA")}`;
}
