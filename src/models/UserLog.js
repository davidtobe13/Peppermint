// UserLog.js
class UserLog {
    constructor(data) {
      this.userId = data.userId;
      this.operation = data.operation;
      this.timestamp = data.timestamp || new Date();
      this.details = data.details;
    }
  
    static async create(logData) {
      const collection = context.services
        .get("mongodb-atlas")
        .db("myDatabase")
        .collection("user_logs");
      
      const newLog = new UserLog(logData);
      await collection.insertOne(newLog);
      return newLog;
    }
  }