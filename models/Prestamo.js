const mongoose = require('mongoose');

const PrestamoSchema = new mongoose.Schema({
    personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
    libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: false },
    fecha_inicio: { type: Date, default: Date.now },
    fecha_devolucion: Date,
    estado: { type: Number, default: 1 } // Estado lógico: 1 (activo), 0 (inactivo)
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);
