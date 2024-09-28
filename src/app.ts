import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment";
import planRoutes from "./routes/plans";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/payments", paymentRoutes);
app.use("/plans", planRoutes);

const server = http.createServer(app);

export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");

    io.on("connection", (socket) => {
      console.log("Novo cliente conectado: ", socket.id);

      socket.on("paymentApproved", (data) => {
        console.log("Pagamento aprovado: ", data);
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado: ", socket.id);
      });
    });

    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
