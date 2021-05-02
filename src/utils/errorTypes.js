const errorTypes = {
    Error401: function(code, msg) { //no autorizado
        let err = Error.apply(this, [msg]);
        this.name = err.name = "Error401";
        this.msg = err.message;
        this.stack = err.stack;
        this.code = code;
        return this;
    },
    Error403: function(code, msg) { //prohibido
        let err = Error.apply(this, [msg]);
        this.name = err.name = "Error403";
        this.msg = err.message;
        this.stack = err.stack;
        this.code = code;
        return this;
    },
    Error404: function(code, msg) { //no encontrado
        let err = Error.apply(this, [msg]);
        this.name = err.name = "Error404";
        this.msg = err.message;
        this.stack = err.stack;
        this.code = code;
        return this;
    },
    Error500: function(code, msg) { //no encontrado
        let err = Error.apply(this, [msg]);
        this.name = err.name = "Error500";
        this.msg = err.message;
        this.stack = err.stack;
        this.code = code;
        return this;
    },
    InfoError: function(code, msg) { //todo ok, solo información
        let err = Error.apply(this, [msg]);
        this.name = err.name = "InfoError";
        this.msg = err.message;
        this.stack = err.stack;
        this.code = code;
        return this;
    },
    Error: function(code, msg) { //todo ok, solo información
        let err = Error.apply(this, [msg]);
        this.name = err.name = "Error";
        this.msg = err.message;
        this.stack = err.stack;
        this.code = code;
        return this;
    }
};

export default errorTypes;