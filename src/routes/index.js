// index.js
exports = async function(request) {
    switch(request.path) {
      case "/users/status":
        if (request.method === "GET") {
          return await UserController.getUsersByStatus(request);
        }
        break;
      
      case "/users":
        if (request.method === "POST") {
          return await UserController.createUser(request);
        }

        break;
      case "/products":
      if (request.method === "GET") {
        return await ProductController.getProducts(request);
      }
      if (request.method === "POST") {
        return await ProductController.createProduct(request);
      }
        break;
      
      default:
        return {
          statusCode: 404,
          body: { error: "Not found" }
        };
    }
  };