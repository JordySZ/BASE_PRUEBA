const express = require('express');
const Autor = require('../models/Autor');  // Importar el modelo de Autor
const router = express.Router();

// 1. Crear un nuevo autor (POST)
router.post('/', async (req, res) => {
    try {
        const autor = new Autor(req.body);  // Crear una instancia del autor con los datos enviados
        await autor.save();  // Guardar en la base de datos
        res.status(201).json(autor);  // Responder con el autor creado
    } catch (error) {
        res.status(500).json({ message: error.message });  // Responder en caso de error
    }
});

// 2. Obtener todos los autores (GET)
router.get('/', async (req, res) => {
    try {
        const autores = await Autor.find();  // Buscar todos los autores
        res.json(autores);  // Responder con la lista de autores
    } catch (error) {
        res.status(500).json({ message: error.message });  // Responder en caso de error
    }
});

// 3. Obtener un autor específico por id_autor (GET)
router.get('/:id', async (req, res) => {
    try {
        const autor = await Autor.findOne({ id_autor: req.params.id });  // Buscar por id_autor
        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });  // Si no se encuentra
        }
        res.json(autor);  // Responder con el autor encontrado
    } catch (error) {
        res.status(500).json({ message: error.message });  // Responder en caso de error
    }
});

// 4. Actualizar un autor por id_autor (PUT)
router.put('/:id', async (req, res) => {
    try {
        const autor = await Autor.findOneAndUpdate(
            { id_autor: req.params.id },  // Buscar por id_autor
            req.body,                     // Los datos para actualizar
            { new: true }                 // Devuelve el autor actualizado
        );
        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });  // Si no se encuentra
        }
        res.json(autor);  // Responder con el autor actualizado
    } catch (error) {
        res.status(500).json({ message: error.message });  // Responder en caso de error
    }
});

// 5. Eliminar un autor por id_autor (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const autor = await Autor.findOneAndDelete({ id_autor: req.params.id });  // Eliminar por id_autor
        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });  // Si no se encuentra
        }
        res.json({ message: 'Autor eliminado' });  // Responder con el mensaje de éxito
    } catch (error) {
        res.status(500).json({ message: error.message });  // Responder en caso de error
    }
});

// Exportar las rutas
module.exports = router;
