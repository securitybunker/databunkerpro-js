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

// Using group name and role name
await client.addUserToGroup(
  "email",                // mode
  "user@example.com",     // identity
  "admins",              // groupname (string)
  "editor",              // rolename (optional)
  requestMetadata
);

// Using group ID and role ID
await client.addUserToGroup(
  "email",                // mode
  "user@example.com",     // identity
  123,                    // groupname (numeric ID)
  456,                    // rolename (numeric ID, optional)
  requestMetadata
);
```

### Managing Legal Basis and Agreements
```javascript
// Create a legal basis for data processing
const marketingConsent = await client.createLegalBasis({
  brief: 'marketing-consent',
  status: 'active',
  module: 'marketing',
  fulldesc: 'Consent for marketing communications',
  shortdesc: 'Marketing Consent',
  basistype: 'consent',
  requiredmsg: 'Required for receiving promotional content',
  requiredflag: false
});

// Record user's acceptance of an agreement
const acceptance = await client.acceptAgreement(
  'email',
  'user@example.com',
  {
    brief: 'marketing-consent',
    agreementmethod: 'web-form',
    referencecode: 'REF123',
    starttime: '1d',
    finaltime: '100d',
    status: 'active',
    lastmodifiedby: 'admin@company.com'
  }
);

// Cancel an agreement
await client.cancelAgreement('email', 'user@example.com', 'marketing-consent');

// Get user's agreement status
const agreement = await client.getUserAgreement('email', 'user@example.com', 'marketing-consent');

// List all user's agreements
const agreements = await client.listUserAgreements('email', 'user@example.com');
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

### Storing and Retrieving Files
```javascript
// Store an encrypted file against a user, with tags
const file = await client.createFile(
  "email",
  "user@example.com",
  "passport.pdf",
  base64Content,
  {
    mimetype: "application/pdf",
    tags: ["identity", "verified"],
    finaltime: "365d"
  }
);
console.log("Stored file:", file.fileuuid);

// List a user's files, optionally filtered by a single tag
const files = await client.listUserFiles("email", "user@example.com", "identity");

// Fetch a file by uuid, or by filename (newest match wins)
const stored = await client.getFile("email", "user@example.com", {
  fileuuid: file.fileuuid
});

// Download as a Blob, suitable for a browser download link
const blob = await client.downloadFile("email", "user@example.com", file.fileuuid);

// Replace the complete tag set on a file
await client.replaceFileTags("email", "user@example.com", file.fileuuid, ["archived"]);

await client.deleteFile("email", "user@example.com", file.fileuuid);
```

### System Operations
```javascript
// Get system statistics
const stats = await client.getSystemStats();
console.log('System stats:', stats);

// Generate wrapping key from three Shamir's Secret Sharing keys
const wrappingKeyResult = await client.generateWrappingKey(
  'shamir-key-1',
  'shamir-key-2',
  'shamir-key-3'
);
console.log('Generated wrapping key:', wrappingKeyResult.wrappingkey);

// Get system metrics (Prometheus format)
const metrics = await client.getSystemMetrics();
console.log('System metrics:', metrics);
```

## API Reference

The library provides methods for interacting with all Databunkerpro endpoints:

- User Management
- App Data Management
- Agreement Management (Legal Basis & Consent)
- File Storage
- Group Management
- Token Management
- Bulk Operations
- Session Management
- Shared Records
- Processing Activity Management
- Audit Management
- Tenant Management
- Role Management
- Policy Management
- System Operations

For detailed API documentation, please visit our [API Documentation](https://docs.databunker.org/pro/get-started/overview).

## Security

This library is scanned on every push and pull request, with a weekly scheduled sweep to catch drift:

- **SAST (Semgrep):** static analysis using the `p/typescript`, `p/javascript`, `p/secrets`, `p/security-audit`, and `p/owasp-top-ten` rulesets. A finding fails the check, and results are published to the repository's **Code Scanning** tab. See [`.github/workflows/semgrep.yml`](.github/workflows/semgrep.yml).
- **Supply-chain hardening:** every GitHub Action is pinned to a full commit SHA, so a mutable tag (`@v4`) cannot be silently repointed to malicious code.

Reproduce the SAST scan locally:

```bash
pip install semgrep
semgrep scan \
    --config p/typescript \
    --config p/javascript \
    --config p/secrets \
    --config p/security-audit \
    --config p/owasp-top-ten
```

To report a security vulnerability, please email hello@databunker.org rather than opening a public issue.

## License

MIT