-- Drop existing tables to reset the database
DROP TABLE IF EXISTS CartProducts;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;


-- CREATE TABLES
CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT NOT NULL CHECK(user_type IN ('admin', 'shopper')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    price REAL NOT NULL,
    category_id INTEGER NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE IF NOT EXISTS Carts (
    cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL CHECK(status IN ('new', 'abandoned', 'purchased')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS CartProducts (
    cart_product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


-- Clear existing entries in Categories to avoid duplicates
DELETE FROM Categories;


-- INSERT DATA
-- Insert categories first to ensure products have valid categories
INSERT INTO Categories (name) VALUES ('Pizza'), ('Drinks'), ('Sides');

-- Insert products, assuming category_id references from previous inserts
INSERT INTO Products (name, description, image_url, price, category_id, is_featured)
VALUES 
('Margherita Pizza', 'Classic Margherita pizza with mozzarella and basil.', 'pizza1.jpg', 10.99, 1, TRUE),
('Pepperoni Pizza', 'Pepperoni pizza with extra cheese.', 'pizza2.jpg', 12.99, 1, FALSE),
('Cola', 'Refreshing soda drink.', 'cola.jpg', 1.99, 2, FALSE);

-- Insert users
INSERT INTO Users (name, email, password, user_type) 
VALUES ('Admin User', 'admin@example.com', 'password123', 'admin'),
       ('Shopper User', 'shopper@example.com', 'password123', 'shopper');

-- Insert cart for shopper
INSERT INTO Carts (status, user_id) VALUES ('new', 2);

-- Insert cart products assuming product and cart entries exist
INSERT INTO CartProducts (cart_id, product_id, quantity)
VALUES (1, 1, 2), (1, 2, 1);

-- Verify contents
SELECT * FROM Users;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Carts;
SELECT * FROM CartProducts;
