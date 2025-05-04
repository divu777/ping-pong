import http from 'http';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GlobalBackend = [
    {
        name: "email-agent",
        url: "https://email-agent-axmq.onrender.com/api/v1/mail/startService",
        method: "post"
    },
    {
        name: "ecommerce",
        url: "https://ecommerce-hrrq.onrender.com/api/v1/product/get-product",
        method: "get"
    }
];

const pingServers = async () => {
    for (const service of GlobalBackend) {
        try {
            await axios({
                method: service.method,
                url: service.url
            });
            console.log(`[${new Date().toISOString()}] Pinged ${service.name} successfully`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error pinging ${service.name}:`, error);
        }
    }
};

// Call immediately and schedule every 10 minutes
pingServers();
setInterval(pingServers, 10 * 60 * 1000);

// Minimal HTTP server to show keep-alive
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Keep-alive ping service running.');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
