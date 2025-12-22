// require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cryptoDataRoutes = require("./routes/cryptoData.routes");
const cryptoInvestmentRoutes = require("./routes/cryptoInvestment.routes");

const PORT = process.env.PORT || 3000;

const controller = require("./controllers/cryptoData.controller");

const app = express();

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_PASS);

app.use(cors());
app.use(express.json());

app.use("/cryptoData", cryptoDataRoutes);
app.use("/cryptoInvestments", cryptoInvestmentRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

setInterval(async () => {
  try {
    await controller.runFetchAndStore();
    console.log("Fetch automático executado!")
  } catch (err) {
    console.error("Erro no fetch automático:", err.message);
  }
}, 300000); 