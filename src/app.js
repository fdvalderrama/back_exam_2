// src/app.js
import express from "express";
import cors from "cors";
import salesRouter from "./routes/sales.js";
import itemsRouter from "./routes/items.js";

const app = express();
app.use(cors());
app.use(express.json());

// Usar las rutas de ventas y productos
app.use("/api", salesRouter);
app.use("/api", itemsRouter);

export default app;
