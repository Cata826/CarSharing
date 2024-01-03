package com.example.CarSharing.Chat;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class Server implements Runnable {
    private ArrayList<ConnectionHandler> connections;
    private ServerSocket server;
    private boolean done;
    private ExecutorService pool;

    public Server() {
        connections = new ArrayList<>();
        done = false;
    }

    @Override
    public void run() {
        try {
            server = new ServerSocket(9999);
            pool = Executors.newCachedThreadPool();
            while (!done) {
                Socket client = server.accept();
                ConnectionHandler handler = new ConnectionHandler(client);
                connections.add(handler);
                pool.execute(handler);
            }
        } catch (Exception e) {
            shutdown();
        }
    }

    public void broadcast(String message) {
        for (ConnectionHandler ch : connections) {
            if (ch != null)
                ch.sendMessage(message);
        }
    }

    public void shutdown() {
        done = true;
        pool.shutdown();
        try {
            if (!server.isClosed()) {
                server.close();
            }
            for (ConnectionHandler ch : connections) {
                if (ch != null) {
                    ch.shutdown();
                }
            }
        } catch (IOException e) {
            // Log and handle exception as necessary
        }
    }

    // Inner class for ConnectionHandler
    public class ConnectionHandler implements Runnable {
        private Socket client;
        // ... other fields like BufferedReader, PrintWriter, etc.

        public ConnectionHandler(Socket client) {
            this.client = client;
            // Initialize other fields
        }

        @Override
        public void run() {
            // Implement the logic for handling client connection
        }

        public void sendMessage(String message) {
            // Implement logic to send message to the client
        }

        public void shutdown() {
            // Close resources and shutdown logic for this handler
        }
    }
}
