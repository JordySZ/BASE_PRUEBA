const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// 1. Almacenamiento (Crear)
router.post('/', async (req, res) => {
    try {
        const libro = new Libro(req.body);
        await libro.save();
        res.status(201).json(libro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Lectura (Leer)
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find({ estado: 1 }); // Solo activos
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Actualización (Actualizar)
router.put('/:_id', async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Eliminación Lógica
router.delete('/:id', async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params._id, { estado: 0 }, { new: true });
        res.json({ message: 'Libro eliminado lógicamente', libro });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Obtener un libro por _id
router.get('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);  // Buscar por _id
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json(libro);  // Responder con el libro encontrado
    } catch (error) {
        res.status(500).json({ message: error.message });  // En caso de error
    }
});
module.exports = router;
