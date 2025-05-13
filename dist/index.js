"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const pingServers = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const service of GlobalBackend) {
        try {
            yield (0, axios_1.default)({
                method: service.method,
                url: service.url
            });
            console.log(`[${new Date().toISOString()}] Pinged ${service.name} successfully`);
        }
        catch (error) {
            console.error(`[${new Date().toISOString()}] Error pinging ${service.name}:`, error);
        }
    }
});
// Call immediately and schedule every 10 minutes
pingServers();
setInterval(pingServers, 10 * 60 * 1000);
// Minimal HTTP server to show keep-alive
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Keep-alive ping service running.');
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
