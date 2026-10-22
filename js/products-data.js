// Complete 20-Product Catalog Database for Leather The (Sialkot, Pakistan)
// Sourced directly from official Product Catalog PDF

export const CATALOG_PRODUCTS = [
  // --- MEN'S JACKETS (LT-01 to LT-04) ---
  {
    id: "LT-01",
    code: "LT-01",
    name: "Black Flame Embroidered Leather Jacket",
    category: "mens-jackets",
    categoryLabel: "Men's Jackets",
    badge: "Iconic Bestseller",
    shortDesc: "A black jacket with white flame embroidery and a front zip.",
    description: "Engineered from premium hand-selected calfskin leather, this statement jacket showcases high-density contrasting white flame embroidery running organically down both sleeves and across the chest panels. Designed with an elasticated waistband and cuffs for a contemporary streetwear bomber silhouette.",
    specs: [
      "Collared, zip-front jacket with heavy-gauge silver zipper",
      "White flame embroidery on chest and sleeves (tensile-tested thread)",
      "Elasticated hem and cuffs for tailored drape",
      "Supple satin-twill inner lining with concealed interior pockets",
      "Custom brand embossed snap pullers"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "100% Full-Grain Cowhide / Lambskin",
    moq: "5 pieces (Wholesale) / Custom Samples Available",
    image: "assets/images/jacket-flame-black.jpg",
    tags: ["Flame", "Embroidery", "Bestseller", "Bomber", "Streetwear"]
  },
  {
    id: "LT-02",
    code: "LT-02",
    name: "Burgundy Flame Embroidered Leather Jacket",
    category: "mens-jackets",
    categoryLabel: "Men's Jackets",
    badge: "Signature Colorway",
    shortDesc: "A burgundy jacket with cream flame embroidery and a front zip.",
    description: "Crafted in Leather The's signature deep oxblood burgundy leather. Features artisanal cream flame embroidery along the hemline and sleeves, offering a subtle luxury gothic presence with an authentic vintage motorsport contour.",
    specs: [
      "Collared, zip-front jacket with antique brass or silver hardware",
      "Cream flame embroidery on hem and sleeves",
      "Elasticated hem and cuffs for thermal comfort",
      "Hand-burnished leather grain with protective weather seal",
      "Double welt exterior hand pockets"
    ],
    colors: ["Burgundy", "Oxblood"],
    defaultColor: "Burgundy",
    materials: "Premium Burnished Nappa Leather",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/jacket-flame-black.jpg",
    isBurgundyVariant: true,
    tags: ["Burgundy", "Flame", "Luxury", "Embroidery"]
  },
  {
    id: "LT-03",
    code: "LT-03",
    name: "Black Web Pattern Leather Bomber Jacket",
    category: "mens-jackets",
    categoryLabel: "Men's Jackets",
    badge: "Architectural Cut",
    shortDesc: "A black bomber with a web pattern, contrast panels and ribbed trims.",
    description: "A show-stopping bomber featuring intricate white web-pattern contrast leather stitching across chest and shoulders. Fitted with contrast white leather geometric panels and heavy-gauge ribbed wool trims for maximum structural definition.",
    specs: [
      "Bomber cut with heavy front zip closure",
      "Web-pattern precision stitching and contrast white panels",
      "Ribbed hem and cuffs with reinforced tension",
      "Double-stitched panels for durability",
      "Interior zip wallet pocket and monogram lining"
    ],
    colors: ["Black / White"],
    defaultColor: "Black / White",
    materials: "Select Grade-A Cowhide & Contrast Lambskin",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/hero-editorial.jpg",
    tags: ["Web Pattern", "Contrast", "Bomber", "Moto"]
  },
  {
    id: "LT-04",
    code: "LT-04",
    name: "White & Black Flame Jacket",
    category: "mens-jackets",
    categoryLabel: "Men's Jackets",
    badge: "High Contrast",
    shortDesc: "A white jacket with a bold black flame print and zip pockets.",
    description: "Constructed from pristine chalk-white leather detailed with high-impact bold black flame screen printing and embroidery. Features sleek zippered chest and hand pockets with a structured turn-down collar.",
    specs: [
      "Collared, zip-front silhouette with wind guard",
      "Bold black flame print and accent embroidery",
      "Zip pockets, elasticated hem and cuffs",
      "Dual zip pockets for secure storage",
      "Stain-resistant leather conditioning finish"
    ],
    colors: ["White and Black"],
    defaultColor: "White and Black",
    materials: "Mil-Spec Dyed White Bovine Leather",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/jacket-flame-black.jpg",
    isWhiteVariant: true,
    tags: ["Flame Print", "Monochrome", "Zip Pockets"]
  },

  // --- WOMEN'S JACKETS (LT-05 to LT-08) ---
  {
    id: "LT-05",
    code: "LT-05",
    name: "Red & Black Racing Crop Jacket (Style 1)",
    category: "womens-jackets",
    categoryLabel: "Women's Jackets",
    badge: "Viral Trending",
    shortDesc: "A cropped racing jacket in red and black with a stand collar and front zip.",
    description: "An iconic Y2K motorsport racer silhouette reimagined in luxury genuine leather. Features bold crimson red panels, black contrast sleeve inserts, racing typography patches, and a sleek stand collar.",
    specs: [
      "Cropped racing-style cut designed for flattering high-waist pairing",
      "Stand collar with front zip closure",
      "Red body, black sleeve panels, racing graphics & embroidery",
      "Gusseted zip cuffs for adjustable fit",
      "Silky breathable satin interior lining"
    ],
    colors: ["Red and Black"],
    defaultColor: "Red and Black",
    materials: "Drum-Dyed Lambskin Leather",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/jacket-racing-red.jpg",
    tags: ["Racing", "Cropped", "Motorsport", "Red & Black"]
  },
  {
    id: "LT-06",
    code: "LT-06",
    name: "Red & Black Racing Crop Jacket (Style 2)",
    category: "womens-jackets",
    categoryLabel: "Women's Jackets",
    badge: "Snap Collar Edition",
    shortDesc: "A cropped racing jacket in red and black with racing graphics.",
    description: "Variant edition of the popular racing crop, featuring an additional throat latch snap tab, reinforced padded shoulder articulation, and aerodynamic back paneling with championship typography.",
    specs: [
      "Cropped racing-style cut with contoured waistline",
      "Stand collar with snap and front zip",
      "Red body, black sleeve panels, racing graphics",
      "Action back shoulder gussets for comfortable range of motion",
      "Reinforced heavy-duty nickel hardware"
    ],
    colors: ["Red and Black"],
    defaultColor: "Red and Black",
    materials: "Premium Soft-Touch Milled Leather",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/jacket-racing-red.jpg",
    tags: ["Racing", "Snap Collar", "Cropped", "Biker"]
  },
  {
    id: "LT-07",
    code: "LT-07",
    name: "Tan Suede Biker Jacket",
    category: "womens-jackets",
    categoryLabel: "Women's Jackets",
    badge: "Velveteen Suede",
    shortDesc: "A fitted tan biker jacket with an asymmetric zip and zip pockets.",
    description: "Handcrafted from velvety warm tan calfskin suede. Accented with classic motorcycle asymmetric diagonal zip, notch lapels with engraved snap tabs, and precision angled zippered utility pockets.",
    specs: [
      "Asymmetric front zip with vintage antiqued teeth",
      "Notch lapels with snap tabs",
      "Two zip pockets, cropped length",
      "Buttery-soft suede nap with natural depth",
      "Fully lined with temperature-regulating viscose"
    ],
    colors: ["Tan"],
    defaultColor: "Tan",
    materials: "100% Genuine Calf Suede Leather",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/craftsmanship.jpg",
    tags: ["Suede", "Tan", "Biker", "Asymmetric"]
  },
  {
    id: "LT-08",
    code: "LT-08",
    name: "Burgundy Belted Biker Jacket",
    category: "womens-jackets",
    categoryLabel: "Women's Jackets",
    badge: "Runway Favorite",
    shortDesc: "A cropped burgundy biker jacket with an asymmetric zip and a belt.",
    description: "A commanding cropped silhouette in high-gloss burgundy leather. Showcases dramatic wide notch lapels, asymmetric biker zip, and a matching full-leather waist belt with a polished chrome buckle.",
    specs: [
      "Asymmetric front zip closure with wind-flap backing",
      "Wide lapels with snap-down hardware",
      "Belted waist with buckle, cropped length",
      "Deep oxblood burgundy colorway with subtle wax sheen",
      "Dual zip cuffs and epaulettes on shoulders"
    ],
    colors: ["Burgundy"],
    defaultColor: "Burgundy",
    materials: "High-Grade Polished Lambskin",
    moq: "5 pieces (Wholesale)",
    image: "assets/images/logo-crest.jpg",
    tags: ["Burgundy", "Belted", "Biker", "Cropped", "Luxury"]
  },

  // --- WINTER COLLECTION HOODIES (LT-09 to LT-12) ---
  {
    id: "LT-09",
    code: "LT-09",
    name: "Cream Graphic Hoodie",
    category: "winter-hoodies",
    categoryLabel: "Winter Hoodies",
    badge: "Heavyweight 450GSM",
    shortDesc: "A relaxed cream hoodie with a thorn graphic on the front and sleeves.",
    description: "Built for cold climates from ultra-dense 450 GSM organic French terry cotton. Features distressed thorn typography screen-printed across the chest and cascading down both arms with a spacious double-layered hood.",
    specs: [
      "Drawstring hood and front pocket",
      "Thorn graphic on front and sleeves",
      "Ribbed cuffs and hem that resist stretching",
      "Pre-shrunk custom wash with soft fleece interior",
      "Relaxed drop-shoulder streetwear fit"
    ],
    colors: ["Cream"],
    defaultColor: "Cream",
    materials: "450 GSM 100% Heavyweight Cotton Fleece",
    moq: "10 pieces (Wholesale)",
    image: "assets/images/hoodie-gothic-black.jpg",
    isCreamVariant: true,
    tags: ["Thorn", "Graphic", "Cream", "Streetwear", "Winter"]
  },
  {
    id: "LT-10",
    code: "LT-10",
    name: "Black Gothic Print Hoodie",
    category: "winter-hoodies",
    categoryLabel: "Winter Hoodies",
    badge: "Core Essential",
    shortDesc: "A black hoodie with a large gothic print.",
    description: "A dark streetwear masterpiece featuring an oversized gothic tribal insignia spanning the full chest and running down the sleeve contours. Premium pitch-black reactive dye ensures enduring depth after countless washes.",
    specs: [
      "Hooded design with structured heavyweight drape",
      "Large gothic print on front and sleeves",
      "Ribbed cuffs and hem with double-stitched reinforcements",
      "Warm brushed fleece backing for winter insulation",
      "Hidden interior media pocket"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "460 GSM Heavyweight Terry Fleece",
    moq: "10 pieces (Wholesale)",
    image: "assets/images/hoodie-gothic-black.jpg",
    tags: ["Gothic", "Black", "Heavyweight", "Winter Collection"]
  },
  {
    id: "LT-11",
    code: "LT-11",
    name: "Black Gothic Zip-Up Hoodie",
    category: "winter-hoodies",
    categoryLabel: "Winter Hoodies",
    badge: "Full Zip Edition",
    shortDesc: "A black zip-up hoodie with a gothic print.",
    description: "Engineered with a full-length heavy-duty zipper, allowing versatile styling. Accented with gothic prints across the chest split and both sleeves, finished with metal-tipped drawstrings.",
    specs: [
      "Full zip front with drawstring hood",
      "Gothic print on chest and sleeves",
      "Ribbed cuffs and hem",
      "Dual front pockets with reinforced bar-tacks",
      "Dense combed cotton fleece interior"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "100% Combed Cotton Heavy Fleece (450 GSM)",
    moq: "10 pieces (Wholesale)",
    image: "assets/images/hoodie-gothic-black.jpg",
    tags: ["Zip-Up", "Gothic", "Black", "Streetwear"]
  },
  {
    id: "LT-12",
    code: "LT-12",
    name: "White Thorn Print Hoodie",
    category: "winter-hoodies",
    categoryLabel: "Winter Hoodies",
    badge: "Multi-Colorway",
    shortDesc: "A relaxed hoodie with a thorn print. Shown in white, black and light blue.",
    description: "Crisp optic white winter hoodie featuring contrasting thorn tribal graphics. Available in White, Pitch Black, and Frost Light Blue. Oversized contemporary fit with plush fleece lining.",
    specs: [
      "Drawstring hood and front pocket",
      "Thorn print on front and sleeves",
      "Also shown in black and light blue",
      "Super-soft peach finish exterior",
      "Preshrunk fabric guarantees dimensional stability"
    ],
    colors: ["White", "Black", "Light Blue"],
    defaultColor: "White",
    materials: "450 GSM Premium Fleece",
    moq: "10 pieces (Wholesale)",
    image: "assets/images/hoodie-gothic-black.jpg",
    isWhiteVariant: true,
    tags: ["Thorn", "White", "Light Blue", "Multi-Color"]
  },

  // --- MEN'S GLOVES (LT-13 to LT-16) ---
  {
    id: "LT-13",
    code: "LT-13",
    name: "Men’s Classic Gloves",
    category: "mens-gloves",
    categoryLabel: "Men's Gloves",
    badge: "Timeless Formal",
    shortDesc: "Classic black gloves with a button strap at the wrist.",
    description: "Handcrafted from supple aniline sheepskin leather with heritage three-line topstitching. Designed with an adjustable wrist strap secured by an embossed brass snap button for windproof warmth.",
    specs: [
      "Wrist strap with snap button",
      "Three-line stitching on the back",
      "Smooth finish with natural leather luster",
      "Cashmere or thermal lining option available",
      "Touchscreen-compatible fingertips available on request"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "100% Grade-A Aniline Lambskin",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    tags: ["Classic", "Button Strap", "Men's", "Dress Gloves"]
  },
  {
    id: "LT-14",
    code: "LT-14",
    name: "Men’s Brown Gloves",
    category: "mens-gloves",
    categoryLabel: "Men's Gloves",
    badge: "Cognac Brown",
    shortDesc: "Classic brown gloves with a three-line back detail.",
    description: "Rich mahogany brown leather gloves featuring triple wave topstitching and an elasticated gathered wrist for an effortless snug fit. Perfect companion for wool overcoats and leather jackets.",
    specs: [
      "Three-line wave stitching on the back",
      "Gathered wrist detail that seals in warmth",
      "Classic brown finish with hand-burnished tint",
      "Pre-curved ergonomic finger pattern",
      "Reinforced fourchette construction between fingers"
    ],
    colors: ["Brown"],
    defaultColor: "Brown",
    materials: "Full Grain Sheep Napa Leather",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    isBrownVariant: true,
    tags: ["Brown", "Wave Stitch", "Gathered Wrist", "Men's"]
  },
  {
    id: "LT-15",
    code: "LT-15",
    name: "Men’s Strap Gloves",
    category: "mens-gloves",
    categoryLabel: "Men's Gloves",
    badge: "Buckle Accent",
    shortDesc: "Black gloves with a wrist strap and contrast stitching.",
    description: "Rugged yet sophisticated black leather gloves featuring contrast perimeter stitching and an adjustable wrist strap with a gunmetal buckle and snap closure.",
    specs: [
      "Wrist strap with snap and buckle",
      "Contrast stitching on the back",
      "Smooth finish with tensile durability",
      "Thermal brushed lining for cold climates",
      "Sialkot master-stitched edge piping"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "Treated Cowhide / Goatskin Leather",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    tags: ["Buckle", "Contrast Stitch", "Rugged", "Strap"]
  },
  {
    id: "LT-16",
    code: "LT-16",
    name: "Men’s Driving Gloves",
    category: "mens-gloves",
    categoryLabel: "Men's Gloves",
    badge: "Track Heritage",
    shortDesc: "Unlined driving gloves with knuckle cut-outs and a snap strap.",
    description: "The quintessential motorsport driving glove. Features four knuckle cutouts, precision perforations along the fingers for active breathability, and an open back with a branded wrist snap strap.",
    specs: [
      "Knuckle cut-outs for flexible steering wheel grip",
      "Perforated finger detail for ventilation",
      "Snap strap at the wrist with branded hardware",
      "Unlined construction provides direct tactile control",
      "Elasticated palm notch for swift on-and-off"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "Ultra-Thin Tactile Italian-Grade Lambskin",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    tags: ["Driving Gloves", "Perforated", "Knuckle Cutout", "Motorsport"]
  },

  // --- WOMEN'S GLOVES (LT-17 to LT-20) ---
  {
    id: "LT-17",
    code: "LT-17",
    name: "Women’s Classic Gloves",
    category: "womens-gloves",
    categoryLabel: "Women's Gloves",
    badge: "Tailored Slim Fit",
    shortDesc: "Slim-fitting black gloves with a clean finish.",
    description: "Exquisitely tailored for an elegant slender feminine profile. Designed with three-line vertical accent stitching and a discreet open vent at the inner wrist for ease of wear.",
    specs: [
      "Slim fit contoured to women's hand measurements",
      "Three-line stitching on the back",
      "Open wrist vent for comfortable flexibility",
      "Supple butter-soft lambskin exterior",
      "Plush silk lining for effortless slip-on comfort"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "Featherweight Soft Lambskin",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    tags: ["Women's", "Slim Fit", "Classic", "Open Vent"]
  },
  {
    id: "LT-18",
    code: "LT-18",
    name: "Women’s Slim Gloves",
    category: "womens-gloves",
    categoryLabel: "Women's Gloves",
    badge: "Minimalist Luxe",
    shortDesc: "Minimal black gloves with a smooth, slim cut.",
    description: "The epitome of modern minimalism. Completely uninterrupted smooth leather silhouette with hidden internal seams, showcasing the unadulterated grain and luster of top-tier leather.",
    specs: [
      "Slim, minimal cut without external stitch interruptions",
      "Clean seams with inverted stitching",
      "Smooth finish with radiant luster",
      "Elasticized inner palm for secure stay-put fit",
      "Ultra-soft lining"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "Full Grain Baby Nappa",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    tags: ["Minimalist", "Slim", "Smooth", "Women's"]
  },
  {
    id: "LT-19",
    code: "LT-19",
    name: "Women’s Fingerless Gloves",
    category: "womens-gloves",
    categoryLabel: "Women's Gloves",
    badge: "Edgy Chic",
    shortDesc: "Black fingerless gloves with a snap detail at the wrist.",
    description: "Chic rock-and-roll styling meets everyday practicality. Open finger design allows effortless phone and screen operation while adding high-fashion edge to any outfit.",
    specs: [
      "Fingerless design with precision bound edges",
      "Snap detail at the wrist strap",
      "Smooth finish lambskin",
      "Reinforced thumb seam for durability",
      "Perfect for fashion lookbooks and street styling"
    ],
    colors: ["Black"],
    defaultColor: "Black",
    materials: "Premium Lambskin Leather",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    tags: ["Fingerless", "Snap Strap", "Edgy", "Women's"]
  },
  {
    id: "LT-20",
    code: "LT-20",
    name: "Women’s Strap Gloves",
    category: "womens-gloves",
    categoryLabel: "Women's Gloves",
    badge: "Dual Tone Available",
    shortDesc: "Wrist-strap gloves shown in black and brown. Length 23 cm, width 10 cm.",
    description: "Proportioned to perfection (Length: 23 cm, Width: 10 cm). Features an ornamental wrist strap with a polished snap button. Available in pitch black and warm cognac brown.",
    specs: [
      "Wrist strap with snap button",
      "Length 23 cm, width 10 cm",
      "Shown in black and brown",
      "Sleek tapered wrist with inner lining",
      "Ideal gift packaging and wholesale batch production"
    ],
    colors: ["Black", "Brown"],
    defaultColor: "Black",
    materials: "Luxury Calfskin / Sheep Napa",
    moq: "20 pairs (Wholesale)",
    image: "assets/images/gloves-driving-black.jpg",
    isBrownVariant: true,
    tags: ["Strap", "Black & Brown", "23cm x 10cm", "Women's"]
  }
];

export const BRAND_INFO = {
  name: "Leather The",
  legalName: "Leather The Manufacturing & Export Co.",
  location: "Small Industrial Estate, Sialkot, Pakistan",
  whatsapp: "+923424974551",
  whatsappDigits: "923424974551",
  email: "leatherthe78@gmail.com",
  instagram: "@leatherthe_",
  instagramUrl: "https://instagram.com/leatherthe_",
  tiktok: "@leatherthe_",
  tiktokUrl: "https://tiktok.com/@leatherthe_",
  facebook: "facebook.com/share/1MuHEbki7h",
  facebookUrl: "https://facebook.com/share/1MuHEbki7h",
  hours: "Open 24 Hours / 7 Days Worldwide Support",
  worldwideShipping: true,
  slogan: "Sialkot Craftsmanship • Shipped Worldwide"
};
