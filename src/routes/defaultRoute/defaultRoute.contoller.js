const defaultRouteController = (req, res) => {
  return res.status(404).json({ error: 'Incorrect Route' });
};

module.exports = {
  defaultRouteController
};
