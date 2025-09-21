import conexao from "../db/connection.js";

export async function criarSala(req, res) {
  const usuarioLogadoId = req.user?.id;
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: "Nome da sala é obrigatório" });

  const conexao2 = await conexao.getConnection();
  try {
    await conexao2.beginTransaction();
    const [result] = await conexao2.execute(
      "INSERT INTO sala (nome, criador_id) VALUES (?, ?)",
      [nome, usuarioLogadoId]
    );
    const salaId = result.insertId;

    await conexao2.execute(
      "INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) VALUES (?, ?, TRUE)",
      [salaId, usuarioLogadoId]
    );

    await conexao2.commit();
    res.status(201).json({ mensagem: "Sala criada", salaId });
  } 
  catch (err) {
    await conexao2.rollback();
    res.status(500).json({ erro: err.message });
  } 
  finally {
    conexao2.release();
  }
}
