
export function validarUsuario(req) {
  const { nome, email, senha } = req.body;

  if (!nome || typeof nome !== "string") {
    throw new Error("Nome está inválido");
    
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new Error("Email está inválido");
  }

  if (!senha || typeof senha !== "string" || senha.length < 4) {
    throw new Error("Senha inválida");
  }
}

export function validarLogin(req){
 const { email, senha } = req.body;

    if (!email || !senha) throw new Error("Email e senha são obrigatórios");
}