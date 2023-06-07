CREATE DATABASE store_app;
USE store_app;

CREATE TABLE products (
    product_id CHAR(32),
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id)
);

CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_id CHAR(32),
    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);