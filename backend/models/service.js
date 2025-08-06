const { randomUUID } = require('crypto');

// In-memory service store. In a production system this would be a database
// table with proper indexing and persistence. For demonstration purposes we
// seed it with a few example services.
const services = [
  {
    id: 'svc-1',
    sellerId: 'demo-seller',
    name: 'Legal Consultation',
    description: 'Connect with legal experts for startup advice.',
    price: 200,
    category: 'legal',
    tags: [],
    rating: 4.8,
    image: '/images/legal.jpg',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'svc-2',
    sellerId: 'demo-seller',
    name: 'Marketing Strategy',
    description: 'Professional marketing planning services.',
    price: 150,
    category: 'marketing',
    tags: [],
    rating: 4.6,
    image: '/images/marketing.jpg',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function createService({
  sellerId,
  title,
  description = '',
  price = 0,
  status = 'active',
  category = '',
  tags = [],
}) {
  const now = new Date();
  const service = {
    id: randomUUID(),
    sellerId,
    name: title,
    description,
    price,
    status,
    category,
    tags,
    rating: 0,
    image: '',
    createdAt: now,
    updatedAt: now,
  };
  services.push(service);
  return service;
}

function listServicesBySeller(sellerId) {
  return services.filter((s) => s.sellerId === sellerId);
}

function listAllServices(filters = {}) {
  const { search, category, minPrice, maxPrice } = filters;
  return services.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (category && s.category !== category) {
      return false;
    }
    if (minPrice !== undefined && s.price < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && s.price > maxPrice) {
      return false;
    }
    return true;
  });
}

function getServiceById(id) {
  return services.find((s) => s.id === id);
}

function updateService(id, updates) {
  const service = getServiceById(id);
  if (!service) return null;
  const now = new Date();
  const data = { ...updates };
  if (updates.title && !updates.name) {
    data.name = updates.title;
    delete data.title;
  }
  Object.assign(service, data, { updatedAt: now });
  return service;
}

function deleteService(id) {
  const index = services.findIndex((s) => s.id === id);
  if (index !== -1) {
    return services.splice(index, 1)[0];
  }
  return null;
}

const serviceRequests = new Map();

function createServiceRequest(userId, serviceId, description = '') {
  const id = randomUUID();
  const now = new Date();
  const request = { id, userId, serviceId, description, status: 'pending', createdAt: now };
  serviceRequests.set(id, request);
  return request;
}

module.exports = {
  services,
  createService,
  listServicesBySeller,
   listAllServices,
  getServiceById,
  updateService,
  deleteService,
   createServiceRequest,
};
