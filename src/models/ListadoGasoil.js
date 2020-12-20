const mongoose = require('mongoose');

const gasoilSchema = mongoose.Schema({
    delegacion: {
        type: String,
        require: true
    },

    numerolinea: {
        type: String,
        require: true,
        unique: true
    },

    deposito: {
        type: String,
        require: true
    },

    fecha: {
        type: String,
        require: true
    },

    hora: {
        type: String,
        requiere: true
    },

    matricula: {
        type: String,
        require: true
    },

    surtidor: {
        type: String,
        require: true
    },

    litros: {
        type: Number,
        require: true
    }
})

gasoilSchema.pre('save', async function (next) {
    const listadoGasoil = this;
    listadoGasoil.save();
    next();
})

gasoilSchema.static.findByFecha = async (fecha) => {
    const listadoGasoil = await ListadoGasoil.findOne({fecha});
    return listadoGasoil;
}

gasoilSchema.static.findHora = async (delegacion) => {
    const listadoGasoil = await ListadoGasoil.findOne({delegacion});
    return listadoGasoil;
}

const ListadoGasoil = mongoose.model('ListadoGasoil', gasoilSchema);

module.exports = ListadoGasoil;