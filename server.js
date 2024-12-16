const express = require('express');
const mongoose = require('mongoose');

// Inicializar la app (debe ir antes de app.use)
const app = express();

// Usar express.json() en lugar de body-parser
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ASD', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

// Importar rutas
const libroRoutes = require('./routes/libros');
const autorRoutes = require('./routes/autores');
const personaRoutes = require('./routes/personas');
const prestamo = require('./routes/préstamos');
const volumen = require('./routes/volumenes');

// Registrar rutas
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/prestamos',prestamo);
app.use('/api/volumenes', volumen);
// Ruta base
app.get('/', (req, res) => {
    res.send('API de Biblioteca');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
