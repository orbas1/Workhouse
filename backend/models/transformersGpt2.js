const interactions = [];
let idCounter = 1;

function createInteraction({ userId, type, prompt, response }) {
  const interaction = {
    id: idCounter++,
    userId,
    type,
    prompt,
    response,
    createdAt: new Date(),
  };
  interactions.push(interaction);
  return interaction;
}

function getInteractionById(id) {
  return interactions.find(i => i.id === Number(id));
}

function listInteractionsByUser(userId) {
  return interactions.filter(i => i.userId === userId);
}

function deleteInteraction(id) {
  const index = interactions.findIndex(i => i.id === Number(id));
  if (index === -1) return false;
  interactions.splice(index, 1);
  return true;
}

module.exports = {
  createInteraction,
  getInteractionById,
  listInteractionsByUser,
  deleteInteraction,
};
