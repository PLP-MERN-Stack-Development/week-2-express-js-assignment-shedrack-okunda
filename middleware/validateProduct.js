const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Product name is required and must be a string." });
  }

  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Product description is required and must be a string." });
  }

  if (price == null || typeof price !== "number" || price < 0) {
    return res.status(400).json({
      error: "Product price is required and must be a non-negative number.",
    });
  }

  if (!category || typeof category !== "string") {
    return res
      .status(400)
      .json({ error: "Product category is required and must be a string." });
  }

  if (typeof inStock !== "boolean") {
    return res.status(400).json({
      error: "Product inStock status is required and must be a boolean.",
    });
  }

  next();
};

module.exports = validateProduct;
