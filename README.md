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

try {
  const result = await client.createUser(profile, options);
  console.log(result);
} catch (error) {
  console.error(error);
}
```

### Adding User to Group
```javascript
// Using group name
await client.addUserToGroup("admins", "email", "user@example.com", "editor");

// Using group ID
await client.addUserToGroup(123, "email", "user@example.com", 456);
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
