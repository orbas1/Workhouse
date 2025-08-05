(function(global){
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';

  async function listJobs(){
    const res = await fetch(`${baseUrl}/jobs`);
    if(!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  }

  async function getJob(jobId){
    const res = await fetch(`${baseUrl}/jobs/${jobId}`);
    if(!res.ok) throw new Error('Failed to fetch job');
    return res.json();
  }

  global.jobsAPI = { listJobs, getJob };
})(window);
