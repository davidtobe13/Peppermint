// Use this for testing locally
import { client } from './config/database';

async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to  New MongoDB Atlas!');
    
    const database = client.db('myDatabase');
    const collection = database.collection('users');
    const productsCollection = database.collection('products');
    
    // Test insert user
    const testUser = {
      email: 'Mytest@example.com',
      name: 'Test User',
      status: 'active',
      age: 40
    };
    
    const result = await collection.insertOne(testUser);
    console.log('Test user inserted:', result.insertedId);
    
    // // Test query users
    // const users = await collection.find({ status: 'active' }).toArray();
    // console.log('Active users:', users);

    // Test create product
    // const testProduct = {
    //   name: 'Test Product',
    //   description: 'This is a test product',
    //   price: Number((29.99).toFixed(2)),
    //   category: 'Electronics',
    //   stock: "jksdjskd",
    //   createdAt: new Date()
    // };

    // const productResult = await productsCollection.insertOne(testProduct);
    // console.log('Test product created:', productResult.insertedId);

    // Test get all products
    // const products = await productsCollection.find({}).toArray();
    // console.log('All products:', products);

    // Test get products with specific criteria
    // const activeProducts = await productsCollection.find({ 
    //   inStock: true,
    //   price: { $lt: 100 } // Example: products under $100
    // }).toArray();
    // console.log('Active products under $100:', activeProducts);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testConnection();