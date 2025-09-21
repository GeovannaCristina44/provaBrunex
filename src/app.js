import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuario.js";
import salaRoutes from "./routes/sala.js";
import chatRoutes from "./routes/chat.js";
const Servidor = express();
Servidor.use(express.json());
dotenv.config();

Servidor.use(usuarioRoutes);
Servidor.use(salaRoutes);
Servidor.use(chatRoutes);

Servidor.get("/", (req, res) => res.json({ ok: true }));


const PORTA = process.env.PORTA;
Servidor.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
