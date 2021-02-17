import { Router } from "express";
import usuarioCtrl from "./usuarioController";

const router = Router();

router.post(`/addUser`, usuarioCtrl.addUsuario);
//router.get(`/getUser/:documento`, usuarioCtrl.getUsuario);

export default router;