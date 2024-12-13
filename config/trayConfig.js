require('dotenv').config();

module.exports = {
  baseUrl: process.env.TRAY_API_BASE_URL || 'https://api.traycommerce.com.br/v1',
  apiToken: process.env.TRAY_API_TOKEN || '',
};
