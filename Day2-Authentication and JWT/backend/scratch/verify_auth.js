const runTests = async () => {
  const baseAuthUrl = 'http://127.0.0.1:5000/api/v1/auth';
  const baseInstUrl = 'http://127.0.0.1:5000/api/v1/institutes';

  console.log('\n--- 1. Testing Welcome Endpoint ---');
  try {
    const welcomeRes = await fetch('http://127.0.0.1:5000/');
    const welcomeData = await welcomeRes.json();
    console.log('Welcome response:', welcomeData);
  } catch (err) {
    console.error('Welcome failed:', err.message);
  }

  // Create an Institute first
  const instData = {
    instituteName: 'Day 2 Academy',
    instituteCode: 'DAY2ACADEMY',
    email: 'contact@day2.edu',
    phone: '1234567890',
    website: 'https://day2.edu',
    ownerName: 'Alice Vance',
    address: {
      country: 'USA',
      state: 'California',
      city: 'San Francisco',
      pincode: '94101',
      fullAddress: '789 Auth Ave'
    },
    logo: 'https://day2.edu/logo.png',
    status: 'active',
    subscriptionPlan: 'premium',
    maxStudents: 1000,
    maxTeachers: 100,
    subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  let instituteId;

  console.log('\n--- 2. Creating Institute (Unprotected) ---');
  const createInstRes = await fetch(baseInstUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(instData)
  });
  const createInstData = await createInstRes.json();
  console.log('Status:', createInstRes.status);
  console.log('Body:', createInstData);
  if (createInstData.success) {
    instituteId = createInstData.data._id;
  }

  console.log('\n--- 3. Trying to Update Institute Without Token ---');
  const updateNoTokenRes = await fetch(`${baseInstUrl}/${instituteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'suspended' })
  });
  const updateNoTokenData = await updateNoTokenRes.json();
  console.log('Status:', updateNoTokenRes.status);
  console.log('Body:', updateNoTokenData);

  console.log('\n--- 4. Registering Admin with Non-existent Institute ID ---');
  const setupAdminBadRes = await fetch(`${baseAuthUrl}/setup-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Super Admin',
      email: 'admin@day2.edu',
      password: 'password123',
      phone: '9999999999',
      institute: '660a1a8c9b2a1a001712a12a' // bad id
    })
  });
  const setupAdminBadData = await setupAdminBadRes.json();
  console.log('Status:', setupAdminBadRes.status);
  console.log('Body:', setupAdminBadData);

  console.log('\n--- 5. Registering Admin with Valid Institute ID ---');
  const setupAdminRes = await fetch(`${baseAuthUrl}/setup-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Super Admin',
      email: 'admin@day2.edu',
      password: 'password123',
      phone: '9999999999',
      institute: instituteId
    })
  });
  const setupAdminData = await setupAdminRes.json();
  console.log('Status:', setupAdminRes.status);
  console.log('Body:', setupAdminData);

  console.log('\n--- 6. Registering Admin with Duplicate Email ---');
  const setupAdminDupRes = await fetch(`${baseAuthUrl}/setup-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Another Admin',
      email: 'admin@day2.edu',
      password: 'password123',
      phone: '8888888888',
      institute: instituteId
    })
  });
  const setupAdminDupData = await setupAdminDupRes.json();
  console.log('Status:', setupAdminDupRes.status);
  console.log('Body:', setupAdminDupData);

  console.log('\n--- 7. Logging In with Bad Password ---');
  const loginBadRes = await fetch(`${baseAuthUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@day2.edu',
      password: 'wrongpassword'
    })
  });
  const loginBadData = await loginBadRes.json();
  console.log('Status:', loginBadRes.status);
  console.log('Body:', loginBadData);

  let token;

  console.log('\n--- 8. Logging In with Correct Credentials ---');
  const loginRes = await fetch(`${baseAuthUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@day2.edu',
      password: 'password123'
    })
  });
  const loginData = await loginRes.json();
  console.log('Status:', loginRes.status);
  console.log('Body:', loginData);
  if (loginData.success) {
    token = loginData.data.token;
  }

  console.log('\n--- 9. Accessing GET /me without token ---');
  const meNoTokenRes = await fetch(`${baseAuthUrl}/me`);
  const meNoTokenData = await meNoTokenRes.json();
  console.log('Status:', meNoTokenRes.status);
  console.log('Body:', meNoTokenData);

  console.log('\n--- 10. Accessing GET /me with invalid token ---');
  const meBadTokenRes = await fetch(`${baseAuthUrl}/me`, {
    headers: { 'Authorization': 'Bearer bad_token_here' }
  });
  const meBadTokenData = await meBadTokenRes.json();
  console.log('Status:', meBadTokenRes.status);
  console.log('Body:', meBadTokenData);

  console.log('\n--- 11. Accessing GET /me with valid token ---');
  const meRes = await fetch(`${baseAuthUrl}/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const meData = await meRes.json();
  console.log('Status:', meRes.status);
  console.log('Body:', meData);

  console.log('\n--- 12. Updating Institute with Valid Token ---');
  const updateRes = await fetch(`${baseInstUrl}/${instituteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status: 'suspended' })
  });
  const updateData = await updateRes.json();
  console.log('Status:', updateRes.status);
  console.log('Body:', updateData);

  console.log('\n--- 13. Deleting Institute with Valid Token ---');
  const deleteRes = await fetch(`${baseInstUrl}/${instituteId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const deleteData = await deleteRes.json();
  console.log('Status:', deleteRes.status);
  console.log('Body:', deleteData);
};

runTests();
