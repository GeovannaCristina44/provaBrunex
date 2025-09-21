import conexao from "../db/connection.js";

async function Permissao(salaId, usuarioId) {
  const [rows] = await conexao.execute(
    "select id from salaPermissao where sala_id = ? and usuario_id = ? and aprovado = TRUE",
    [salaId, usuarioId]
  );
  return rows.length > 0;
}

export async function enviarMensagem(req, res) {
  const usuarioLogadoId = req.user?.id;
  const salaId = Number(req.params.sala);
  const { mensagem } = req.body;
  if (!mensagem) return res.status(400).json({ erro: "Mensagem vazia" });

  if (!await Permissao(salaId, usuarioLogadoId)) return res.status(403).json({ erro: "Sem permissão na sala" });

  await conexao.execute("INSERT INTO chat (usuario_id, sala_id, mensagem) VALUES (?, ?, ?)", [usuarioLogadoId, salaId, mensagem]);
  res.status(201).json({ mensagem: "Mensagem enviada" });
}

export async function listarMensagens(req, res) {
  const usuarioLogadoId = req.user?.id;
  const salaId = Number(req.params.sala);

  if (!await Permissao(salaId, usuarioLogadoId)) return res.status(403).json({ erro: "Sem permissão na sala" });

  const [rows] = await conexao.execute(
    `select chat.id, chat.usuario_id, usuario.nome, chat.mensagem, chat.criacao
       from chat
       inner join usuario ON chat.usuario_id = usuario.id
      where chat.sala_id = ?
      ORDER BY chat.criacao ASC`,
    [salaId]
  );

  res.json(rows);
}
