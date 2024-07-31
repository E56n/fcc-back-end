// Importar el módulo express
const express = require('express');
const app = express();
const path = require('path'); // Importar el módulo path

// Importar y configurar dotenv
require('dotenv').config();

// Middleware de registro de solicitudes
function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

// Montar el middleware de registro
app.use(logger);

// Configurar el middleware para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

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

// Hacer que la aplicación escuche en un puerto
const port = 3000; // Puedes usar cualquier puerto disponible
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
