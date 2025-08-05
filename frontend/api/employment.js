(function(global){
  async function getOverview(){
    const res = await apiFetch('/api/analytics/employment/overview');
    if(!res.ok) throw new Error('Failed to load employment overview');
    return res.json();
  }
  async function getApplications(){
    const res = await apiFetch('/api/analytics/employment/applications');
    if(!res.ok) throw new Error('Failed to load application analytics');
    return res.json();
  }
  async function getJobs(){
    const res = await apiFetch('/api/analytics/employment/jobs');
    if(!res.ok) throw new Error('Failed to load jobs');
    return res.json();
  }
  async function getJob(jobId){
    const res = await apiFetch(`/api/analytics/employment/jobs/${jobId}`);
    if(!res.ok) throw new Error('Failed to load job analytics');
    return res.json();
  }
  global.employmentAPI = { getOverview, getApplications, getJobs, getJob };
})(window);
