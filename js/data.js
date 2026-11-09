/* data.js - backup copy of data/products.json and data/pricing.json.
   Used only when fetch() is blocked (e.g. the page was opened by double-clicking the file). */
window.MB_PRODUCTS = [
 {
  "id": "sourdough",
  "name": "Sourdough Loaf",
  "category": "Bread",
  "price": 45,
  "unit": "each",
  "leadDays": 1,
  "maxPerDay": 60,
  "available": true,
  "description": "A crusty sourdough loaf fermented for 24 hours.",
  "alt": "Round sourdough loaf with a golden crust",
  "image": "sourdough"
 },
 {
  "id": "seeded",
  "name": "Seeded Brown Loaf",
  "category": "Bread",
  "price": 38,
  "unit": "each",
  "leadDays": 1,
  "maxPerDay": 60,
  "available": true,
  "description": "Wholesome brown bread packed with sunflower, pumpkin and flax seeds.",
  "alt": "Sliced seeded brown bread",
  "image": "seeded"
 },
 {
  "id": "rolls",
  "name": "Soft Dinner Rolls",
  "category": "Bread",
  "price": 36,
  "unit": "per 6 rolls",
  "leadDays": 1,
  "maxPerDay": 50,
  "available": true,
  "description": "Fluffy butter rolls, perfect for braais and family dinners.",
  "alt": "Basket of soft dinner rolls",
  "image": "rolls"
 },
 {
  "id": "croissant",
  "name": "Butter Croissant",
  "category": "Pastries",
  "price": 22,
  "unit": "each",
  "leadDays": 1,
  "maxPerDay": 80,
  "available": true,
  "description": "Flaky, layered croissants baked fresh every morning.",
  "alt": "Golden butter croissants on a tray",
  "image": "croissant"
 },
 {
  "id": "vetkoek",
  "name": "Mince Vetkoek",
  "category": "Pastries",
  "price": 28,
  "unit": "each",
  "leadDays": 1,
  "maxPerDay": 60,
  "available": true,
  "description": "A South African favourite: fried dough filled with spiced mince.",
  "alt": "Vetkoek filled with mince",
  "image": "vetkoek"
 },
 {
  "id": "eclair",
  "name": "Chocolate Eclair",
  "category": "Pastries",
  "price": 30,
  "unit": "each",
  "leadDays": 2,
  "maxPerDay": 40,
  "available": false,
  "description": "Choux pastry filled with cream and topped with dark chocolate.",
  "alt": "Chocolate topped eclairs",
  "image": "eclair"
 },
 {
  "id": "chocolate-cake",
  "name": "Chocolate Celebration Cake",
  "category": "Cakes",
  "price": 320,
  "unit": "per cake",
  "leadDays": 3,
  "maxPerDay": 5,
  "available": true,
  "description": "Rich three-layer chocolate cake with ganache, serves 10-12.",
  "alt": "Three layer chocolate cake",
  "image": "chocolate-cake"
 },
 {
  "id": "red-velvet",
  "name": "Red Velvet Cake",
  "category": "Cakes",
  "price": 350,
  "unit": "per cake",
  "leadDays": 3,
  "maxPerDay": 5,
  "available": true,
  "description": "Moist red velvet layers with cream cheese icing, serves 10-12.",
  "alt": "Red velvet cake with cream cheese icing",
  "image": "red-velvet"
 },
 {
  "id": "birthday-cake",
  "name": "Custom Birthday Cake",
  "category": "Custom",
  "price": 480,
  "unit": "per cake",
  "leadDays": 7,
  "maxPerDay": 3,
  "available": true,
  "description": "Designed with you: choose flavour, colours and theme. Serves 12-20.",
  "alt": "Decorated custom birthday cake",
  "image": "birthday-cake"
 },
 {
  "id": "corporate-box",
  "name": "Office Treat Box",
  "category": "Custom",
  "price": 650,
  "unit": "per box of 20",
  "leadDays": 3,
  "maxPerDay": 10,
  "available": true,
  "description": "A mixed box of pastries and mini cakes for meetings and events.",
  "alt": "Box of assorted pastries for offices",
  "image": "corporate-box"
 }
];
window.MB_PRICING = {
 "deliveryFee": 80,
 "bulkThreshold": 20,
 "bulkDiscount": 0.1,
 "products": [
  {
   "id": "sourdough",
   "name": "Sourdough Loaf",
   "price": 45,
   "unit": "each",
   "leadDays": 1,
   "maxPerDay": 60
  },
  {
   "id": "seeded",
   "name": "Seeded Brown Loaf",
   "price": 38,
   "unit": "each",
   "leadDays": 1,
   "maxPerDay": 60
  },
  {
   "id": "rolls",
   "name": "Soft Dinner Rolls",
   "price": 36,
   "unit": "per 6 rolls",
   "leadDays": 1,
   "maxPerDay": 50
  },
  {
   "id": "croissant",
   "name": "Butter Croissant",
   "price": 22,
   "unit": "each",
   "leadDays": 1,
   "maxPerDay": 80
  },
  {
   "id": "vetkoek",
   "name": "Mince Vetkoek",
   "price": 28,
   "unit": "each",
   "leadDays": 1,
   "maxPerDay": 60
  },
  {
   "id": "eclair",
   "name": "Chocolate Eclair",
   "price": 30,
   "unit": "each",
   "leadDays": 2,
   "maxPerDay": 40
  },
  {
   "id": "chocolate-cake",
   "name": "Chocolate Celebration Cake",
   "price": 320,
   "unit": "per cake",
   "leadDays": 3,
   "maxPerDay": 5
  },
  {
   "id": "red-velvet",
   "name": "Red Velvet Cake",
   "price": 350,
   "unit": "per cake",
   "leadDays": 3,
   "maxPerDay": 5
  },
  {
   "id": "birthday-cake",
   "name": "Custom Birthday Cake",
   "price": 480,
   "unit": "per cake",
   "leadDays": 7,
   "maxPerDay": 3
  },
  {
   "id": "corporate-box",
   "name": "Office Treat Box",
   "price": 650,
   "unit": "per box of 20",
   "leadDays": 3,
   "maxPerDay": 10
  }
 ]
};
