const fs = require('fs');
const path = require('path');
const Service = require('../models/service');
const Business = require('../models/business');

describe('serviceProviders routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/serviceProviders.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });

  test('should create a service with business and providers', () => {
    const business = Business.createBusiness({ ownerId: 'owner-1', name: 'Test Biz' });
    const service = Service.createService({
      sellerId: 'seller-1',
      title: 'Test Service',
      businessId: business.id,
      providerIds: ['prov-1'],
      commissionSplit: { provider: 70, business: 30 },
      serviceArea: [{ lat: 0, lng: 0 }],
    });
    expect(service.businessId).toBe(business.id);
    expect(service.providerIds).toContain('prov-1');
    expect(service.commissionSplit.provider).toBe(70);
    expect(Business.businesses.get(business.id).services).toContain(service.id);
  });
});
