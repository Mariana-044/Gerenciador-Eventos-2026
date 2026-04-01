router.post("/", async (req, res) => {
  try {
    const { id_login, id_local, id_responsavel, id_categoria, nome, descricao, localizacao, data_inicio, data_fim, capacidade_maxima, status, tipo_evento } = req.body;

    // Validar os campos obrigatórios
    if (!id_login || !id_local || !id_responsavel || !id_categoria || !nome || !descricao || !localizacao || !data_inicio || !data_fim || !capacidade_maxima || !status || !tipo_evento) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Inserir(INSERT) no banco
    const r = await pool.query(
      `INSERT INTO eventos (nome, descricao, data_inicio, data_fim, localizacao, capacidade_maxima, status, tipo_evento, id_login, id_local, id_responsavel, id_categoria)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [nome, descricao, data_inicio, data_fim, localizacao, capacidade_maxima, status, tipo_evento, id_login, id_local, id_responsavel, id_categoria]
    );

    return res.status(201).json(r.rows[0]);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});