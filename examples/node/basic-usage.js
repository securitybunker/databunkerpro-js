const DatabunkerproAPI = require('../../lib/databunkerpro-api');

// Initialize the API client
const api = new DatabunkerproAPI(
  process.env.DATABUNKERPRO_URL || 'http://localhost:3000',
  process.env.DATABUNKERPRO_TOKEN || 'your-root-token'
);

async function basicUsageDemo() {
  try {
    // 1. User Management
    console.log('\n=== User Management ===');
    
    // Create a new user
    const newUser = await api.createUser({
      login: 'johndoe',
      email: 'john@example.com',
      phone: '+1289784890',
      name: 'John Doe',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    });
    console.log('Created user:', newUser);
    
    // Get user by login
    const userByLogin = await api.getUser('login', 'johndoe');
    console.log('Retrieved user by login:', userByLogin);
    
    // Get user by token
    const userByToken = await api.getUser('token', newUser.token);
    console.log('Retrieved user by token:', userByToken);

    // Update user profile
    const updatedUser = await api.updateUser('login', 'johndoe', {
      name: 'John M. Doe',
      title: 'Senior Developer'
    });
    console.log('Updated user:', updatedUser);

    // 2. Tenant Management
    console.log('\n=== Tenant Management ===');
    
    // Create a new tenant
    const newTenant = await api.createTenant({
      tenantname: 'acme-corp',
      email: 'admin@acme-corp.com',
      tenantorg: 'ACME Corporation'
    });
    console.log('Created tenant:', newTenant);
    
    // Get tenant information
    const tenantInfo = await api.getTenant(newTenant.tenantid);
    console.log('Retrieved tenant:', tenantInfo);

    // Rename tenant
    const renamedTenant = await api.renameTenant(newTenant.tenantid, 'acme-corp-new');
    console.log('Renamed tenant:', renamedTenant);

    // List all tenants
    const tenants = await api.listTenants();
    console.log('All tenants:', tenants);

    // 3. App Data Management
    console.log('\n=== App Data Management ===');
    
    // Store app-specific data
    const appData = await api.createAppData('login', 'johndoe', 'myapp', {
      preferences: {
        theme: 'dark',
        notifications: true,
        language: 'en'
      },
      lastLogin: new Date().toISOString(),
      deviceInfo: {
        platform: 'web',
        browser: 'chrome'
      }
    });
    console.log('Stored app data:', appData);

    // Retrieve app data
    const retrievedAppData = await api.getUserAppData('login', 'johndoe', 'myapp');
    console.log('Retrieved app data:', retrievedAppData);

    // List all apps
    const apps = await api.listAppNames();
    console.log('Available apps:', apps);

    // 4. Group Management
    console.log('\n=== Group Management ===');
    
    // Create a new group
    const group = await api.createGroup('engineering-team', 'Engineering Department');
    console.log('Created group:', group);

    // Add user to group with role
    const groupMembership = await api.addUserToGroup(
      group.groupid,
      'login',
      'johndoe',
      'team-lead'
    );
    console.log('Added user to group:', groupMembership);

    // List all groups
    const groups = await api.listAllGroups();
    console.log('All groups:', groups);

    // 5. Agreement Management
    console.log('\n=== Agreement Management ===');
    
    // Accept privacy policy agreement
    const agreement = await api.acceptAgreement(
      'login',
      'johndoe',
      'privacy-policy-v1',
      'web-form',
      'CONSENT-123'
    );
    console.log('Agreement accepted:', agreement);

    // List user's agreements
    const userAgreements = await api.listUserAgreements('login', 'johndoe');
    console.log('User agreements:', userAgreements);

    // 6. Audit & Security
    console.log('\n=== Audit & Security ===');
    
    // Create access token
    const accessToken = await api.createXToken('login', 'johndoe');
    console.log('Created access token:', accessToken);

    // List user events
    const auditEvents = await api.listUserEvents('login', 'johndoe');
    console.log('User audit events:', auditEvents);

    if (auditEvents.rows && auditEvents.rows.length > 0) {
      // Get specific audit event
      const eventDetails = await api.getAuditEvent(auditEvents.rows[0].auditeventuuid);
      console.log('Audit event details:', eventDetails);
    }

    // 7. Cleanup (Optional - uncomment if needed)
    // console.log('\n=== Cleanup ===');
    // const deleteResult = await api.deleteUser('login', 'johndoe');
    // console.log('User deleted:', deleteResult);

  } catch (error) {
    console.error('Error in demo:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
  }
}

// Run the demo
console.log('Starting Databunkerpro API Demo...');
basicUsageDemo()
  .then(() => console.log('\nDemo completed successfully!'))
  .catch(error => console.error('\nDemo failed:', error))
  .finally(() => console.log('Demo finished.'));
