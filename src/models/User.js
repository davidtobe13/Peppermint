// User.js
class User {
    constructor(data) {
      this.email = data.email;
      this.name = data.name;
      this.status = data.status;
      this.age = data.age;
      this.createdAt = data.createdAt || new Date();
      this.lastModified = data.lastModified || new Date();
    }
  
    static async findByStatus(status) {
      const collection = context.services
        .get("mongodb-atlas")
        .db("myDatabase")
        .collection("users");
      
      const users = await collection.find({ status }).toArray();
      return users.map(user => new User(user));
    }
  
    static async create(userData) {
      const collection = context.services
        .get("mongodb-atlas")
        .db("myDatabase")
        .collection("users");
      
      const newUser = new User(userData);
      const result = await collection.insertOne(newUser);
      return { ...newUser, _id: result.insertedId };
    }
  }