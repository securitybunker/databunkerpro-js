# Databunker JavaScript Client

A JavaScript client library for interacting with the Databunker API. This library provides a simple and intuitive interface for managing user data, agreements, groups, and more in Databunker.

## Installation

```bash
npm install databunker-js
```

Or using yarn:
```bash
yarn add databunker-js
```

## Usage

### Node.js
```javascript
const DatabunkerAPI = require('databunker-js');

const api = new DatabunkerAPI('http://localhost:3000', 'your-root-token');

// Create a user
const newUser = await api.createUser({
  login: 'johndoe',
  email: 'john@example.com',
  phone: '+1234567890'
});
```

### Browser
```html
<script src="node_modules/databunker-js/lib/databunker-api.js"></script>
<script>
  const api = new DatabunkerAPI('http://localhost:3000', 'your-root-token');
  
  async function createUser() {
    const user = await api.createUser({
      login: 'johndoe',
      email: 'john@example.com'
    });
    console.log('User created:', user);
  }
</script>
```

## Features

- User Management
  - Create, read, update, and delete users
  - Manage user profiles
- App Data Management
  - Store and retrieve application-specific user data
- Agreement Management
  - Handle user agreements and consents
- Group Management
  - Create and manage user groups
  - Add users to groups with roles
- Token Management
  - Create access tokens
- Audit Management
  - Track user events
  - Retrieve audit logs

## API Reference

### User Management

#### createUser(profile)
Create a new user with the given profile.

```javascript
const user = await api.createUser({
  login: 'johndoe',
  email: 'john@example.com'
});
```

[View full API documentation](docs/API.md)

## Examples

Check out the [examples](examples/) directory for more usage examples.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [databunker-php](https://github.com/securitybunker/databunker-php) - PHP client for Databunker
- [databunker-python](https://github.com/securitybunker/databunker-python) - Python client for Databunker
