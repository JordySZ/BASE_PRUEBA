const express = require('express');
const router = express.Router();
const Volumen = require('../models/Volumen');

// Crear un nuevo volumen (POST)
router.post('/', async (req, res) => {
    try {
        // Validar la entrada
        if (!req.body.nombre || !req.body.descripcion) {
            return res.status(400).json({ message: 'Se requiere nombre y descripción del volumen' });
        }

        const volumen = new Volumen(req.body);
        await volumen.save();
        res.status(201).json(volumen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer todos los volúmenes (GET)
router.get('/', async (req, res) => {
    try {
        const volumenes = await Volumen.find();
        if (volumenes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron volúmenes' });
        }
        res.json(volumenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer un volumen por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const volumen = await Volumen.findById(req.params.id);
        if (!volumen) {
            return res.status(404).json({ message: 'Volumen no encontrado' });
        }
        res.json(volumen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un volumen por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const volumen = await Volumen.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!volumen) {
            return res.status(404).json({ message: 'Volumen no encontrado' });
        }
        res.json(volumen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un volumen (lógicamente) (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const volumen = await Volumen.findByIdAndUpdate(req.params.id, { estado: 'inactivo' }, { new: true });
        if (!volumen) {
            return res.status(404).json({ message: 'Volumen no encontrado' });
        }
        res.json({ message: 'Volumen eliminado lógicamente', volumen });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
