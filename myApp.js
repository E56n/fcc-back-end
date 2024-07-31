// Importar el módulo express
const express = require('express');
// Crear una aplicación express
const app = express();

// Configurar la ruta raíz
app.get('/', (req, res) => {
  res.send('Hello Express');
});

// Hacer que la aplicación escuche en un puerto
const port = 3000; // Puedes usar cualquier puerto disponible
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
