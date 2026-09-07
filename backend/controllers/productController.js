const pool = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const productResult = await pool.query(
      "SELECT * FROM products WHERE slug = $1",
      [slug]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const product = productResult.rows[0];

    const variantsResult = await pool.query(
      "SELECT * FROM variants WHERE product_id = $1 ORDER BY id ASC",
      [product.id]
    );

    const emiResult = await pool.query(
      "SELECT * FROM emi_plans WHERE product_id = $1 ORDER BY months ASC",
      [product.id]
    );

    res.status(200).json({
      ...product,
      variants: variantsResult.rows,
      emi_plans: emiResult.rows,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
};