/**
 * Fix Eagle stock register · the current vehicle listings.
 *
 * DATA PROVENANCE
 * Every entry below was resolved from a public Facebook post by Niklaas
 * Kisilipile (Fix Eagle's managing member) or the Fix Eagle page
 * (facebook.com/fixeagle). Canonical post URLs, full post text and the
 * photos were harvested on 21 September 2026 with Scrapling (Camoufox
 * stealth fetcher) plus a headless browser pass over the public posts.
 * Fields the post text does not state are `null` with an explicit TODO:
 * they must be confirmed against the post or the yard before publishing
 * a claim. Nothing is invented.
 *
 * dataConfidence:
 *   "confirmed"  all key fields stated in the post text
 *   "partial"    some fields stated, the rest pending confirmation
 *   "photo-only" the post carries no readable text; the make and model
 *                were identified from the post photo and must be confirmed
 *
 * STILL TO CONFIRM (client TODOs)
 * - Jeep Patriot, Ford Ranger, Aveo, Ipsum and Golf asking prices: the
 *   posts invite bidding without figures.
 * - Toyota Ipsum and VW Golf FSI year variants, mileage and gearbox
 *   details beyond what the post states.
 * - The Golf FSI 2006 post carries no photo; the card shows the branded
 *   placeholder until the client supplies one.
 * - A 17 April profile post ("Reliable workhorse, good service and
 *   maintenance history", photo shows a white double cab bakkie of an
 *   unidentified make) is not listed here yet: send the make and model
 *   and it will be added.
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
  /** Asking or reserve price in Namibian dollars, or null while open to bidding (TODO). */
  price: number | null;
  /** Verbatim price evidence from the post, when the figure needs context. */
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
    price: 53000,
    priceNote:
      "The post states a reserve price of N$53k, negotiable. Bidding and offers are invited.",
    mileage: 139600,
    transmission: "Manual",
    fuelType: null, // TODO: confirm (petrol or diesel)
    condition:
      "Used, very good, accident free, all wheel drive on and off road. Needs repairs of the electronic handbrake and the release bearing.",
    location: "Windhoek, Namibia",
    description:
      "Sales update from the yard: a very good Renault Koleos 4WD, 2013 model, in white with a manual transmission, selling as is. The odometer reads 139 600 km, the body is accident free and the all wheel drive system has done duty on and off road. The known work list is honest: the electronic handbrake and the release bearing need attention, and the price reflects it. The post carries a reserve of N$53 000, negotiable, so viewing and bidding are open. Viewings are welcome at the Prosperita yard, and we can arrange delivery anywhere in Namibia.",
    images: [
      "/images/vehicles/renault-koleos-2013.webp",
      "/images/vehicles/renault-koleos-2013-2.webp",
      "/images/vehicles/renault-koleos-2013-3.webp",
      "/images/vehicles/renault-koleos-2013-4.webp",
      "/images/vehicles/renault-koleos-2013-5.webp",
      "/images/vehicles/renault-koleos-2013-6.webp",
      "/images/vehicles/renault-koleos-2013-7.webp",
    ],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/salesupdaterenaultkoleos-2013-4wdselling-as-is-very-good-suvodometer-139-600kmwh/28381700051450264/",
    dataConfidence: "confirmed",
  },
  {
    id: "fb-28380572008229735",
    slug: "volkswagen-amarok-tdi-2014",
    title: "Volkswagen Amarok 2.0 TDI 4Motion",
    make: "Volkswagen",
    model: "Amarok 2.0 TDI 4Motion",
    year: 2014,
    price: 145000,
    priceNote:
      "The post states N$145K, negotiable. It also discloses a faulty actuator on the turbocharger, sold voetstoots.",
    mileage: 194401,
    transmission: null, // TODO: confirm (manual or automatic)
    fuelType: "Diesel", // TDI: turbocharged direct-injection diesel, stated in the post
    condition:
      "Used, full service history, sold voetstoots (as is). The actuator on the turbocharger is faulty and the price allows for it.",
    location: "Windhoek, Namibia",
    description:
      "Sales alert: a 2014 Volkswagen Amarok 2.0 TDI 4Motion double cab with 194 401 km on the clock and a full service history, asking N$145 000 negotiable. A genuine beast of a bakkie, a workhorse of great potential with comfort and strength in one shell. The disclosure is on the table: the actuator on the turbocharger is faulty, and the bakkie sells voetstoots, as is, at a price that allows for the repair. Call us for viewing, testing and bidding at the Prosperita yard.",
    images: [
      "/images/vehicles/vw-amarok-2014.webp",
      "/images/vehicles/vw-amarok-2014-2.webp",
      "/images/vehicles/vw-amarok-2014-3.webp",
      "/images/vehicles/vw-amarok-2014-4.webp",
      "/images/vehicles/vw-amarok-2014-5.webp",
    ],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/sales-alertamarok-20-dc-tdi2014-model-4motion-194-401kmfull-service-history-n145/28380572008229735/",
    dataConfidence: "confirmed",
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
      "Buying side: we are looking for used vehicles below N$55 000, affordable and useful, for the Windhoek yard. The same post carries the current bargain stock, among it a Chevrolet Aveo LS 2015 and the Koleos listed here, so the yard always has something in that bracket to see. If you are selling a bakkie, hatchback or sedan in that range, message us on WhatsApp with the details and photos. We buy, we value, we resell through our channels.",
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
    year: 2013,
    price: 65000,
    priceNote:
      "Advertised at N$65 000 on the August post. The September clearance post sets a reserve of N$73k, negotiable, so confirm the standing figure before you offer.",
    mileage: 71465,
    transmission: null, // TODO: confirm (manual or CVT)
    fuelType: null, // TODO: confirm (petrol expected, verify)
    condition:
      "Used, good as new inside, very neat interior, no mechanical issues, fuel efficient, comfortable and soft driving.",
    location: "Windhoek, Namibia",
    description:
      "A sky blue Nissan Note 2013 with 71 465 km on the clock, in the yard in Windhoek. Good as new and it smells as new, with a very neat interior and no mechanical issues. Light, economical and easy to drive, the post recommends it for local town travel, school runs, Yango business and anything in between. The August listing carried N$65 000 and the September clearance post set a reserve of N$73 000 negotiable, so the standing figure is one WhatsApp message away. Reserve price, open bidding available: view and bid at the Prosperita yard.",
    images: [
      "/images/vehicles/nissan-note.webp",
      "/images/vehicles/nissan-note-2.webp",
      "/images/vehicles/nissan-note-3.webp",
      "/images/vehicles/nissan-note-4.webp",
      "/images/vehicles/nissan-note-5.webp",
      "/images/vehicles/nissan-note-6.webp",
    ],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/28340496302237306/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28323327190620884",
    slug: "jeep-patriot-urgent-sale",
    title: "Jeep Patriot 2.4, urgent sale",
    make: "Jeep",
    model: "Patriot 2.4 Dual VVT",
    year: 2011,
    price: null, // TODO: the post invites bidding without a figure; confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm (manual or automatic)
    fuelType: null, // TODO: confirm (petrol expected for the 2.4, verify)
    condition:
      "Accident free, solid body, engine and gearbox complete. Good for parts, repair and resale.",
    location: "Windhoek, Namibia",
    description:
      "Urgent sale, auction bargains: a Jeep Patriot 2011 with the 2.4 litre Dual VVT engine, accident free with a solid body, engine and gearbox complete. Good for parts, repair and resale, and these bargains do not wait. The same post offers a Toyota Ipsum 2006 seven seater and a Golf FSI 2006, both listed separately here. View us onsite at REM ERF 46 Platinum Street, Prosperita, or call 081 864 6808 for viewing and bidding.",
    images: [
      "/images/vehicles/jeep-patriot.webp",
      "/images/vehicles/jeep-patriot-2.webp",
      "/images/vehicles/jeep-patriot-3.webp",
      "/images/vehicles/jeep-patriot-4.webp",
    ],
    status: "auction",
    auctionDate: null, // TODO: confirm the auction date, then the countdown widget activates
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/urgensaleauctionbargains-good-for-parts-repair-and-resalefeaturingjeep-patriot-mo/28323327190620884/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28323327190620884-ipsum",
    slug: "toyota-ipsum-2006",
    title: "Toyota Ipsum 7 seater",
    make: "Toyota",
    model: "Ipsum",
    year: 2006,
    price: null, // TODO: the post invites bidding without a figure; confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm
    fuelType: null, // TODO: confirm (petrol expected, verify)
    condition:
      "Engine complete, runner. Gearbox has defects and needs repairs.",
    location: "Windhoek, Namibia",
    description:
      "A Toyota Ipsum 2006 seven seater from the urgent sale post at the Prosperita yard. The engine is complete and the car runs; the gearbox has defects and needs repairs, and the price will reflect that honestly. A roomy family and staff mover once the box is sorted, and a clean donor for parts if that suits your plans better. View and bid onsite at REM ERF 46 Platinum Street or call 081 864 6808.",
    images: [
      "/images/vehicles/toyota-ipsum-2006.webp",
      "/images/vehicles/toyota-ipsum-2006-2.webp",
    ],
    status: "auction",
    auctionDate: null, // TODO: confirm the auction date
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/urgensaleauctionbargains-good-for-parts-repair-and-resalefeaturingjeep-patriot-mo/28323327190620884/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28323327190620884-golf",
    slug: "volkswagen-golf-fsi-2006",
    title: "VW Golf FSI",
    make: "Volkswagen",
    model: "Golf FSI",
    year: 2006,
    price: null, // TODO: the post invites bidding without a figure; confirm
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm
    fuelType: "Petrol", // FSI: fuel stratified injection petrol engine
    condition:
      "Engine and gearbox complete, runner. Needs tender loving care.",
    location: "Windhoek, Namibia",
    description:
      "A Golf FSI 2006 from the urgent sale post: engine and gearbox complete, a runner, needing tender loving care. The source post carries no photo of this one yet, so the card shows our placeholder; message us on WhatsApp and we will send the latest pictures from the yard. Solid FSI motoring for someone happy to cosset it back to shape. View and bid onsite at REM ERF 46 Platinum Street, Prosperita.",
    images: ["/images/vehicles/stock-photo-pending.webp"],
    status: "auction",
    auctionDate: null, // TODO: confirm the auction date
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/urgensaleauctionbargains-good-for-parts-repair-and-resalefeaturingjeep-patriot-mo/28323327190620884/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28193867816900156",
    slug: "ford-ranger-king-cab",
    title: "Ford Ranger 3.2 King Cab 4x4",
    make: "Ford",
    model: "Ranger 3.2 King Cab 4x4",
    year: null, // TODO: confirm from the post or the papers
    price: null, // TODO: the post says an affordable price without a figure; confirm
    mileage: 176000,
    transmission: "6-speed",
    fuelType: null, // TODO: confirm (the 3.2 in this range is usually diesel, verify)
    condition:
      "Used, runner, good engine, 4x4. Requires minor repairs to the gear five and six synchromizer. Sold voetstoots (as is).",
    location: "Windhoek, Namibia",
    description:
      "Explore, limited quantity: a Ford Ranger 3.2 King Cab 4x4 with the six speed gearbox, a good engine and 176 000 km on the clock, photographed in white with the canvas game frame at the yard. Status: runner. The known work is minor, the gear five and six synchromizer needs attention, and it sells voetstoots at an affordable price. The post carries a video walkaround; enquire on WhatsApp and we will send it with the full details.",
    images: [
      "/images/vehicles/ford-ranger-king-cab.webp",
      "/images/vehicles/ford-ranger-king-cab-2.webp",
      "/images/vehicles/ford-ranger-king-cab-3.webp",
      "/images/vehicles/ford-ranger-king-cab-4.webp",
      "/images/vehicles/ford-ranger-king-cab-5.webp",
      "/images/vehicles/ford-ranger-king-cab-6.webp",
    ],
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
    title: "Mercedes-Benz B180",
    make: "Mercedes-Benz",
    model: "B180",
    year: 2013,
    price: 67500,
    priceNote:
      "The post advertises N$67 500. The gearbox needs repair or replacement, which the price allows for.",
    mileage: null, // TODO: confirm
    transmission: null, // TODO: confirm (the B180 usually runs a CVT, verify)
    fuelType: null, // TODO: confirm (petrol expected, verify)
    condition:
      "Well maintained, very neat interior and exterior, accident free. Gearbox needs repair or replacement to get back on the road.",
    location: "Windhoek, Namibia",
    description:
      "August sales alert: a Mercedes-Benz B180 2013, well maintained with a very neat interior and exterior, accident free. The gearbox needs repair or replacement, and the N$67 500 asking price allows for that work, an opportunity for someone to get back on the road with class and comfort. Opportunity only favours the prepared mind: view and bid at the Prosperita yard, REM ERF 46 Platinum Street, or call 081 864 6808.",
    images: [
      "/images/vehicles/mercedes-b-class.webp",
      "/images/vehicles/mercedes-b-class-2.webp",
      "/images/vehicles/mercedes-b-class-3.webp",
      "/images/vehicles/mercedes-b-class-4.webp",
      "/images/vehicles/mercedes-b-class-5.webp",
    ],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/28193727313580873/",
    dataConfidence: "partial",
  },
  {
    id: "fb-28378541278432808-aveo",
    slug: "chevrolet-aveo-ls-2015",
    title: "Chevrolet Aveo LS",
    make: "Chevrolet",
    model: "Aveo LS",
    year: 2015,
    price: null, // TODO: the post calls it a bargain buy without a figure; confirm
    mileage: 205000,
    transmission: null, // TODO: confirm
    fuelType: null, // TODO: confirm (petrol expected, verify)
    condition:
      "Accident free, runner. Needs repainting and restoration.",
    location: "Windhoek, Namibia",
    description:
      "Bargain buy from the sales alert post: a Chevrolet Aveo LS 2015, accident free, with 205 000 km on the clock and a running engine. It needs repainting and restoration, and that is exactly where the bargain sits for a handy owner. A light, cheap to run sedan once the paint is done. Photos are from the yard where it stands today. View and bid at REM ERF 46 Platinum Street, Prosperita, or call 081 864 6808.",
    images: [
      "/images/vehicles/chevrolet-aveo-2015.webp",
      "/images/vehicles/chevrolet-aveo-2015-2.webp",
      "/images/vehicles/chevrolet-aveo-2015-3.webp",
    ],
    status: "available",
    auctionDate: null,
    facebookUrl:
      "https://www.facebook.com/niklaas.n.kisilipile/posts/sales-alertsalesupdatelooking-for-a-used-vehicles-below-55k-affortable-and-usefu/28378541278432808/",
    dataConfidence: "partial",
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
