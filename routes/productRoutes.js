const express = require("express");
const validateProduct = require("../middleware/validateProduct");
const { NotFoundError, ValidationError } = require("../utils/customErrors");
const asyncHandler = require("../middleware/asyncHandler");

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
  const { category, page = 1, limit = 10 } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    currentPage: parseInt(page),
    totalPages: Math.ceil(filteredProducts.length / limit),
    totalItems: filteredProducts.length,
    products: paginatedProducts,
  });
});

// GET /api/products/search?name=...
router.get("/products/search", (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(new ValidationError("Search term 'name' is required."));
  }

  const searchTerm = name.toLowerCase();

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );

  res.json({ total: results.length, results });
});

// GET /api/products/stats - Get product statistics
router.get("/products/stats", (req, res) => {
  const totalProducts = products.length;
  const categories = {};

  products.forEach((product) => {
    const cat = product.category.toLowerCase();
    categories[cat] = (categories[cat] || 0) + 1;
  });

  res.json({ totalProducts, categories });
});

// GET /api/products/:id - Get a specific product
router.get(
  "/products/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return next(new NotFoundError("Product not found."));
    }

    res.json(product);
  })
);

// POST /api/products - Create a new product
router.post(
  "/products",
  validateProduct,
  asyncHandler(async (req, res) => {
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
  })
);

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
