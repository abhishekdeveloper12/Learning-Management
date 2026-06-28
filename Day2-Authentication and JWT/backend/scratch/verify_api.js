const runTests = async () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1/institutes';

  console.log('\n--- 1. Testing Welcome Endpoint ---');
  try {
    const welcomeRes = await fetch('http://127.0.0.1:5000/');
    const welcomeData = await welcomeRes.json();
    console.log('Welcome response:', welcomeData);
  } catch (err) {
    console.error('Welcome failed:', err.message);
  }

  const inst1 = {
    instituteName: 'Alpha Academy',
    instituteCode: 'ALPHA101',
    email: 'contact@alpha.edu',
    phone: '1234567890',
    website: 'https://alpha.edu',
    ownerName: 'John Doe',
    address: {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
      pincode: '90001',
      fullAddress: '123 Alpha St'
    },
    logo: 'https://alpha.edu/logo.png',
    status: 'active',
    subscriptionPlan: 'premium',
    maxStudents: 500,
    maxTeachers: 50,
    subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  const inst2 = {
    instituteName: 'Beta Institute',
    instituteCode: 'BETA202',
    email: 'info@beta.edu',
    phone: '0987654321',
    website: 'https://beta.edu',
    ownerName: 'Jane Smith',
    address: {
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      pincode: 'M5V 2T6',
      fullAddress: '456 Beta Ave'
    },
    logo: 'https://beta.edu/logo.png',
    status: 'active',
    subscriptionPlan: 'basic',
    maxStudents: 200,
    maxTeachers: 20,
    subscriptionExpiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
  };

  let id1, id2;

  console.log('\n--- 2. Creating Institute 1 (Alpha Academy) ---');
  const create1Res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inst1)
  });
  const create1Data = await create1Res.json();
  console.log('Status:', create1Res.status);
  console.log('Body:', create1Data);
  if (create1Data.success) {
    id1 = create1Data.data._id;
  }

  console.log('\n--- 3. Creating Duplicate Institute Code ---');
  const dupeCodeRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...inst2,
      instituteCode: 'ALPHA101' // duplicate code
    })
  });
  const dupeCodeData = await dupeCodeRes.json();
  console.log('Status:', dupeCodeRes.status);
  console.log('Body:', dupeCodeData);

  console.log('\n--- 4. Creating Duplicate Email ---');
  const dupeEmailRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...inst2,
      email: 'contact@alpha.edu' // duplicate email
    })
  });
  const dupeEmailData = await dupeEmailRes.json();
  console.log('Status:', dupeEmailRes.status);
  console.log('Body:', dupeEmailData);

  console.log('\n--- 5. Creating Institute 2 (Beta Institute) ---');
  const create2Res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inst2)
  });
  const create2Data = await create2Res.json();
  console.log('Status:', create2Res.status);
  console.log('Body:', create2Data);
  if (create2Data.success) {
    id2 = create2Data.data._id;
  }

  console.log('\n--- 6. Get All Institutes ---');
  const getAllRes = await fetch(baseUrl);
  const getAllData = await getAllRes.json();
  console.log('Status:', getAllRes.status);
  console.log('Count:', getAllData.data ? getAllData.data.length : 0);
  console.log('First Item Name:', getAllData.data && getAllData.data[0] ? getAllData.data[0].instituteName : 'N/A');

  console.log('\n--- 7. Get Single Institute (Alpha) ---');
  const getSingleRes = await fetch(`${baseUrl}/${id1}`);
  const getSingleData = await getSingleRes.json();
  console.log('Status:', getSingleRes.status);
  console.log('Name:', getSingleData.data ? getSingleData.data.instituteName : 'N/A');

  console.log('\n--- 8. Update Institute 1 (Change Status and Plan) ---');
  const updateRes = await fetch(`${baseUrl}/${id1}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'suspended', subscriptionPlan: 'free' })
  });
  const updateData = await updateRes.json();
  console.log('Status:', updateRes.status);
  console.log('Updated status:', updateData.data ? updateData.data.status : 'N/A');
  console.log('Updated plan:', updateData.data ? updateData.data.subscriptionPlan : 'N/A');

  console.log('\n--- 9. Try to Update Institute 2 to Duplicate Code ---');
  const updateDupeRes = await fetch(`${baseUrl}/${id2}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ instituteCode: 'ALPHA101' })
  });
  const updateDupeData = await updateDupeRes.json();
  console.log('Status:', updateDupeRes.status);
  console.log('Body:', updateDupeData);

  console.log('\n--- 10. Delete Both Institutes ---');
  const del1Res = await fetch(`${baseUrl}/${id1}`, { method: 'DELETE' });
  const del1Data = await del1Res.json();
  console.log('Delete 1 Status:', del1Res.status);
  console.log('Delete 1 Body:', del1Data);

  const del2Res = await fetch(`${baseUrl}/${id2}`, { method: 'DELETE' });
  const del2Data = await del2Res.json();
  console.log('Delete 2 Status:', del2Res.status);
  console.log('Delete 2 Body:', del2Data);

  console.log('\n--- 11. Verify Get Single (Deleted) returns 404 ---');
  const verifyGetRes = await fetch(`${baseUrl}/${id1}`);
  const verifyGetData = await verifyGetRes.json();
  console.log('Status:', verifyGetRes.status);
  console.log('Body:', verifyGetData);
};

runTests();
