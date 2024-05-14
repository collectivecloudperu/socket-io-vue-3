<template>

    <div id="app">
        
        <h1>Como Usar Socket IO con Vue 3</h1>
        
        <!-- Caja de texto del chat-->
        <input class="form-control mb-2 mr-sm-2" type="text" v-model="message" @keyup.enter="enviarMensaje">

        <!-- Botón para enviar el mensaje --> 
        <button class="btn btn-primary mb-2" @click="enviarMensaje">Enviar</button>

        <!-- Contenedor del chat -->
        <ul id="chat" class="list">
            <!-- Acá se muestran los mensajes del chat -->
        </ul>

    </div>

</template>

<script>

    // Cliente de Socket IO
    import io from 'socket.io-client';  

    // Ruta y puerto del servidor 
    const socket = io('http://localhost:3000'); 


    export default {
        
        data() {

            return {
                message: '', // Definimos 'message' 
                chat : document.getElementById('chat') // Seleccionamos el id del chat 
            };

        },
    
        methods: {

            // Método para enviar los mensajes en el chat 
            enviarMensaje() {

                // Verificamos que la caja de texto no este vacía y continuamos 
                if (this.message.trim() !== '') {
                
                    // Agregar el evento 'chat message' al socket
                    socket.emit('chat message', this.message);            

                    // Limpiamos la caja de texto 
                    this.message = '';

                    // Eliminar el evento 'chat message' del socket
                    socket.off('chat message');
                    
                    // Agregar el evento 'chat message' al socket
                    socket.on('chat message', (msg) => {
                        
                        console.log('Received message:', msg);
                        
                        // Agregar mensajes de los usuarios al chat 
                        const item = document.createElement("li");
                        item.classList.add("list-group-item");
                        item.textContent = msg;
                        chat.appendChild(item);
                        window.scrollTo(0, document.body.scrollHeight); 

                    }); 

                }
            }
        }
    };

</script>