import apiClient from '../utils/apiClient.js';

export async function fetchModelPerformance(modelName) {
  const { data } = await apiClient.get('/ml/model-performance/evaluation', {
    params: { modelName },
  });
  return data;
}
