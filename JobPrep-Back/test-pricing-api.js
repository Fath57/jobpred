const axios = require('axios');

const BASE_URL = 'http://localhost:3050';

async function testPricingAPI() {
  console.log('🧪 Testing Pricing API...\n');

  try {
    // Test 1: Get all options
    console.log('1. Testing GET /pricing/options');
    const optionsResponse = await axios.get(`${BASE_URL}/pricing/options`);
    console.log(`✅ Found ${optionsResponse.data.length} options`);
    console.log('Options:', optionsResponse.data.map(o => `${o.name} (${o.code}) - ${o.amount}€`));
    console.log('');

    // Test 2: Get all packs
    console.log('2. Testing GET /pricing/packs');
    const packsResponse = await axios.get(`${BASE_URL}/pricing/packs`);
    console.log(`✅ Found ${packsResponse.data.length} packs`);
    packsResponse.data.forEach(pack => {
      console.log(`📦 ${pack.name} (${pack.code}) - ${pack.amount}€`);
      console.log(`   Options: ${pack.packOptions.map(po => `${po.option.name} (x${po.quantity})`).join(', ')}`);
    });
    console.log('');

    // Test 3: Create a new option
    console.log('3. Testing POST /pricing/options');
    const newOption = {
      name: 'Test Option',
      description: 'This is a test option',
      amount: 35.0,
      code: 'TEST_OPTION'
    };

    try {
      const createOptionResponse = await axios.post(`${BASE_URL}/pricing/options`, newOption);
      console.log(`✅ Created option: ${createOptionResponse.data.name} (${createOptionResponse.data.id})`);

      // Test 4: Update the option
      console.log('4. Testing PATCH /pricing/options/:id');
      const updateOptionResponse = await axios.patch(
        `${BASE_URL}/pricing/options/${createOptionResponse.data.id}`,
        { amount: 40.0 }
      );
      console.log(`✅ Updated option amount to ${updateOptionResponse.data.amount}€`);

      // Test 5: Create a new pack
      console.log('5. Testing POST /pricing/packs');
      const newPack = {
        name: 'Test Pack',
        description: 'This is a test pack',
        amount: 80.0,
        code: 'TEST_PACK',
        options: [
          { optionId: createOptionResponse.data.id, quantity: 1 }
        ]
      };

      const createPackResponse = await axios.post(`${BASE_URL}/pricing/packs`, newPack);
      console.log(`✅ Created pack: ${createPackResponse.data.name} (${createPackResponse.data.id})`);

      // Test 6: Get pack by ID
      console.log('6. Testing GET /pricing/packs/:id');
      const packResponse = await axios.get(`${BASE_URL}/pricing/packs/${createPackResponse.data.id}`);
      console.log(`✅ Retrieved pack: ${packResponse.data.name}`);

      // Test 7: Add option to pack
      console.log('7. Testing POST /pricing/packs/:packId/options/:optionId');
      const firstOption = optionsResponse.data[0];
      await axios.post(
        `${BASE_URL}/pricing/packs/${createPackResponse.data.id}/options/${firstOption.id}`,
        { quantity: 2 }
      );
      console.log(`✅ Added option ${firstOption.name} to pack`);

      // Test 8: Get pack options
      console.log('8. Testing GET /pricing/packs/:id/options');
      const packOptionsResponse = await axios.get(`${BASE_URL}/pricing/packs/${createPackResponse.data.id}/options`);
      console.log(`✅ Pack has ${packOptionsResponse.data.length} options`);

      // Cleanup: Delete test data
      console.log('9. Cleaning up test data...');
      await axios.delete(`${BASE_URL}/pricing/packs/${createPackResponse.data.id}`);
      await axios.delete(`${BASE_URL}/pricing/options/${createOptionResponse.data.id}`);
      console.log('✅ Test data cleaned up');

    } catch (error) {
      if (error.response?.status === 404) {
        console.log('⚠️  Some endpoints returned 404 - API might not be running or database not connected');
      } else {
        console.error('❌ Error during test:', error.response?.data || error.message);
      }
    }

  } catch (error) {
    console.error('❌ Failed to connect to API:', error.message);
    console.log('💡 Make sure the server is running on port 9000');
  }
}

// Run the test
testPricingAPI();
