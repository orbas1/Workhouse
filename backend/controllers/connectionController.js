const Connection = require('../models/connection');

exports.getConnections = (req, res) => {
  const { userId } = req.params;
  const list = Connection.getConnectionsByUser(userId);
  res.json(list);
};

exports.addConnection = (req, res) => {
  const { userId } = req.params;
  const connection = Connection.addConnection(userId, req.body);
  res.status(201).json(connection);
};

exports.updateConnection = (req, res) => {
  const { id } = req.params;
  const updated = Connection.updateConnection(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Connection not found' });
  }
  res.json(updated);
};

