const API_BASE_URL = window.API_BASE_URL || '/api';

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}

export function fetchProjects() {
  return apiFetch('/workspace/projects');
}

export function createProject(data) {
  return apiFetch('/workspace/projects/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateProject(projectId, data) {
  return apiFetch(`/workspace/projects/update/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteProject(projectId) {
  return apiFetch(`/workspace/projects/delete/${projectId}`, {
    method: 'DELETE',
  });
}

export function listFiles(projectId) {
  return request(`/project-management/files/project/${projectId}`);
  return apiFetch(`/workspace/files/project/${projectId}`);
}

export async function uploadFile(projectId, file) {
  const formData = new FormData();
  formData.append('file', file);

  const uploadRes = await fetch(`${window.env.FILE_IO_API}/`, {
    method: 'POST',
    body: formData,
  });
  const uploadData = await uploadRes.json();
  if (!uploadRes.ok || !uploadData.success) {
    throw new Error('File upload failed');
  }
  const body = { projectId, filename: file.name, url: uploadData.link };
  return request('/project-management/files/upload', {
    method: 'POST',
    body: JSON.stringify(body),
    throw new Error(uploadData.error || 'File upload failed');
  }

  return apiFetch('/workspace/files/upload', {
    method: 'POST',
    body: JSON.stringify({
      projectId,
      filename: file.name,
      url: uploadData.link,
    }),
  });
}

if (typeof window !== 'undefined') {
  window.projectManagementAPI = {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    listFiles,
    uploadFile,
  };
}

