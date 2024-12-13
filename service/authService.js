const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const authService = {
  async generateToken() {
    try {
      const response = await axios.post(`${process.env.API_ADDRESS}/auth`, {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        code: process.env.AUTH_CODE,
      });

      console.log('Token gerado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.data.error) {
          case 1000:
            throw new Error('Loja ativa com o token expirado');
          case 1001:
            throw new Error('Loja bloqueada');
          case 1002:
            throw new Error('Loja inativa');
          case 1003:
            throw new Error('Loja cancelada');
          case 1099:
            throw new Error('Erro desconhecido ao gerar o token');
          default:
            throw new Error(`Erro desconhecido: ${error.response.data.error}`);
        }
      } else {
        throw new Error(`Erro ao conectar com o servidor: ${error.message}`);
      }
    }
  },

  async refreshToken() {
    try {
      const response = await axios.get(`${process.env.API_ADDRESS}/auth`, {
        params: {
          refresh_token: process.env.REFRESH_TOKEN,
        },
      });

      console.log('Chave de acesso atualizada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.data.error) {
          case 1000:
            throw new Error('Loja ativa com o token expirado');
          case 1001:
            throw new Error('Loja bloqueada');
          case 1002:
            throw new Error('Loja inativa');
          case 1003:
            throw new Error('Loja cancelada');
          case 1099:
            throw new Error('Erro desconhecido ao atualizar a chave de acesso');
          default:
            throw new Error(`Erro desconhecido: ${error.response.data.error}`);
        }
      } else {
        throw new Error(`Erro ao conectar com o servidor: ${error.message}`);
      }
    }
  },

  async refreshTokenIfNeeded() {
    try {
      console.log('Verificando necessidade de atualização do token...');
      // Lógica para verificar validade do token pode ser adicionada aqui
      // Caso seja necessário, chamar generateToken
      const tokenData = await this.generateToken();
      console.log('Token atualizado:', tokenData);
    } catch (error) {
      console.error('Erro ao atualizar o token:', error.message);
      throw error;
    }
  },
};

module.exports = authService;
