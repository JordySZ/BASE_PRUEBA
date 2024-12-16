const mongoose = require('mongoose');

// Definir el esquema del Autor sin los campos innecesarios
const AutorSchema = new mongoose.Schema({
    id_autor: { type: Number, required: true },
    nombre: { type: String, required: true },
    estado: { type: Number, default: 1 } // Estado lógico: 1 (activo), 0 (inactivo)
});

// Crear un índice en el campo id_autor para optimizar las consultas
AutorSchema.index({ id_autor: 1 });  // Índice ascendente
AutorSchema.index({ estado: 1 });

// Exportar el modelo basado en el esquema
module.exports = mongoose.model('Autor', AutorSchema);
