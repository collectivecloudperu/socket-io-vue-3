// Soporte para require como module
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Importamos express para crear un servidor 
import express from "express";
const app = express();
const http = require('http');
const server = http.createServer(app);

// Importamos socket.io al servidor
// Le configuramos CORS
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Escuchamos el evento connection
io.on('connection', (socket) => {
  
  console.log('Usuario conectado');
  
  // Escuchamos el evento disconnect
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');    
  });

  // Escuchamos el evento chat message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(msg);   
  });   

});

// Iniciamos el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor funcionando en el puerto 3000');
});