-- Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT CHECK(user_type IN ('admin', 'shopper')) NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    priority_level INTEGER DEFAULT 1
);

-- Products table
CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    price REAL NOT NULL,
    category_id INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Carts table
CREATE TABLE IF NOT EXISTS Carts (
    cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT CHECK(status IN ('new', 'abandoned', 'purchased')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER UNIQUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- CartProducts table
CREATE TABLE IF NOT EXISTS CartProducts (
    cart_product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

