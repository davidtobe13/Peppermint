// UserController.js
class UserController {
    static async getUsersByStatus(request) {
      try {
        const { status } = request.query;
        const users = await User.findByStatus(status);
        return {
          statusCode: 200,
          body: { success: true, users }
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: { success: false, error: error.message }
        };
      }
    }
  
    static async createUser(request) {
      try {
        const userData = JSON.parse(request.body.text());
        
        // Validate user data
        const validation = UserValidator.validate(userData);
        if (!validation.isValid) {
          return {
            statusCode: 400,
            body: { success: false, errors: validation.errors }
          };
        }
  
        // Create user
        const newUser = await User.create(userData);
        console.log(userData + "The new user was created");
        
        
        return {
          statusCode: 201,
          body: { success: true, user: newUser }

        };
      } catch (error) {
        return {
          statusCode: 500,
          body: { success: false, error: error.message }
        };
      }
    }
  }