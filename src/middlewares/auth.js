import jwt from "jsonwebtoken";

const JWT_SECRET = "geolinda";

export function verificarToken(req, res, next) {
  
  const cabecaToken = req.headers["x-access-token"] || req.headers["autorização"];

  if (!cabecaToken) {
    return res.status(401).json({ erro: "Token necessário" });
  }
  const token = cabecaToken.replace("Bearer", "");

  try {
    const usuario = jwt.ver(token, JWT_SECRET);

    req.user = usuario;
    next();

  } 
  catch (err) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}
