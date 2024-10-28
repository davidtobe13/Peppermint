// UserValidator.js
class UserValidator {
    static schema = {
      required: ['email', 'name', 'status'],
      properties: {
        email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
        name: { type: 'string', minLength: 2 },
        status: { type: 'string', enum: ['active', 'inactive'] },
        age: { type: 'number', minimum: 0 }
      }
    };
  
    static validate(data) {
      const errors = [];
  
      // Check required fields
      this.schema.required.forEach(field => {
        if (!data[field]) {
          errors.push(`Missing required field: ${field}`);
        }
      });
  
      // Validate email format
      if (data.email && !data.email.match(this.schema.properties.email.pattern)) {
        errors.push('Invalid email format');
      }
  
      // Validate name length
      if (data.name && data.name.length < this.schema.properties.name.minLength) {
        errors.push('Name must be at least 2 characters long');
      }
  
      // Validate status
      if (data.status && !this.schema.properties.status.enum.includes(data.status)) {
        errors.push('Invalid status value');
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  }