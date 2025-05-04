import axios from "axios";

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

setInterval(pingServers, 10 * 60 * 1000);

pingServers();
