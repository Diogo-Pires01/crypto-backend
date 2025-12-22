const CryptoInvestment = require("../models/cryptoInvestment.model");

const CRYPTO_MAP = {
  BTC: "bitcoin",
  ETH: "ethereum",
  ADA: "cardano",
  SOL: "solana",
};

const cryptoInvestmentController = {
  // Criar novo investimento
  async create(req, res) {
    try {
      const { valor_investido, cripto, quantidade, preco_now } = req.body;

      if (!valor_investido || !cripto || !quantidade || !preco_now) {
        return res.status(400).json({ error: "Dados incompletos." });
      }

      const criptoNormalizada =
        CRYPTO_MAP[cripto.toUpperCase()] || cripto.toLowerCase();

      await CryptoInvestment.create({
        valor_investido,
        cripto: criptoNormalizada,
        quantidade,
        preco_now,
      });

      res.status(201).json({
        message: "Investimento registrado com sucesso!",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao salvar no banco." });
    }
  },

  // Buscar todos os investimentos
  async findAll(req, res) {
    try {
      const data = await CryptoInvestment.findAll();

      return res.status(200).json(data || []);
    } catch (err) {
      console.error("ERRO findAll:", err);

      return res.status(500).json({
        error: "Erro ao buscar investimentos",
        details: err.message,
      });
    }
  },

  // Buscar total investido
  async getTotalInvested(req, res) {
    try {
      const total = await CryptoInvestment.getTotalInvested();

      return res.status(200).json({ total });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Erro ao buscar total investido",
      });
    }
  },
};

module.exports = cryptoInvestmentController;
