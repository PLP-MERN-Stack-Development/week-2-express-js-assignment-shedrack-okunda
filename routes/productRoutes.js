const express = require("express");
const validateProduct = require("../middleware/validateProduct");

const router = express.Router();

// Sample in-memory products database
let products = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false,
  },
];

// GET /api/products - Get all products
router.get("/products", (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  res.json(product);
});

// POST /api/products - Create a new product
router.post("/products", validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description,
    price,
    category,
    inStock,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
router.put("products/:id", validateProduct, (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  const { name, description, price, category, inStock } = req.body;

  //   update only provided fields
  products[index] = {
    ...products[index],
    name: name ?? products[index].name,
    description: description ?? products[index].description,
    price: price ?? products[index].price,
    category: category ?? products[index].category,
    inStock: inStock ?? products[index].inStock,
  };

  res.json(products[index]);
});

// DELETE /api/products/:id - Delete a product
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.json({ message: "Product deleted", product: deletedProduct });
});

module.exports = router;
