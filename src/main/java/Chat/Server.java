package Chat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server implements Runnable{
    private Map<String, List<ConnectionHandler>> idToConnections;
    private ServerSocket server;
    private boolean done;
    private ExecutorService pool;

    public Server() {
        idToConnections = new HashMap<>();
        done = false;
    }

    @Override
    public void run() {
        try {
            server = new ServerSocket(9999);
            pool = Executors.newCachedThreadPool();

            while (!done) {
                Socket clientSocket = server.accept();

                // Prompt the user to enter an ID
                PrintWriter idPrompt = new PrintWriter(clientSocket.getOutputStream(), true);
                idPrompt.println("ENTER ID");
                String id = new BufferedReader(new InputStreamReader(clientSocket.getInputStream())).readLine();

                // Create a new ConnectionHandler with the provided ID
                ConnectionHandler handler = new ConnectionHandler(clientSocket, this, id);
                idToConnections.putIfAbsent(id, new ArrayList<>());
                List<ConnectionHandler> connections = idToConnections.get(id);
                connections.add(handler);

                pool.execute(handler);
            }
        } catch (Exception e) {
            shutdown();
        }
    }

    public void broadcast(String message, String senderId) {
        List<ConnectionHandler> connections = idToConnections.get(senderId);
        if (connections != null) {
            for (ConnectionHandler ch : connections) {
                if (ch != null)
                    ch.sendMassage(message);
            }
        }
    }

    public void disconnectUser(String id, ConnectionHandler handler) {
        List<ConnectionHandler> connections = idToConnections.get(id);
        if (connections != null) {
            connections.remove(handler);
            if (connections.isEmpty()) {
                idToConnections.remove(id);
            }
        }
    }

    public void shutdown() {
        try {
            done = true;
            pool.shutdown();
            if (!server.isClosed()) {
                server.close();
            }
            for (List<ConnectionHandler> connections : idToConnections.values()) {
                for (ConnectionHandler ch : connections) {
                    ch.shutdown();
                }
            }
        } catch (IOException e) {
            // ignore
        }
    }

    public static void main(String[] args) {
        Server server = new Server();
        Thread serverThread = new Thread(server);
        serverThread.start();
    }
}

class ConnectionHandler implements Runnable {

    private Socket client;
    private BufferedReader in;
    private PrintWriter out;
    private String id;
    private Server server;

    public ConnectionHandler(Socket client, Server server, String id) {
        this.client = client;
        this.server = server;
        this.id = id;
    }

    @Override
    public void run() {
        try {
            out = new PrintWriter(client.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));

            String message;
            while ((message = in.readLine()) != null) {
                if (message.startsWith("/quit")) {
                    server.disconnectUser(id, this);
                    server.broadcast(id + " left the chat!", id);
                    shutdown();
                } else {
                    server.broadcast(id + ": " + message, id);
                }
            }
        } catch (IOException e) {
            shutdown();
        }
    }

    public void sendMassage(String message) {
        out.println(message);
    }

    public void shutdown() {
        try {
            in.close();
            out.close();
            if (!client.isClosed()) {
                client.close();
            }
        } catch (IOException e) {
            // ignore
        }
    }
}