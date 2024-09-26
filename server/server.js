const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling']
});

async function fetchImageUrls(text) {
    try {
        const response = await axios.post('https://1c28-34-142-169-171.ngrok-free.app/image-urls/', {
            text_paragraph: text
        });

        console.log("API Response:", response.data);

        const imageUrls = response.data;
        const imageArray = Object.values(imageUrls).flat();

        console.log("Loaded image URLs:", imageArray);
        return imageArray;
    } catch (error) {
        console.error("Error fetching image URLs:", error.message);
        return [];
    }
}

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join', (room) => {
        console.log(`Client ${socket.id} joined room: ${room}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);

        // If you want to actually join a room:
        // socket.join(room);
    });

    socket.on('hello', (name) => {
        console.log(`Client ${socket.id} said hello to ${name}`);
        socket.emit('hello', 'Hello from server!');
    });

    socket.on('transcript', async (text) => {
        console.log(`Received transcript from ${socket.id}: ${text}`);

        const imageArray = await fetchImageUrls(text);
        if (imageArray.length > 0) {
            const imageUrl = imageArray[Math.floor(Math.random() * imageArray.length)];
            socket.emit('image', imageArray);
            console.log(`Sent image URL to ${socket.id}: ${imageUrl}`);
        } else {
            console.log(`No images found for transcript from ${socket.id}`);
            socket.emit('image', null);
        }
    });

    socket.on('image', (imageUrl) => {
        console.log(`Received image from ${socket.id}: ${imageUrl}`);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Client ${socket.id} disconnected. Reason: ${reason}`);
    });
});

server.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});