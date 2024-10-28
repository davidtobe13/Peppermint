// ProductController.js
class ProductController {
    static async getProducts(request) {
      try {
        const products = await Product.findAll();
        return {
          statusCode: 200,
          body: { success: true, products }
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: { success: false, error: error.message }
        };
      }
    }
  
    static async createProduct(request) {
      try {
        const productData = JSON.parse(request.body.text());
  
        // Validate product data
        const validation = ProductValidator.validate(productData);
        if (!validation.isValid) {
          return {
            statusCode: 400,
            body: { 
              success: false, 
              errors: validation.errors 
            }
          };
        }
  
        // Format price to 2 decimal places
        productData.price = Number(productData.price.toFixed(2));
  
        // Create product
        const newProduct = await Product.create({
          ...productData,
          createdAt: new Date()
        });
  
        return {
          statusCode: 201,
          body: { 
            success: true, 
            product: newProduct,
            message: 'Product created successfully'
          }
        };
      } catch (error) {
        console.error('Error creating product:', error);
        return {
          statusCode: 500,
          body: { 
            success: false, 
            error: 'Internal server error while creating product'
          }
        };
      }
    }
  }
  