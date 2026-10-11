export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${BASE}${p}`;

// TODO: vervang door het echte e-mailadres van Tibe.
export const CONTACT_EMAIL = "hello@example.com";

export type Product = {
  id: string;
  name: string;
  type: string;
  price: string;
  img: string | null; // null = placeholder-kaart
};

export const products: Product[] = [
  { id: "01", name: "Cross Hoodie", type: "Heavyweight hoodie — 500 gsm", price: "€ 240", img: "/img/products/p01.jpg" },
  { id: "02", name: "Dagger Biker", type: "Leren jas — zilveren hardware", price: "€ 890", img: "/img/products/p02.jpg" },
  { id: "03", name: "Horseshoe Tee", type: "Oversized tee — garment dyed", price: "€ 110", img: "/img/products/p03.jpg" },
  { id: "04", name: "Cemetery Denim", type: "Baggy denim — leren kruispatches", price: "€ 320", img: "/img/products/p04.jpg" },
  { id: "05", name: "Hyperfocus Pendant", type: "925 zilver — kruishanger", price: "€ 410", img: "/img/products/p05.jpg" },
  { id: "06", name: "Chaos Rings", type: "Set van drie — 925 zilver", price: "€ 360", img: "/img/products/p06.jpg" },
  { id: "07", name: "Static Cap", type: "Trucker cap — zilveren kruis", price: "€ 95", img: "/img/products/p07.jpg" },
  { id: "08", name: "Overdrive Zip", type: "Washed zip-hoodie — dolkprint", price: "€ 260", img: "/img/products/p08.jpg" },
  { id: "09", name: "Blackletter Belt", type: "Leren riem — gegraveerde gesp", price: "€ 280", img: "/img/products/p09.jpg" },
  { id: "10", name: "Bleed Longsleeve", type: "Longsleeve — rode mouwprint", price: "€ 130", img: "/img/products/p10.jpg" },
];

export const slogans = [
  "ADHD-FUELED URBAN DESIGN",
  "CHAOS IS EEN METHODE",
  "HYPERFOCUS / HANDMADE",
  "NIET STIL TE KRIJGEN",
  "ZILVER. ZWART. ZWEET.",
  "GEMAAKT IN VLAANDEREN",
];
