import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './presentation/router';
import { simulationService } from './infrastructure/simulationService';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Presentation Layer: Routes
app.use('/api', router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Infrastructure: Initialization
console.log("🚀 Initializing Ediya AX Strategic Command Center (V3 Industrial Scale)...");
simulationService.initialize(30000, 20000);
console.log(`✅ Pre-cached 50,000+ strategic records.`);

// Real-time Event Loop (Simulation)
setInterval(() => {
  const newTrx = simulationService.generateSalesData(1)[0];
  
  // Presentation Layer: Live WebSocket Updates
  io.emit('new_sales_event', newTrx);
  
  // Real-time logic for Logistics/Network can be triggered here
  // and encapsulated in their respective Application Use Cases.
}, 5000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`📡 Decision Support Server running on port ${PORT}`);
});
