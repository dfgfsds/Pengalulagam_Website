export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badges: string[];
  isNew: boolean;
  isBestSeller: boolean;
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  size?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
};

export type Review = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
};

export const categories: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    description: 'Fresh, organic produce straight from farms',
    image: 'https://images.pexels.com/photos/8105035/pexels-photo-8105035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'Fruit',
  },
  {
    id: 'skincare',
    name: 'Natural Skincare',
    description: 'Clean, sustainable beauty products',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'Flower',
  },
  {
    id: 'household',
    name: 'Eco-Household',
    description: 'Sustainable products for your home',
    image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'Home',
  },
  {
    id: 'grocery',
    name: 'Pantry Essentials',
    description: 'Organic staples for your kitchen',
    image: 'https://images.pexels.com/photos/6697265/pexels-photo-6697265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'Utensils',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    description: 'Natural supplements and health products',
    image: 'https://images.pexels.com/photos/8313254/pexels-photo-8313254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'Leaf',
  },
  {
    id: 'baby',
    name: 'Baby & Kids',
    description: 'Natural products for little ones',
    image: 'https://images.pexels.com/photos/5731823/pexels-photo-5731823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'Heart',
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Avocado Oil',
    description: 'Cold-pressed avocado oil made from sustainably sourced, organic avocados. Perfect for cooking, dressings, and skincare.',
    category: 'grocery',
    price: 12.99,
    image: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviews: 127,
    badges: ['Organic', 'Cold-Pressed', 'Non-GMO'],
    isNew: false,
    isBestSeller: true,
    variants: [
      { id: '1-sm', name: '250ml', price: 12.99, size: '250ml' },
      { id: '1-md', name: '500ml', price: 22.99, size: '500ml' },
      { id: '1-lg', name: '1L', price: 39.99, size: '1L' },
    ],
  },
  {
    id: '2',
    name: 'Bamboo Toothbrush Set',
    description: 'Sustainable bamboo toothbrushes with soft, BPA-free bristles. Comes in a set of 4 with different colored handles.',
    category: 'household',
    price: 9.99,
    image: 'https://images.pexels.com/photos/5714957/pexels-photo-5714957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviews: 94,
    badges: ['Biodegradable', 'Plastic-Free', 'BPA-Free'],
    isNew: false,
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Organic Rose Hip Face Serum',
    description: 'Nourishing facial serum with organic rose hip oil, vitamin C, and hyaluronic acid for radiant, hydrated skin.',
    category: 'skincare',
    price: 24.99,
    image: 'https://images.pexels.com/photos/4465125/pexels-photo-4465125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviews: 216,
    badges: ['Organic', 'Cruelty-Free', 'Vegan'],
    isNew: true,
    isBestSeller: true,
    variants: [
      { id: '3-sm', name: '30ml', price: 24.99, size: '30ml' },
      { id: '3-md', name: '50ml', price: 34.99, size: '50ml' },
    ],
  },
  {
    id: '4',
    name: 'Reusable Produce Bags',
    description: 'Set of 5 mesh produce bags made from organic cotton. Washable, durable, and perfect for grocery shopping.',
    category: 'household',
    price: 14.99,
    image: 'https://images.pexels.com/photos/5202975/pexels-photo-5202975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviews: 83,
    badges: ['Organic Cotton', 'Reusable', 'Zero-Waste'],
    isNew: false,
    isBestSeller: false,
  },
  {
    id: '5',
    name: 'Organic Raw Honey',
    description: 'Unfiltered, raw honey from ethically managed beehives. Rich in antioxidants and natural enzymes.',
    category: 'grocery',
    price: 16.99,
    image: 'https://images.pexels.com/photos/9159028/pexels-photo-9159028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviews: 152,
    badges: ['Raw', 'Unfiltered', 'Ethically Sourced'],
    isNew: false,
    isBestSeller: true,
    variants: [
      { id: '5-sm', name: '250g', price: 16.99, size: '250g' },
      { id: '5-md', name: '500g', price: 29.99, size: '500g' },
    ],
  },
  {
    id: '6',
    name: 'Natural Clay Face Mask',
    description: 'Detoxifying face mask made with French green clay, activated charcoal, and essential oils for clear, balanced skin.',
    category: 'skincare',
    price: 18.99,
    image: 'https://images.pexels.com/photos/5240677/pexels-photo-5240677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviews: 78,
    badges: ['Natural', 'Cruelty-Free', 'Handcrafted'],
    isNew: true,
    isBestSeller: false,
  },
  {
    id: '7',
    name: 'Bamboo Cutlery Set',
    description: 'Portable bamboo cutlery set with knife, fork, spoon, and chopsticks in a cotton pouch. Perfect for zero-waste living on the go.',
    category: 'household',
    price: 11.99,
    image: 'https://images.pexels.com/photos/5775/laptop-notebook.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviews: 64,
    badges: ['Biodegradable', 'Plastic-Free', 'Sustainable'],
    isNew: false,
    isBestSeller: false,
  },
  {
    id: '8',
    name: 'Organic Matcha Tea',
    description: 'Premium, ceremonial-grade organic matcha green tea powder from Japan. Rich in antioxidants and provides calm, focused energy.',
    category: 'grocery',
    price: 29.99,
    image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviews: 102,
    badges: ['Organic', 'Ceremonial Grade', 'Direct Trade'],
    isNew: false,
    isBestSeller: true,
    variants: [
      { id: '8-sm', name: '30g', price: 29.99, size: '30g' },
      { id: '8-md', name: '60g', price: 54.99, size: '60g' },
    ],
  },
];

export const reviews: Review[] = [
  {
    id: '101',
    user: 'Priya S., Chennai',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFMyF92QZ6Tcg/profile-displayphoto-shrink_200_200/B56ZYrM8ohH0Ac-/0/1744481537398?e=2147483647&v=beta&t=dpF6LUU_Wg5m8gzUblgUlF1tBJCAKAZdzPzEQUXJxQ4',
    rating: 5,
    comment: 'Femi 9 has completely changed how I feel during my periods. The pads are super soft, comfortable, and absorb really well. I can go through my day with full confidence and no irritation!',
    date: '2025-04-15',
  },
  {
    id: '102',
    user: 'Ananya R., Bengaluru',
    avatar: 'https://media.istockphoto.com/id/1216284831/photo/young-adult-south-indian-woman-at-white-background-stock-images.jpg?s=612x612&w=0&k=20&c=Ehv7grHTEAEJPODzHBolw0U-tiMPCMTNOisl2JbGp_k=',
    rating: 4,
    comment: 'I used to get rashes with other brands, but Femi 9 is gentle on my skin. Even during long working hours, it stays dry and comfortable. Truly a lifesaver for sensitive skin!',
    date: '2025-04-29',
  },
  {
    id: '103',
    user: 'Deepika M., Coimbatore',
    avatar: 'https://t4.ftcdn.net/jpg/06/40/07/03/360_F_640070383_9LJ3eTRSvOiwKyrmBYgcjhSlckDnNcxl.jpg',
    rating: 5,
    comment: 'Whether it’s a heavy flow day or travel plans, Femi 9 never lets me down. The leak-proof design and perfect fit make it my go-to choice every month',
    date: '2025-04-02',
  },
  {
    id: '104',
    user: 'Nithya K., Madurai',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
    comment: 'I was surprised by the quality at such an affordable price. Femi 9 gives premium comfort without burning a hole in my pocket. Totally worth switching!',
    date: '2025-04-10',
  },
];
// Functions to get data
export function getCategories(): Category[] {
  return categories;
}

export function getFeaturedCategories(): Category[] {
  return categories.slice(0, 3);
}

export function getCategory(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.category === categoryId);
}

export function getBestSellers(): Product[] {
  return products.filter(product => product.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.isNew);
}

export function getProduct(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getReviews(): Review[] {
  return reviews;
}