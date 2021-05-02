import usuario2Router from './app/usuario2/router';
import usuarioRouter from './app/usuario/router';

const basePath = "/ms/v1"

const setRouter = (app) => {

    app.use(`${basePath}/usuario2`, usuario2Router);
    app.use(`${basePath}/usuario`, usuarioRouter);

}
export default setRouter;