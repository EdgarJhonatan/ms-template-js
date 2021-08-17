import { Router } from "express";
import usuarioCtrl from "./usuarioController";
const { validarJWT } = require("../../middlewares/validar-jwt");

const router = Router();

router.post(`/addUser`, usuarioCtrl.addUsuario);
router.post(`/login`, usuarioCtrl.loginUsuario);
router.get(`/listar`, usuarioCtrl.listarUsuario);
router.get(`/renew`, validarJWT, usuarioCtrl.revalidarToken);

export default router;
