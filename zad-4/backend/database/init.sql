CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE OrderStatuses (
    orderStatusId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL
);

CREATE TABLE Users (
    userId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT NOT NULL
);

CREATE TABLE Categories (
    categoryId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE Products (
    productId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    unitPrice NUMERIC NOT NULL,
    unitWeight NUMERIC NOT NULL,
    categoryId UUID,

    CONSTRAINT categoryIdFK FOREIGN KEY (categoryId) REFERENCES Categories (categoryId)
);

CREATE TABLE Orders (
    orderId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    approvalDate DATE,
    orderStatusId UUID NOT NULL,
    userId UUID NOT NULL,

    CONSTRAINT orderStatusIdFK FOREIGN KEY (orderStatusId) REFERENCES OrderStatuses (orderStatusId),
    CONSTRAINT userIdFK FOREIGN KEY (userId) REFERENCES Users (userId)
);


CREATE TABLE OrderItems (
    orderItemId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    orderId UUID NOT NULL,
    productId UUID NOT NULL,
    unitPrice NUMERIC NOT NULL,
    quantity numeric NOT NULL,

    CONSTRAINT orderIdFK FOREIGN KEY (orderID) REFERENCES Orders (orderId),
    CONSTRAINT productIdFK FOREIGN KEY (productId) REFERENCES Products (productId)
);

INSERT INTO OrderStatuses (status) VALUES ('NIEZATWIERDZONE'), ('ZATWIERDZONE'), ('ANULOWANE'), ('ZREALIZOWANE');
