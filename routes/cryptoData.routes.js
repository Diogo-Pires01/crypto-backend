const express = require("express");
const controller = require("../controllers/cryptoData.controller");

const router = express.Router();

router.get("/fetch", controller.fetchAndStore); // Buscar e armazenar dados das criptomoedas
router.get("/:coin", controller.getByCoin); 
router.get("/history/:coin", controller.getHistory); // Obter histórico
router.get("/", controller.findAll);

router.delete("/deleteAll", controller.deleteAll);
router.delete("/:id", controller.delete);

module.exports = router;
