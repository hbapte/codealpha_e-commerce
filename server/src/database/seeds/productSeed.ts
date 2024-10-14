// server/src/database/seeds/productSeed.ts
import mongoose from 'mongoose';
import Product, { IProduct } from '../models/product';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config(); 

const DB_HOST = process.env.DB_URI as string;

const generateProduct = (): Partial<IProduct> => ({
  name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`, // Combining adjective with product name
  description: faker.commerce.productDescription(), // Using faker to generate a relevant description
  price: parseFloat(faker.commerce.price({ min: 1000, max: 150000, dec: 0 })), // Random price in the specified range
  category: faker.helpers.arrayElement(['electronics', 'books', 'home', 'clothing']), // Randomly selecting a category
  featured: faker.datatype.boolean(), // Random boolean for featured status
  image: `https://source.unsplash.com/640x480/?${faker.commerce.productMaterial()},${faker.commerce.productAdjective()}`, // Using Unsplash for random images related to product material
});

const generateProducts = (count: number): Partial<IProduct>[] => {
  const products: Partial<IProduct>[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct());
  }
  return products;
};

// Seed function to populate the database
const seedProducts = async () => {
  try {
    await mongoose.connect(DB_HOST);

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products removed');


    const productSeeds = generateProducts(42); // number of seed products  to gen
    await Product.insertMany(productSeeds);
    console.log('Product seeds inserted successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
  }
};

seedProducts();
