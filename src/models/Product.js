// Product.js
class Product {
    constructor(data) {
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
      this.stock = data.stock;
      this.createdAt = data.createdAt || new Date();
    }
  
    static async findAll() {
      const collection = context.services
        .get("mongodb-atlas")
        .db("myDatabase")
        .collection("products");
      
      return await collection.find({}).toArray();
    }
  
    static async create(productData) {
      const collection = context.services
        .get("mongodb-atlas")
        .db("myDatabase")
        .collection("products");
      
      const newProduct = new Product(productData);
      const result = await collection.insertOne(newProduct);
      return { ...newProduct, _id: result.insertedId };
    }
  }