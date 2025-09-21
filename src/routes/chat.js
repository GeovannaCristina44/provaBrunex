import { Router } from "express";
import { enviarMensagem, listarMensagens } from "../controllers/ChatController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.post("/chat/:sala", verificarToken, enviarMensagem);
router.get("/chat/:sala", verificarToken, listarMensagens);

export default router;
