// UserTrigger.js
class UserTrigger {
    static async handleInsert(changeEvent) {
      const { fullDocument } = changeEvent;
      
      try {

        const userId = fullDocument._id; // Ensure this field exists

      if (!userId) {
        console.error('userId is undefined, aborting further processing.');
        return; // Prevent further actions if userId is undefined
      }
        // Update the user document with timestamps
        const collection = context.services
          .get("mongodb-atlas")
          .db("myDatabase")
          .collection("users");
        
        await collection.updateOne(
          { _id: fullDocument._id },
          {
            $set: {
              lastModified: new Date()
            }
          }
        );
  
        // Create log entry
        await UserLog.create({
          userId,
          operation: 'insert',
          details: fullDocument
        });

        console.log('Full Document:', fullDocument);

  
      } catch (error) {
        console.error('Trigger error:', error);
        throw error;
      }
    }
  }