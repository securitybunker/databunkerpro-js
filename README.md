# Databunkerpro JavaScript Client

A JavaScript client library for interacting with the Databunkerpro API.

## Installation

```bash
npm install databunkerpro-js
```

## Quickstart

You need a Databunker Pro instance to talk to. Demo mode gives you one in a single command — no database, no configuration, everything held in memory:

```bash
docker run -p 3000:3000 -d --rm --name databunkerpro securitybunker/databunkerpro demo
```

Check that it came up:

```bash
docker logs databunkerpro
```

```
 Databunker Pro demo is ready
  Web UI:            http://localhost:3000/
  Root access token: DEMO
  Database:          in-memory, erased on restart
```

The root access token in demo mode is the fixed string `DEMO`. Save this as `quickstart.js`:

```javascript
const { DatabunkerproAPI } = require('databunkerpro-js');

const api = new DatabunkerproAPI('http://localhost:3000', 'DEMO');

async function main() {
  // Create a user record. The vault encrypts the profile and returns a user token.
  const created = await api.createUser({
    email: 'john@jstest.com',
    name: 'John Doe',
    phone: '+15551234567'
  });
  console.log('User token:', created.token);

  // Read the record back by any indexed field: token, login, email, phone, custom.
  const user = await api.getUser('email', 'john@jstest.com');
  console.log('Profile:', user.profile);

  // Store an encrypted file against that user, tagged by document type.
  const file = await api.createFile(
    'email',
    'john@jstest.com',
    'passport.jpg',
    Buffer.from('fake passport scan bytes').toString('base64'),
    { tags: ['passport', 'kyc'] }
  );
  console.log('File uuid:', file.fileuuid, '| tags:', file.tags);

  // List the user's files, filtered by tag.
  const listing = await api.listUserFiles('email', 'john@jstest.com', 'kyc');
  console.log('Files tagged kyc:', listing.files.map(f => f.filename));

  // Fetch the file back. Content returns base64-encoded in filedata.
  const fetched = await api.getFile('email', 'john@jstest.com', {
    fileuuid: file.fileuuid
  });
  console.log('Decrypted:', Buffer.from(fetched.filedata, 'base64').toString());

  // Delete user record.
  await api.deleteUser('email', 'john@jstest.com');
  console.log('User deleted');
}

main().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
```

```bash
node quickstart.js
```

```
User token: 49e7c711-2c7d-9e99-2c9d-217a094e93e7
Profile: { email: 'john@jstest.com', name: 'John Doe', phone: '+15551234567' }
File uuid: cb8b6657-aef9-b54d-9beb-a99b8686fa66 | tags: [ 'kyc', 'passport' ]
Files tagged kyc: [ 'passport.jpg' ]
Decrypted: fake passport scan bytes
User deleted
```

Tags are lowercased, de-duplicated and sorted on write, which is why they come back in a different order than they were sent.

When you are done, stop the instance. It was started with `--rm`, so the container and its in-memory database are discarded:

```bash
docker stop databunkerpro
```

> **Demo mode is for evaluation only.** The database is in memory, the wrapping key is a fixed public value, and the root token is the well-known string `DEMO`. Never point it at real personal data. For a real deployment see the [installation guide](https://docs.databunker.org/pro/installation/docker-compose).

## Usage

### CommonJS
```javascript
const { DatabunkerproAPI } = require('databunkerpro-js');

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

Files can also be listed by tag across every user in the tenant, which needs a
bulk-unlock uuid first:

```javascript
const unlock = await client.bulkListUnlock();
const tagged = await client.bulkListFilesByTag(unlock.unlockuuid, "identity", 0, 100);
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
- File Storage
- Tokenization
- Legal Basis & Agreement Management
- Processing Activity Management
- Group Management
- Role & Policy Management
- Session Management
- Shared Records
- Bulk Operations
- Audit Management
- Tenant Management
- Authentication & Access Tokens
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