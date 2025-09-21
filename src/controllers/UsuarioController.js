import conexao from "../db/connection.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { validarUsuario, validarLogin } from "../validation/usuarioValidation.js";

function md5(senha) {
  return crypto.createHash("md5").update(senha).digest("hex");
}

const JWT_SECRET = "1234"; 

export async function criarUsuario(req, res) {
  try {
    validarUsuario(req);

    const { nome, email, senha } = req.body;

    const senhaMd5 = md5(senha);

  
    await conexao.execute(
      "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaMd5]
    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function login(req, res) {
  try {
    validarLogin(req);

    const { email, senha } = req.body;
    const senhaMd5 = md5(senha);

    const [rows] = await conexao.execute(
      "SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?",
      [email, senhaMd5]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const usuario = rows[0];
    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      JWT_SECRET
    );

    res.json({ token });
  } 
  catch (err) {
    res.status(400).json({ erro: err.message });
  }
}
