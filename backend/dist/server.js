"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./presentation/router"));
const simulationService_1 = require("./infrastructure/simulationService");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Presentation Layer: Routes
app.use('/api', router_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// Infrastructure: Initialization
console.log("🚀 Initializing Ediya AX Strategic Command Center (V3 Industrial Scale)...");
simulationService_1.simulationService.initialize(30000, 20000);
console.log(`✅ Pre-cached 50,000+ strategic records.`);
// Real-time Event Loop (Simulation)
setInterval(() => {
    const newTrx = simulationService_1.simulationService.generateSalesData(1)[0];
    // Presentation Layer: Live WebSocket Updates
    io.emit('new_sales_event', newTrx);
    // Real-time logic for Logistics/Network can be triggered here
    // and encapsulated in their respective Application Use Cases.
}, 5000);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`📡 Decision Support Server running on port ${PORT}`);
});
