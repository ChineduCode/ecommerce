const products = [
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Black Leather Jacket',
        image: '/images/mens_black_leather_jacket.jpg',
        category: 'Men',
        subCategory: 'Clothing',
        description: 'A stylish black leather jacket made from premium materials.',
        price: 120.00,
        countInStock: 20,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Red Heels',
        image: '/images/womens_red_heels.jpg',
        category: 'Women',
        subCategory: 'Footwear',
        description: 'Elegant red heels perfect for formal occasions.',
        price: 75.00,
        countInStock: 30,
        reviews: [],
        numReviews: 0,
        rating: 4.5
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s White Sneakers',
        image: '/images/mens_white_sneakers.jpg',
        category: 'Men',
        subCategory: 'Footwear',
        description: 'Comfortable and durable white sneakers for everyday use.',
        price: 60.00,
        countInStock: 40,
        reviews: [],
        numReviews: 0,
        rating: 4.8
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Black Handbag',
        image: '/images/womens_black_handbag.jpg',
        category: 'Women',
        subCategory: 'Bag',
        description: 'A versatile black handbag that complements any outfit.',
        price: 90.00,
        countInStock: 25,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Brown Leather Belt',
        image: '/images/mens_brown_leather_belt.jpg',
        category: 'Men',
        subCategory: 'Accessories',
        description: 'A classic brown leather belt with a modern buckle.',
        price: 35.00,
        countInStock: 50,
        reviews: [],
        numReviews: 0,
        rating: 4.4
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Gold Wristwatch',
        image: '/images/womens_gold_wristwatch.jpg',
        category: 'Women',
        subCategory: 'Wristwatch',
        description: 'An elegant gold wristwatch with a minimalist design.',
        price: 150.00,
        countInStock: 15,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Casual Cap',
        image: '/images/mens_casual_cap.jpg',
        category: 'Men',
        subCategory: 'Cap',
        description: 'A comfortable and stylish cap for casual wear.',
        price: 20.00,
        countInStock: 60,
        reviews: [],
        numReviews: 0,
        rating: 4.3
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Summer Dress',
        image: '/images/womens_summer_dress.jpg',
        category: 'Women',
        subCategory: 'Clothing',
        description: 'A light and breezy summer dress perfect for warm days.',
        price: 45.00,
        countInStock: 35,
        reviews: [],
        numReviews: 0,
        rating: 4.5
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Classic Wristwatch',
        image: '/images/mens_classic_wristwatch.jpg',
        category: 'Men',
        subCategory: 'Wristwatch',
        description: 'A timeless wristwatch with a leather strap and classic design.',
        price: 130.00,
        countInStock: 18,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s White Sneakers',
        image: '/images/womens_white_sneakers.jpg',
        category: 'Women',
        subCategory: 'Footwear',
        description: 'Stylish white sneakers that pair well with any casual outfit.',
        price: 65.00,
        countInStock: 40,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Formal Shoes',
        image: '/images/mens_formal_shoes.jpg',
        category: 'Men',
        subCategory: 'Footwear',
        description: 'Polished formal shoes ideal for business and formal events.',
        price: 110.00,
        countInStock: 22,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Evening Clutch',
        image: '/images/womens_evening_clutch.jpg',
        category: 'Women',
        subCategory: 'Bag',
        description: 'A chic evening clutch with a sparkling finish.',
        price: 70.00,
        countInStock: 30,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Sports Watch',
        image: '/images/mens_sports_watch.jpg',
        category: 'Men',
        subCategory: 'Wristwatch',
        description: 'A rugged sports watch with multiple functionalities.',
        price: 90.00,
        countInStock: 28,
        reviews: [],
        numReviews: 0,
        rating: 4.5
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Ankle Boots',
        image: '/images/womens_ankle_boots.jpg',
        category: 'Women',
        subCategory: 'Footwear',
        description: 'Fashionable ankle boots that are both comfortable and stylish.',
        price: 85.00,
        countInStock: 32,
        reviews: [],
        numReviews: 0,
        rating: 4.8
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Denim Jacket',
        image: '/images/mens_denim_jacket.jpg',
        category: 'Men',
        subCategory: 'Clothing',
        description: 'A classic denim jacket that never goes out of style.',
        price: 65.00,
        countInStock: 25,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Woolen Cap',
        image: '/images/womens_woolen_cap.jpg',
        category: 'Women',
        subCategory: 'Cap',
        description: 'A warm woolen cap perfect for winter weather.',
        price: 18.00,
        countInStock: 50,
        reviews: [],
        numReviews: 0,
        rating: 4.4
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Leather Boots',
        image: '/images/mens_leather_boots.jpg',
        category: 'Men',
        subCategory: 'Footwear',
        description: 'Durable leather boots for outdoor activities.',
        price: 120.00,
        countInStock: 18,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Casual Tote Bag',
        image: '/images/womens_tote_bag.jpg',
        category: 'Women',
        subCategory: 'Bag',
        description: 'A spacious tote bag for everyday essentials.',
        price: 55.00,
        countInStock: 35,
        reviews: [],
        numReviews: 0,
        rating: 4.5
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Summer Hat',
        image: '/images/mens_summer_hat.jpg',
        category: 'Men',
        subCategory: 'Cap',
        description: 'A lightweight summer hat perfect for sunny days.',
        price: 22.00,
        countInStock: 40,
        reviews: [],
        numReviews: 0,
        rating: 4.3
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Leather Wallet',
        image: '/images/womens_leather_wallet.jpg',
        category: 'Women',
        subCategory: 'Accessories',
        description: 'A sleek leather wallet with multiple compartments.',
        price: 45.00,
        countInStock: 28,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Cargo Pants',
        image: '/images/mens_cargo_pants.jpg',
        category: 'Men',
        subCategory: 'Clothing',
        description: 'Comfortable and versatile cargo pants with multiple pockets.',
        price: 50.00,
        countInStock: 30,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s High Waist Jeans',
        image: '/images/womens_high_waist_jeans.jpg',
        category: 'Women',
        subCategory: 'Clothing',
        description: 'Classic high-waist jeans with a flattering fit.',
        price: 70.00,
        countInStock: 35,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Running Shoes',
        image: '/images/mens_running_shoes.jpg',
        category: 'Men',
        subCategory: 'Footwear',
        description: 'Lightweight running shoes designed for optimal performance.',
        price: 80.00,
        countInStock: 25,
        reviews: [],
        numReviews: 0,
        rating: 4.8
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Fitness Leggings',
        image: '/images/womens_fitness_leggings.jpg',
        category: 'Women',
        subCategory: 'Clothing',
        description: 'Stretchy and comfortable leggings for fitness and yoga.',
        price: 40.00,
        countInStock: 45,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Plaid Shirt',
        image: '/images/mens_plaid_shirt.jpg',
        category: 'Men',
        subCategory: 'Clothing',
        description: 'A casual plaid shirt made from soft cotton.',
        price: 45.00,
        countInStock: 30,
        reviews: [],
        numReviews: 0,
        rating: 4.4
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Leather Boots',
        image: '/images/womens_leather_boots.jpg',
        category: 'Women',
        subCategory: 'Footwear',
        description: 'High-quality leather boots for a rugged yet stylish look.',
        price: 110.00,
        countInStock: 20,
        reviews: [],
        numReviews: 0,
        rating: 4.7
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Sunglasses',
        image: '/images/mens_sunglasses.jpg',
        category: 'Men',
        subCategory: 'Accessories',
        description: 'Stylish sunglasses with UV protection.',
        price: 25.00,
        countInStock: 40,
        reviews: [],
        numReviews: 0,
        rating: 4.3
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Maxi Skirt',
        image: '/images/womens_maxi_skirt.jpg',
        category: 'Women',
        subCategory: 'Clothing',
        description: 'A flowy maxi skirt that\'s perfect for casual outings.',
        price: 50.00,
        countInStock: 35,
        reviews: [],
        numReviews: 0,
        rating: 4.5
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Men\'s Wool Coat',
        image: '/images/mens_wool_coat.jpg',
        category: 'Men',
        subCategory: 'Clothing',
        description: 'A warm wool coat ideal for the winter season.',
        price: 150.00,
        countInStock: 15,
        reviews: [],
        numReviews: 0,
        rating: 4.8
    },
    {
        user: '66cca902c89d9fed37cf7d9c',
        name: 'Women\'s Casual Hoodie',
        image: '/images/womens_casual_hoodie.jpg',
        category: 'Women',
        subCategory: 'Clothing',
        description: 'A cozy and casual hoodie for everyday wear.',
        price: 40.00,
        countInStock: 40,
        reviews: [],
        numReviews: 0,
        rating: 4.6
    }
];

module.exports = products