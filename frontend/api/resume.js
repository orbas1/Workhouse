(function(global){
  async function uploadCv(file){
    const formData = new FormData();
    formData.append('cv', file);
    const res = await apiFetch('/resume/cv/upload', { method: 'POST', body: formData });
    if(!res.ok) throw new Error('Failed to upload CV');
    return res.json();
  }

  async function generateCv(prompt){
    const res = await apiFetch('/resume/cv/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    if(!res.ok) throw new Error('Failed to generate CV');
    return res.json();
  }

  async function uploadCoverLetter(file){
    const formData = new FormData();
    formData.append('coverLetter', file);
    const res = await apiFetch('/resume/cover-letter/upload', { method: 'POST', body: formData });
    if(!res.ok) throw new Error('Failed to upload cover letter');
    return res.json();
  }

  async function generateCoverLetter(prompt){
    const res = await apiFetch('/resume/cover-letter/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    if(!res.ok) throw new Error('Failed to generate cover letter');
    return res.json();
  }

  global.resumeAPI = { uploadCv, generateCv, uploadCoverLetter, generateCoverLetter };
})(window);
