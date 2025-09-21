import { Router } from "express";
import { criarUsuario, login } from "../controllers/UsuarioController.js";

const router = Router();
router.post("/usuario", criarUsuario);
router.post("/usuario/login", login);

export default router;
