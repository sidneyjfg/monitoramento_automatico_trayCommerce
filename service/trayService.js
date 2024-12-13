const trayService = require('../services/trayService');

const getOrders = async (req, res) => {
  try {
    const orders = await trayService.fetchOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
  }
};

module.exports = {
  getOrders,
};
