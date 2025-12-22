const express = require("express");
const router = express.Router();
const controller = require("../controllers/cryptoInvestment.controller");

// ROTAS DE INVESTIMENTO
router.post("/", controller.create); // Criar investimento

router.get("/total", controller.getTotalInvested); // Total investido
router.get("/", controller.findAll); // Listar todos

module.exports = router;
