// src/routes/items.js
import { Router } from "express";
import productsData from "../data/products.json" assert { type: "json" };

const router = Router();

router.get("/items", (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res
      .status(400)
      .json({ error: "Se requiere un parámetro de búsqueda (query)." });
  }

  const filteredProducts = productsData.products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );

  const results = filteredProducts.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    thumbnail: product.thumbnail,
  }));

  res.json(results);
});

// Nuevo endpoint para obtener un producto específico por ID
router.get("/items/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);

  const product = productsData.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

export default router;
