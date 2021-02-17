import errorTypes from "../../utils/errorTypes";
import services from "../../axios/index";
import bcrypt from "bcrypt";

class Usuario {
    async addUsuario(req, res) {
        try {
            let rpta;
            let body = req.body
            const data = {
                documento: body.documento,
                nombre: body.nombre,
                apellidoPaterno: body.apellidoPaterno,
                apellidoMaterno: body.apellidoMaterno,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                role: body.role
            };

            await services(
                    process.env.LB_CENTRAL,
                    `/lb/central/registrarUsuario`,
                    data,
                    'POST'
                ).then(r => {
                    console.log('res', r);
                    if (r.codRes = '00') {
                        rpta = r;
                    } else {
                        rpta = r;
                    }
                })
                .catch(e => {
                    console.log('El error', e);
                    rpta = { codRes: '99', message: 'Error Interno' }
                })
            res.json(rpta)
        } catch (error) {
            console.log('TRY CATCH', error);
            res.json({ codRes: '99', message: 'Error Interno (TRY CATCH)' })
            throw new errorTypes.Error500('500', error)
        }
    }
}

export default new Usuario;