DROP TABLE IF EXISTS emi_plans;
DROP TABLE IF EXISTS variants;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) UNIQUE NOT NULL,
    description TEXT,
    base_price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    variant_name VARCHAR(100) NOT NULL,
    variant_value VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2),
    stock INTEGER DEFAULT 0,

    CONSTRAINT fk_variant_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE emi_plans (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    months INTEGER NOT NULL,
    monthly_amount NUMERIC(10, 2) NOT NULL,
    interest_rate NUMERIC(5, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,

    CONSTRAINT fk_emi_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);