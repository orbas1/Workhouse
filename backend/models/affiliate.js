const { randomUUID } = require('crypto');

const affiliates = new Map();
const agreements = [];

function createAffiliate({ name, email, website }) {
  const id = randomUUID();
  const timestamp = new Date();
  const affiliate = {
    id,
    name,
    email,
    website: website || null,
    status: 'active',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  affiliates.set(id, affiliate);
  return affiliate;
}

function findById(id) {
  return affiliates.get(id);
}

function findByEmail(email) {
  for (const affiliate of affiliates.values()) {
    if (affiliate.email === email) return affiliate;
  }
  return null;
}

function updateAffiliate(id, updates) {
  const affiliate = affiliates.get(id);
  if (!affiliate) return null;
  Object.assign(affiliate, updates, { updatedAt: new Date() });
  affiliates.set(id, affiliate);
  return affiliate;
}

function recordAgreement(affiliateId, agreementVersion) {
  const record = {
    id: randomUUID(),
    affiliateId,
    agreementVersion,
    agreedAt: new Date(),
  };
  agreements.push(record);
  return record;
}

module.exports = {
  createAffiliate,
  findById,
  findByEmail,
  updateAffiliate,
  recordAgreement,
};
