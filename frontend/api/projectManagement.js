export async function listFiles(projectId){
  const res = await apiFetch(`/project-management/files/project/${projectId}`);
  if(!res.ok){
    throw new Error('Failed to load files');
  }
  return res.json();
}

export async function uploadFile(projectId, file){
  const formData = new FormData();
  formData.append('file', file);
  const uploadRes = await fetch(`${window.env.FILE_IO_API}/`, { method: 'POST', body: formData });
  const uploadData = await uploadRes.json();
  if(!uploadRes.ok || !uploadData.success){
    throw new Error('File upload failed');
  }
  const body = { projectId, filename: file.name, url: uploadData.link };
  const res = await apiFetch('/project-management/files/upload', {
    method: 'POST',
    body: JSON.stringify(body)
  });
  if(!res.ok){
    const err = await res.json().catch(()=>({}));
    throw new Error(err.error || 'Failed to store file');
  }
  return res.json();
}

(function(global){
  global.projectManagementAPI = { listFiles, uploadFile };
})(window);
