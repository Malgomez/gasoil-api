const mongoose = require('mongoose');

const matriculaSchema = mongoose.Schema({
    delegacion: {
        type: String,
        requiere: true
    },

    matricula: {
        type: String,
        require: true
    }
})

matriculaSchema.pre('save', async function (next) {
    const matricula = this;
    matricula.save();
    next();
})

matriculaSchema.static.findByMatricula = async (_matricula) => {
    const matricula = await matricula.findOne({_matricula});
    return matricula;
}

const Matricula = mongoose.model('Matricula', matriculaSchema);

module.exports = Matricula;