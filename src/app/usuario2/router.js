import { Router } from "express";
import usuarioCtrl from "./usuario2Controller";

const router = Router();

router.post(`/addUser`, usuarioCtrl.addUsuario);
router.get(`/getUser/:documento`, usuarioCtrl.getUsuario);

export default router;