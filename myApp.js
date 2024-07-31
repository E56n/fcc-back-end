// Importar el módulo express
const express = require('express');
// Crear una aplicación express
const app = express();
const path = require('path'); // Importar el módulo path

// Configurar la ruta raíz
app.get('/', (req, res) => {
  // Construir la ruta absoluta del archivo
  const filePath = path.join(__dirname, 'views', 'index.html');
  // Enviar el archivo como respuesta
  res.sendFile(filePath);
});

// Hacer que la aplicación escuche en un puerto
const port = 3000; // Puedes usar cualquier puerto disponible
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
