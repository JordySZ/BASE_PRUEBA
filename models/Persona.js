const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
    estado: { type: Number, default: 1 }, // Estado lógico: 1 (activo), 0 (inactivo)
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: Number,
    email: { type: String, unique: true }
  
});

module.exports = mongoose.model('Persona', PersonaSchema);