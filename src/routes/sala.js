import { Router } from "express";
import { criarSala } from "../controllers/SalaController.js";
import { entrarSala, aprovarUsuario } from "../controllers/SalaPermissaoController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.post("/sala", verificarToken, criarSala);
router.post("/sala/:sala/entrar", verificarToken, entrarSala);
router.post("/sala/:sala/aprovar/:usuario", verificarToken, aprovarUsuario);

export default router;
