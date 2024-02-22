const products = [
  {
    name: "Rolex Submariner",
    category: "Luxury Dive Watch",
    description: "The Rolex Submariner is an iconic luxury dive watch known for its timeless design and exceptional underwater performance. Crafted with precision and featuring a robust stainless steel case, it's the epitome of elegance and functionality.",
    imageUrl: "/images/rolex_submarine_watch",
    price: 8500
  },
  {
    name: "ChronoMaster X",
    category: "Chronograph",
    description: "A sophisticated chronograph wristwatch with a sleek design and precision timekeeping features.",
    imageUrl: "/images/chrono_master_x.jpg",
    price: 599.99
  },
  {
    name: "Elegance Elite",
    category: "Classic",
    description: "An elegant and timeless classic wristwatch, perfect for both formal and casual occasions.",
    imageUrl: "/images/elegance_elite.jpg",
    price: 349.99
  },
  {
    name: "Adventure Pro Diver",
    category: "Diving",
    description: "Designed for underwater adventures, this diving wristwatch is water-resistant and built to withstand extreme conditions.",
    imageUrl: "/images/adventure_pro_diver.jpg",
    price: 449.99
  },
  {
    name: "TechFit Smart Tracker",
    category: "Smartwatch",
    description: "A feature-packed smartwatch that combines fitness tracking, notifications, and style in one sleek device.",
    imageUrl: "/images/techfit_smart_tracker.jpg",
    price: 199.99
  },
  
  {
    name: "Minimalist Leather Edition",
    category: "Fashion",
    description: "A minimalist wristwatch with a genuine leather strap, perfect for those who appreciate simplicity and style.",
    imageUrl: "/images/minimalist_leather_edition.jpg",
    price: 129.99
  },
  {
    name: "Urban Runner X",
    category: "Running Shoes",
    description: "High-performance running shoes designed for urban runners, providing comfort, support, and style.",
    imageUrl: "/images/urban_runner_x.jpg",
    price: 89.99
  },
  {
    name: "Casual Comfort Sneakers",
    category: "Casual Sneakers",
    description: "Stylish and comfortable sneakers suitable for everyday wear, combining fashion and functionality.",
    imageUrl: "/images/casual_comfort_sneakers.jpg",
    price: 59.99
  },
  {
    name: "Trailblazer Hiking Boots",
    category: "Hiking Boots",
    description: "Durable hiking boots with advanced traction and ankle support, ideal for outdoor adventures and trailblazing.",
    imageUrl: "/images/trailblazer_hiking_boots.jpg",
    price: 129.99
  },
  {
    name: "Professional Office Loafers",
    category: "Loafers",
    description: "Sleek and polished loafers suitable for the office, providing a professional and sophisticated look.",
    imageUrl: "/images/professional_office_loafers.jpg",
    price: 79.99
  },
  {
    name: "Athletic Training Shoes",
    category: "Training Shoes",
    description: "Versatile athletic training shoes with excellent support, perfect for various fitness activities and workouts.",
    imageUrl: "/images/athletic_training_shoes.jpg",
    price: 69.99
  },
  {
    name: "Classic Leather Boots",
    category: "Leather Boots",
    description: "Timeless leather boots with a classic design, suitable for both casual and semi-formal occasions.",
    imageUrl: "/images/classic_leather_boots.jpg",
    price: 109.99
  },
  {
    name: "Summer Breeze Sandals",
    category: "Sandals",
    description: "Lightweight and breathable sandals designed for summer comfort, perfect for beach outings and casual walks.",
    imageUrl: "/images/summer_breeze_sandals.jpg",
    price: 39.99
  },
  {
    name: "Fashionable High Heels",
    category: "High Heels",
    description: "Chic and fashionable high heels for a glamorous look, suitable for special occasions and evening events.",
    imageUrl: "/images/fashionable_high_heels.jpg",
    price: 89.99
  },
  {
    name: "Chic Floral Blouse",
    category: "Women's Top",
    description: "Elevate your style with this chic floral blouse, perfect for both casual outings and semi-formal events.",
    imageUrl: "/images/chic_floral_blouse.jpg",
    price: 54.99
  },
  {
    name: "Athleisure Tank Top",
    category: "Women's Top",
    description: "Combine comfort and style with this athleisure tank top, ideal for workouts or casual wear on warm days.",
    imageUrl: "/images/athleisure_tank_top.jpg",
    price: 29.99
  },
  {
    name: "Elegant Lace Peplum",
    category: "Women's Top",
    description: "Make a statement with this elegant lace peplum top, perfect for special occasions and evening events.",
    imageUrl: "/images/elegant_lace_peplum.jpg",
    price: 64.99
  },
  {
    name: "Essential Pique Polo",
    category: "Polo Shirt",
    description: "A wardrobe essential, this pique polo shirt offers a comfortable fit and timeless style for any occasion.",
    imageUrl: "/images/essential_pique_polo.jpg",
    price: 34.99
  },
  {
    name: "Performance Golf Polo",
    category: "Polo Shirt",
    description: "Stay cool and stylish on the golf course with this performance-oriented golf polo shirt featuring moisture-wicking technology.",
    imageUrl: "/images/performance_golf_polo.jpg",
    price: 44.99
  },
  {
    name: "Essential V-Neck Tee",
    category: "T-Shirt",
    description: "An essential V-neck tee made from soft and comfortable fabric, perfect for everyday casual wear.",
    imageUrl: "/images/essential_vneck_tee.jpg",
    price: 24.99
  },
  {
    name: "Urban Commuter Backpack",
    category: "Backpack",
    description: "A versatile urban commuter backpack with multiple compartments and a modern design, ideal for daily use.",
    imageUrl: "/images/urban_commuter_backpack.jpg",
    price: 79.99
  },
  {
    name: "Weekend Explorer Duffle",
    category: "Duffle Bag",
    description: "A spacious weekend explorer duffle bag with durable materials, perfect for short trips and adventures.",
    imageUrl: "/images/weekend_explorer_duffle.jpg",
    price: 59.99
  },
  {
    name: "Casual Canvas Tote",
    category: "Tote Bag",
    description: "A casual canvas tote bag with a simple and stylish design, perfect for everyday essentials and shopping trips.",
    imageUrl: "/images/casual_canvas_tote.jpg",
    price: 34.99
  },
  {
    name: "Chic Tote",
    category: "Tote Bag",
    description: "A stylish and spacious tote bag for women, perfect for carrying essentials with a touch of elegance.",
    imageUrl: "/images/chic_tote.jpg",
    price: 79.99
  },
  {
    name: "Crossbody Luxe",
    category: "Crossbody Bag",
    description: "An exquisite crossbody bag designed for versatility and fashion-forward looks, ideal for day-to-night styling.",
    imageUrl: "/images/crossbody_luxe.jpg",
    price: 129.99
  },
  {
    name: "Boho Backpack",
    category: "Backpack",
    description: "A bohemian-inspired backpack that combines style and functionality, featuring intricate details and ample storage.",
    imageUrl: "/images/boho_backpack.jpg",
    price: 89.99
  }
]

export default products;