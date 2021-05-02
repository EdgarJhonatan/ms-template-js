class middlewares {
    notFoundHandler(req, res, next) {
        console.log("ejecutando middleware para manejo de endpoints no encontrados");
        return res.status(404).json({
            success: false,
            error: 'Url no encontrada',
            code: 'U001'
        })
    }
}

export default new middlewares;