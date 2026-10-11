export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${BASE}${p}`;

// TODO: vervang door het echte e-mailadres van Tibe.
export const CONTACT_EMAIL = "hello@example.com";

export type SpecRow = [label: string, value: string];

export type Product = {
  id: string;
  slug: string;
  name: string;
  type: string;
  price: number;
  sizes: string[];
  img: string; // basispad zonder breedte/extensie, bv. /img/products/p01
  models: string[]; // basispaden van modelshots (worden enkel getoond als ze bestaan)
  blurb: string;
  spec: SpecRow[];
  care: string[];
};

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const WAIST = ["28", "30", "32", "34", "36"];
const m = (slug: string, n = 3) => Array.from({ length: n }, (_, i) => `/img/models/${slug}-${i + 1}`);

export const products: Product[] = [
  {
    id: "01", slug: "cross-hoodie", name: "Cross Hoodie", type: "Acid-washed hoodie — rugprint", price: 240, sizes: APPAREL,
    img: "/img/products/p01", models: m("cross-hoodie"),
    blurb: "Gecropte, boxy hoodie in zware French terry. Elk stuk wordt apart gewassen tot het grijs breekt. Op de rug: het kruis en de naam, in zilver gezeefdrukt en bewust gebarsten.",
    spec: [["Samenstelling", "100% katoen, French terry, ongeborsteld"], ["Gewicht", "520 g/m²"], ["Afwerking", "Acid wash per stuk — geen twee gelijk"], ["Print", "Zeefdruk zilver-wit, craquelé na wassing"], ["Pasvorm", "Boxy, gecropt, verlaagde schouder"], ["Herkomst", "Gebreid in Portugal, afgewerkt in Antwerpen"]],
    care: ["Koud wassen, binnenstebuiten", "Niet in de droogkast", "Nooit strijken op de print"],
  },
  {
    id: "02", slug: "chrome-puffer", name: "Chrome Puffer", type: "Wet-look puffer — afneembare mouwen & kap", price: 420, sizes: APPAREL,
    img: "/img/products/p02", models: m("chrome-puffer"),
    blurb: "Vier delen, één jas. Kap en mouwen klikken los met verborgen drukknopen, zodat je hem ook als bodywarmer draagt. Gelakte nylon die het licht vangt als nat asfalt.",
    spec: [["Buitenstof", "100% nylon ripstop, high-gloss lakcoating"], ["Vulling", "80/20 gerecycleerd dons, 650 fill power"], ["Voering", "Mat zwart polyester taft"], ["Hardware", "925 zilveren kruistrekker, YKK Excella rits"], ["Pasvorm", "Oversized, kort in de taille"], ["Herkomst", "Gemaakt in Italië"]],
    care: ["Enkel professioneel reinigen", "Niet strijken", "Plat laten drogen"],
  },
  {
    id: "03", slug: "horseshoe-tee", name: "Horseshoe Tee", type: "Oversized tee — garment dyed", price: 110, sizes: APPAREL,
    img: "/img/products/p03", models: m("horseshoe-tee"),
    blurb: "Een hoefijzer voor geluk, een dolk voor de rest. Boxy tee in single jersey die na het verven nog eens gewassen wordt, zodat het zwart al geleefd heeft voor jij hem draagt.",
    spec: [["Samenstelling", "100% gekamd katoen, single jersey"], ["Gewicht", "280 g/m²"], ["Afwerking", "Garment dyed, enzyme wash"], ["Print", "Zeefdruk met plastisol craquelé-effect"], ["Pasvorm", "Boxy, verlaagde schouder, korte mouw tot elleboog"], ["Herkomst", "Portugal"]],
    care: ["30°, binnenstebuiten", "Niet in de droogkast", "Kleur kan licht afgeven bij eerste wasbeurt"],
  },
  {
    id: "04", slug: "cemetery-denim", name: "Cemetery Denim", type: "Baggy denim — leren kruispatches", price: 320, sizes: WAIST,
    img: "/img/products/p04", models: m("cemetery-denim"),
    blurb: "Wijde jeans in zwaar Japans denim, zwart overgeverfd en daarna weer opengeschuurd. Twee kruisen in kalfsleer, met de hand opgestikt, met zilveren klinknagels.",
    spec: [["Samenstelling", "100% katoen, 14 oz selvedge denim"], ["Weving", "Japans, ringspun, rechte keper"], ["Patches", "Plantaardig gelooid kalfsleer"], ["Hardware", "925 zilveren kruisklinknagels"], ["Pasvorm", "Baggy, hoge taille, gestapelde zoom"], ["Herkomst", "Stof uit Okayama, confectie in Italië"]],
    care: ["Zo weinig mogelijk wassen", "Koud, binnenstebuiten, met de hand", "Leer niet onderdompelen"],
  },
  {
    id: "05", slug: "hyperfocus-pendant", name: "Hyperfocus Pendant", type: "925 zilver — kruishanger", price: 410, sizes: ["Eén maat"],
    img: "/img/products/p05", models: m("hyperfocus-pendant"),
    blurb: "Het stuk waar het mee begon. Massief zilveren kruis met fleur-de-lis-uiteinden, gegoten, met de hand afgewerkt en geoxideerd in de groeven zodat elk detail zwart oplicht.",
    spec: [["Materiaal", "Massief 925 sterling zilver"], ["Afwerking", "Handgepolijst, geoxideerde groeven"], ["Afmeting", "Hanger 58 × 38 mm"], ["Ketting", "Paperchain, 5 mm, 60 cm"], ["Gewicht", "± 41 g"], ["Herkomst", "Gegoten en afgewerkt in Antwerpen"]],
    care: ["Droog bewaren in het meegeleverde zakje", "Poetsdoek, geen dompelbad", "Patina is gewild"],
  },
  {
    id: "06", slug: "chaos-rings", name: "Chaos Rings", type: "Set van drie — 925 zilver", price: 360, sizes: ["52", "56", "60", "64"],
    img: "/img/products/p06", models: m("chaos-rings"),
    blurb: "Drie ringen, drie gedachten tegelijk: een kruiszegel, een dolk en een band met gegraveerde blackletter. Draag ze samen of verdeel de chaos over twee handen.",
    spec: [["Materiaal", "Massief 925 sterling zilver"], ["Afwerking", "Handgegraveerd, geoxideerd, hoogglans"], ["Breedte", "Zegel 18 mm · Dolk 14 mm · Band 10 mm"], ["Gewicht", "± 62 g (set)"], ["Maat", "EU-ringmaat, per set gelijk"], ["Herkomst", "Antwerpen"]],
    care: ["Afdoen bij sporten en zwemmen", "Poetsdoek, geen dompelbad", "Patina is gewild"],
  },
  {
    id: "07", slug: "static-cap", name: "Static Cap", type: "Trucker cap — zilveren kruis", price: 95, sizes: ["Eén maat"],
    img: "/img/products/p07", models: m("static-cap"),
    blurb: "Hoge voorkant, mesh achteraan, een opgestikt kruis in zilverdraad en kleine kruisoogjes. Snapback in zwart metaal.",
    spec: [["Voorpaneel", "Katoen twill, gestructureerd"], ["Achterpaneel", "Polyester mesh"], ["Borduursel", "Metallic zilverdraad, 3D-puff"], ["Sluiting", "Snapback, zwart metaal"], ["Maat", "Eén maat, verstelbaar 55–61 cm"], ["Herkomst", "Portugal"]],
    care: ["Enkel handwas", "Niet in de wasmachine", "Vorm geven en liggend laten drogen"],
  },
  {
    id: "08", slug: "overdrive-track-jacket", name: "Overdrive Track Jacket", type: "Trainingsvest — zilveren strepen", price: 180, sizes: APPAREL,
    img: "/img/products/p08", models: m("overdrive-track-jacket"),
    blurb: "Gecropt trainingsvest met drie zilveren strepen per mouw en een geborduurd kruis op de borst. Hoort bij de Overdrive Track Pant, maar niets moet.",
    spec: [["Samenstelling", "100% polyester tricot, mat"], ["Strepen", "Reflecterend zilvertape, gestikt"], ["Hardware", "Zilveren metalen rits, kruistrekker"], ["Pasvorm", "Gecropt, ruime mouw, geribde boorden"], ["Gewicht", "330 g/m²"], ["Herkomst", "Portugal"]],
    care: ["30°, binnenstebuiten, rits dicht", "Niet in de droogkast", "Niet strijken op de strepen"],
  },
  {
    id: "09", slug: "overdrive-track-pant", name: "Overdrive Track Pant", type: "Wijde trainingsbroek — zilveren strepen", price: 150, sizes: APPAREL,
    img: "/img/products/p09", models: m("overdrive-track-pant"),
    blurb: "Wijde trainingsbroek die tot op de schoen valt. Zilveren strepen langs het hele been, witte trekkoorden, een klein kruis op de dij.",
    spec: [["Samenstelling", "100% polyester tricot, mat"], ["Strepen", "Reflecterend zilvertape, gestikt"], ["Taille", "Elastisch met witte trekkoord"], ["Pasvorm", "Wijd, recht, lange binnenbeenlengte"], ["Gewicht", "330 g/m²"], ["Herkomst", "Portugal"]],
    care: ["30°, binnenstebuiten", "Niet in de droogkast", "Niet strijken op de strepen"],
  },
  {
    id: "10", slug: "bleed-longsleeve", name: "Bleed Longsleeve", type: "Longsleeve — rode mouwprint", price: 130, sizes: APPAREL,
    img: "/img/products/p10", models: m("bleed-longsleeve"),
    blurb: "Het enige rood in de collectie. Een druipende blackletter-print langs de linkermouw, een zilveren kruisje op het hart. De rest is zwart, zoals het hoort.",
    spec: [["Samenstelling", "100% gekamd katoen, single jersey"], ["Gewicht", "260 g/m²"], ["Print", "Waterbasis, bloedrood, handgezeefdrukt"], ["Afwerking", "Garment dyed"], ["Pasvorm", "Oversized, lange mouw met duimgat"], ["Herkomst", "Portugal"]],
    care: ["30°, binnenstebuiten", "Niet in de droogkast", "Rood kan licht afgeven bij eerste wasbeurt"],
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const groups = ["/img/groups/g1", "/img/groups/g2", "/img/groups/g3"];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);

export const DELIVERY = {
  standaard: { label: "Standaard", detail: "2–4 werkdagen · bpost", price: 6.95, freeFrom: 250 },
  express: { label: "Express", detail: "Volgende werkdag · DHL Express", price: 14.95, freeFrom: Infinity },
} as const;
export type DeliveryKey = keyof typeof DELIVERY;

export const slogans = [
  "ADHD-FUELED URBAN DESIGN",
  "CHAOS IS EEN METHODE",
  "HYPERFOCUS / HANDMADE",
  "NIET STIL TE KRIJGEN",
  "ZILVER. ZWART. ZWEET.",
  "GEMAAKT IN VLAANDEREN",
];
