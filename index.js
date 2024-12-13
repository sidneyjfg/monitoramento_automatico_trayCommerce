const express = require('express');
const dotenv = require('dotenv');
const orderService = require('./services/orderService');
const authService = require('./services/authService');

// Configuração de variáveis de ambiente
dotenv.config();

// Inicialização do app
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Função principal para buscar e validar pedidos
const runAutomation = async () => {
  try {
    console.log('Iniciando automação de busca de pedidos...');

    // Atualiza o token se necessário
    await authService.refreshTokenIfNeeded();

    // Busca e valida os pedidos
    const orders = await orderService.fetchAndValidateOrders();

    console.log(`Total de pedidos processados: ${orders.length}`);
  } catch (error) {
    console.error('Erro durante a automação:', error.message);
  }
};

// Inicia o processo de automação ao iniciar o servidor
app.listen(0, async () => {
  console.log('Servidor iniciado. Executando automação de pedidos.');
  await runAutomation();
});
