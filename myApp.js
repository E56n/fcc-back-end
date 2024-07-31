// Importar el módulo express
const express = require('express');
const app = express();
const path = require('path'); // Importar el módulo path
const mongoose = require('mongoose');

// Importar y configurar dotenv
require('dotenv').config();

// Importar el módulo body-parser
const bodyParser = require('body-parser');

// Middleware de registro de solicitudes
function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

// Montar el middleware de registro
app.use(logger);

// Configurar el middleware para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Configurar el middleware para parsear datos de formularios URL encoded
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar la ruta raíz para servir el archivo HTML
app.get('/', (req, res) => {
  // Construir la ruta absoluta del archivo
  const filePath = path.join(__dirname, 'views', 'index.html');
  // Enviar el archivo como respuesta
  res.sendFile(filePath);
});

// Configurar la ruta /json para servir JSON
app.get('/json', (req, res) => {
  // Crear el objeto JSON
  let jsonResponse = { "message": "Hello json" };
  // Modificar el mensaje basado en la variable de entorno
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    jsonResponse.message = jsonResponse.message.toUpperCase();
  }
  // Enviar el objeto JSON como respuesta
  res.json(jsonResponse);
});

// Configurar la ruta /now con middleware encadenado
app.get('/now', (req, res, next) => {
  // Añadir la hora actual al objeto de solicitud
  req.time = new Date().toString();
  // Pasar al siguiente middleware
  next();
}, (req, res) => {
  // Enviar la hora actual en formato JSON
  res.json({ time: req.time });
});

// Configurar la ruta /:word/echo para servir un JSON con el parámetro de ruta
app.get('/:word/echo', (req, res) => {
  // Obtener el parámetro de ruta
  const word = req.params.word;
  // Enviar el JSON con el parámetro de ruta
  res.json({ echo: word });
});

// Configurar la ruta /name para manejar GET y POST
app.route('/name')
  .get((req, res) => {
    // Extraer los parámetros de consulta
    const firstName = req.query.first;
    const lastName = req.query.last;
    // Enviar el JSON con el nombre completo
    res.json({ name: `${firstName} ${lastName}` });
  })
  .post((req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const firstName = req.body.first;
    const lastName = req.body.last;
    // Enviar el JSON con el nombre completo
    res.json({ name: `${firstName} ${lastName}` });
  });
//Importar moongoose
const mongoose = require('mongoose');

// Import and configure dotenv
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Hacer que la aplicación escuche en un puerto
const port = 3000; // Puedes usar cualquier puerto disponible
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
