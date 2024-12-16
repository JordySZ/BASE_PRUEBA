const mongoose = require('mongoose');

const VolumenSchema = new mongoose.Schema({
    id_volumen: { type: Number, required: true },
    deteriorado: { type: Boolean, required: true, default: false },
    estado: { type: String, default: 'disponible' }, // Estados: disponible, prestado, inactivo
});

module.exports = mongoose.model('Volumen', VolumenSchema);
