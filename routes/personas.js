const express = require('express');
const router = express.Router();
const Persona = require('../models/Persona');

// Crear una nueva persona (POST)
router.post('/', async (req, res) => {
    try {
        // Verificar si los datos necesarios están en el cuerpo de la solicitud
        if (!req.body.nombre || !req.body.email) {
            return res.status(400).json({ message: 'Nombre y correo electrónico son necesarios' });
        }

        const persona = new Persona(req.body);
        await persona.save();
        res.status(201).json(persona);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer todas las personas activas (GET)
router.get('/', async (req, res) => {
    try {
        const personas = await Persona.find({ estado: 1 });

        if (personas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron personas activas' });
        }

        res.json(personas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Leer una persona por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id);

        if (!persona || persona.estado === 0) {
            return res.status(404).json({ message: 'Persona no encontrada o está inactiva' });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una persona por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!persona) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar lógicamente una persona (cambiar estado a 0) (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });

        if (!persona) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.json({ message: 'Persona eliminada lógicamente', persona });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
