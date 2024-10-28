// ProductValidator.js
class ProductValidator {
    static schema = {
      required: ['name', 'price', 'description', 'stock'],
      properties: {
        name: { 
          type: 'string', 
          minLength: 2,
          maxLength: 100
        },
        description: { 
          type: 'string', 
          minLength: 10,
          maxLength: 1000
        },
        price: { 
          type: 'number', 
          minimum: 0.01,
          maximum: 1000000
        },
        stock: { 
          type: 'number', 
          minimum: 0,
          maximum: 999999
        },
        category: { 
          type: 'string', 
          enum: ['electronics', 'clothing', 'books', 'food', 'other']
        },
        tags: {
          type: 'array',
          maxItems: 10
        }
      }
    };
  
    static validate(data) {
      const errors = [];
  
      // Check required fields
      this.schema.required.forEach(field => {
        if (data[field] === undefined || data[field] === null) {
          errors.push(`Missing required field: ${field}`);
        }
      });
  
      // Validate name
      if (data.name) {
        if (data.name.length < this.schema.properties.name.minLength) {
          errors.push(`Name must be at least ${this.schema.properties.name.minLength} characters long`);
        }
        if (data.name.length > this.schema.properties.name.maxLength) {
          errors.push(`Name must be less than ${this.schema.properties.name.maxLength} characters`);
        }
      }
  
      // Validate description
      if (data.description) {
        if (data.description.length < this.schema.properties.description.minLength) {
          errors.push(`Description must be at least ${this.schema.properties.description.minLength} characters long`);
        }
        if (data.description.length > this.schema.properties.description.maxLength) {
          errors.push(`Description must be less than ${this.schema.properties.description.maxLength} characters`);
        }
      }
  
      // Validate price
      if (data.price !== undefined) {
        if (typeof data.price !== 'number') {
          errors.push('Price must be a number');
        } else {
          if (data.price < this.schema.properties.price.minimum) {
            errors.push(`Price must be at least ${this.schema.properties.price.minimum}`);
          }
          if (data.price > this.schema.properties.price.maximum) {
            errors.push(`Price must be less than ${this.schema.properties.price.maximum}`);
          }
        }
      }
  
      // Validate stock
      if (data.stock !== undefined) {
        if (!Number.isInteger(data.stock)) {
          errors.push('Stock must be a whole number');
        } else {
          if (data.stock < this.schema.properties.stock.minimum) {
            errors.push(`Stock cannot be negative`);
          }
          if (data.stock > this.schema.properties.stock.maximum) {
            errors.push(`Stock must be less than ${this.schema.properties.stock.maximum}`);
          }
        }
      }
  
      // Validate category if provided
      if (data.category && !this.schema.properties.category.enum.includes(data.category)) {
        errors.push(`Invalid category. Must be one of: ${this.schema.properties.category.enum.join(', ')}`);
      }
  
      // Validate tags if provided
      if (data.tags) {
        if (!Array.isArray(data.tags)) {
          errors.push('Tags must be an array');
        } else if (data.tags.length > this.schema.properties.tags.maxItems) {
          errors.push(`Cannot have more than ${this.schema.properties.tags.maxItems} tags`);
        }
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  }