const supabase = require('../db/conn');

const CryptoInvestment = {
  async create(data) {
    const { error } = await supabase
      .from('cryptoinvestments')
      .insert([
        {
          valor_investido: data.valor_investido,
          cripto: data.cripto,
          qtd_comprada: data.quantidade,
          preco_compra: data.preco_now
        }
      ]);

    if (error) throw error;
  },

  async findAll() {
    const { data, error } = await supabase
      .from('cryptoinvestments')
      .select('*')
      .order('data_investimento', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTotalInvested() {
    const { data, error } = await supabase
      .from('cryptoinvestments')
      .select('valor_investido');

    if (error) throw error;

    const total = data.reduce(
      (sum, item) => sum + Number(item.valor_investido),
      0
    );

    return total;
  }
};

module.exports = CryptoInvestment;
