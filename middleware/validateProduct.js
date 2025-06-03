const { ValidationError } = require("../utils/customErrors");

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== "string") {
    return next(
      new ValidationError("Product name is required and must be a string.")
    );
  }

  if (!description || typeof description !== "string") {
    return next(
      new ValidationError(
        "Product description is required and must be a string."
      )
    );
  }

  if (price == null || typeof price !== "number" || price < 0) {
    return next(
      new ValidationError(
        "Product price is required and must be a non-negative number."
      )
    );
  }

  if (!category || typeof category !== "string") {
    return next(
      new ValidationError("Product category is required and must be a string.")
    );
  }

  if (typeof inStock !== "boolean") {
    return next(
      new ValidationError(
        "Product inStock status is required and must be a boolean."
      )
    );
  }

  next();
};

module.exports = validateProduct;
