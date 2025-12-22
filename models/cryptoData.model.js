const supabase = require("../db/conn");

const CryptoData = {
  async create(data) {
    const { error } = await supabase.from("cryptodata").insert([
      {
        nome: data.nome,
        symbol: data.symbol,
        preco: data.preco,
        variacao24h: data.variacao24h,
      },
    ]);

    if (error) throw error;
  },

  async getByCoin(coin) {
    const { data, error } = await supabase
      .from("cryptodata")
      .select("*")
      .eq("nome", coin)
      .order("data_registro", { ascending: false })
      .limit(4);

    if (error) throw error;
    return data;
  },

  async findAll() {
    const { data, error } = await supabase
      .from("cryptodata")
      .select("*")
      .order("data_registro", { ascending: false })
      .limit(4);

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from("cryptodata").delete().eq("id", id);

    if (error) throw error;
  },

  async deleteAll() {
    const { error } = await supabase.from("cryptodata").delete().neq("id", 0); 

    if (error) throw error;
  },

  async deleteOldest(limit) {
    const { data: oldest, error } = await supabase
      .from("cryptodata")
      .select("id")
      .order("data_registro", { ascending: true })
      .limit(limit);

    if (error) throw error;

    const ids = oldest.map((item) => item.id);

    const { error: deleteError } = await supabase
      .from("cryptodata")
      .delete()
      .in("id", ids);

    if (deleteError) throw deleteError;
  },
};

module.exports = CryptoData;
