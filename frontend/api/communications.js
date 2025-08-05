(function(global){
  async function listConversations(category){
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await apiFetch(`/communications/messages/conversations${query}`);
    if(!res.ok) throw new Error('Failed to load conversations');
    return res.json();
  }

  async function getMessages(conversationId){
    const res = await apiFetch(`/communications/messages/conversation/${conversationId}`);
    if(!res.ok) throw new Error('Failed to load messages');
    return res.json();
  }

  async function sendMessage(data){
    const res = await apiFetch('/communications/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok){
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to send message');
    }
    return res.json();
  }

  global.communicationAPI = { listConversations, getMessages, sendMessage };
})(window);
