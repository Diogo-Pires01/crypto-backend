const CryptoData = require("../models/cryptoData.model");
const {
  fetchCryptoDataAndSave,
  getHistory,
} = require("../services/cryptoData.service");

module.exports = {
  async runFetchAndStore() {
    return await fetchCryptoDataAndSave();
  },

  async fetchAndStore(req, res) {
    try {
      const data = await fetchCryptoDataAndSave();

      res.status(201).json({
        message: "Dados buscados e salvos com sucesso!",
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar/salvar dados" });
    }
  },

  async getHistory(req, res) {
    try {
      const { coin } = req.params;
      const historico = await getHistory(coin);

      res.status(200).json(historico);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      res.status(500).json({ error: "Erro ao buscar histórico" });
    }
  },

  async findAll(req, res) {
    try {
      const rows = await CryptoData.findAll();
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getByCoin(req, res) {
    try {
      const { coin } = req.params;
      const result = await CryptoData.getByCoin(coin);

      res.status(200).json(result.reverse());
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await CryptoData.delete(id);

      res.json({ message: "Registro removido com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao remover registro" });
    }
  },

  async deleteAll(req, res) {
    try {
      await CryptoData.deleteAll();

      res.json({
        message: "Todos os registros foram deletados.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar registros" });
    }
  },
};

