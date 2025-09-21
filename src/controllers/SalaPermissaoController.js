import conexao from "../db/connection.js";

export async function entrarSala(req, res) {
  const usuarioLogadoId = req.user?.id; 
  const salaId = Number(req.params.sala); 


  if (!salaId) return res.status(400).json({ erro: "ID da sala inválido" });


  const [salas] = await conexao.execute("SELECT id FROM sala WHERE id = ?", [salaId]);
  if (salas.length === 0) return res.status(404).json({ erro: "Sala não encontrada" });

 
  const [existe] = await conexao.execute(
    "SELECT id FROM salaPermissao WHERE sala_id = ? AND usuario_id = ?",
    [salaId, usuarioLogadoId]
  );

  await conexao.execute(
    "INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) VALUES (?, ?, FALSE)",
    [salaId, usuarioLogadoId]
  );

  res.status(201).json({ mensagem: "Solicitação enviada" });
}
//aprovar
export async function aprovarUsuario(req, res) {
  const usuarioLogadoId = req.user?.id; 
  const salaId = Number(req.params.sala); 
  const usuarioId = Number(req.params.usuario); 


  if (!salaId || !usuarioId) return res.status(400).json({ erro: "inválidos" });


  const [salas] = await conexao.execute("SELECT criador_id FROM sala WHERE id = ?", [salaId]);
  if (salas.length === 0) return res.status(404);

  const criadorId = salas[0].criador_id;

  if (criadorId !== usuarioLogadoId) return res.status(403).json({ erro: "só o criador pode aprovar" });

  const [aprovado] = await conexao.execute(
    "UPDATE salaPermissao SET aprovado = TRUE WHERE sala_id = ? AND usuario_id = ?",
    [salaId, usuarioId]
  );

  res.json({ mensagem: "Usuário aprovado" });
}
