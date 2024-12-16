const express = require('express');
const router = express.Router();
const Prestamo = require('../models/Prestamo');

// Crear un nuevo préstamo (POST)
router.post('/', async (req, res) => {
    try {
        // Verificar que la personaId y libroId están presentes
        if (!req.body.personaId || !req.body.libroId) {
            return res.status(400).json({ message: 'Se requiere personaId y libroId' });
        }

        const prestamo = new Prestamo(req.body);
        await prestamo.save();
        res.status(201).json(prestamo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer todos los préstamos activos (GET)
router.get('/', async (req, res) => {
    try {
        const prestamos = await Prestamo.find({ estado: 1 })
            .populate('personaId', 'nombre apellido')
            .populate('libroId', 'titulo');

        if (prestamos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron préstamos activos' });
        }

        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer un préstamo por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id)
            .populate('personaId', 'nombre apellido')
            .populate('libroId', 'titulo');
        
        if (!prestamo || prestamo.estado === 0) {
            return res.status(404).json({ message: 'Préstamo no encontrado o está inactivo' });
        }
        
        res.json(prestamo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un préstamo por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const prestamo = await Prestamo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        res.json(prestamo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar lógicamente un préstamo (cambiar estado a 0) (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const prestamo = await Prestamo.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });

        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        res.json({ message: 'Préstamo eliminado lógicamente', prestamo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
