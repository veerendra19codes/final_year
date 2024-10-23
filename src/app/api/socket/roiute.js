import { Server } from "socket.io";

let io;

export async function GET(request) {
    if (!io) {
        const server = request.socket.server;

        // Initialize the Socket.io server if it isn't already running
        io = new Server(server, {
            cors: {
                origin: "*", // Set your allowed origins
            },
        });

        io.on("connection", (socket) => {
            console.log(`Socket connected: ${socket.id}`);

            // Handle room joining
            socket.on("room:join", ({ email, room }) => {
                console.log(`${email} joined room ${room}`);
                socket.join(room);
                io.to(room).emit("user:joined", { email, id: socket.id });
            });

            // Handle calling
            socket.on("user:call", ({ to, offer }) => {
                io.to(to).emit("incoming:call", { from: socket.id, offer });
            });

            // Handle answering a call
            socket.on("call:accepted", ({ to, ans }) => {
                io.to(to).emit("call:accepted", { from: socket.id, ans });
            });

            socket.on("disconnect", () => {
                console.log(`Socket disconnected: ${socket.id}`);
            });
        });

        request.socket.server.io = io; // Attach the Socket.io server to the request
    }

    return new Response('Socket.io is set up', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
