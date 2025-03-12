# Databunkerpro JavaScript Client

A JavaScript client library for interacting with the Databunkerpro API.

## Installation

```bash
npm install databunkerpro-js
```

## Usage

### CommonJS
```javascript
const DatabunkerproAPI = require('databunkerpro-js');

const client = new DatabunkerproAPI('https://your-databunker-instance.com', 'your-token');
```

### ES Modules
```javascript
import DatabunkerproAPI from 'databunkerpro-js';

const client = new DatabunkerproAPI('https://your-databunker-instance.com', 'your-token');
```

## Examples

### Creating a User
```javascript
const profile = {
  email: "user@example.com",
  name: "John Doe"
};

const options = {
  groupname: "users",
  rolename: "basic-user"
};

const requestMetadata = {
  source: "web-signup",
  ip_address: "192.168.1.1",
  user_agent: "Mozilla/5.0"
};

try {
  const result = await client.createUser(profile, options, requestMetadata);
  console.log(result);
} catch (error) {
  console.error(error);
}
```

### Adding User to Group
```javascript
const requestMetadata = {
  approver: "admin@example.com",
  reason: "Role promotion"
};

// Using group name
await client.addUserToGroup("admins", "email", "user@example.com", "editor", requestMetadata);

// Using group ID
await client.addUserToGroup(123, "email", "user@example.com", 456, requestMetadata);
```

### Using Request Metadata for Context-Aware Access Control
```javascript
// Example of using request metadata for policy validation
const requestMetadata = {
  location: "HQ Office",
  device_type: "company_laptop",
  access_time: "2024-03-15T09:00:00Z"
};

// Fetch user data with context
const userData = await client.getUser("email", "user@example.com", requestMetadata);

// Update user profile with context
const updateResult = await client.updateUser(
  "email",
  "user@example.com",
  { department: "Sales" },
  requestMetadata
);
```

## API Reference

The library provides methods for interacting with all Databunkerpro endpoints:

- User Management
- App Data Management
- Agreement Management
- Group Management
- Token Management
- Audit Management
- Tenant Management
- Role Management
- Policy Management

For detailed API documentation, please visit our [API Documentation](https://databunker.com/docs).

## License

MIT
