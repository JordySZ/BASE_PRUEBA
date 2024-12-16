const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
    isbn: String,
    editorial: String,
    año_escritura: Number,
    titulo: String,
    estado: { type: Number, default: 1 } // Estado lógico: 1 (activo), 0 (inactivo)
});
LibroSchema.index({ isbn: 1 });  // Índice para búsquedas rápidas por ISBN
LibroSchema.index({ editorial: 1 });  // Índice para búsquedas por editorial
LibroSchema.index({ estado: 1 });  // Índice para buscar libros activos o inactivos
module.exports = mongoose.model('Libro', LibroSchema);
