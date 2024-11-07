// src/routes/sales.js
import { Router } from "express";
import { db } from "../config/firebaseConfig.js";

const router = Router();

// Ruta para agregar una venta
router.post("/addSale", async (req, res) => {
  try {
    const saleData = req.body;
    const saleRef = db.ref("sales").push();
    await saleRef.set(saleData);
    res
      .status(201)
      .json({ id: saleRef.key, message: "Venta agregada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la venta" });
  }
});

// Ruta para obtener todas las ventas
router.get("/sales", async (req, res) => {
  try {
    const snapshot = await db.ref("sales").once("value");
    const sales = snapshot.exists() ? snapshot.val() : {};
    const salesArray = Object.keys(sales).map((key) => ({
      id: key,
      ...sales[key],
    }));
    res.json(salesArray);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

export default router;
