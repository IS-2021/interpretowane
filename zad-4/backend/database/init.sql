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
    CONSTRAINT userIdFK FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
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

INSERT INTO OrderStatuses (orderStatusId, status) VALUES
('f4e28cb9-2c6b-4f6b-b48c-beeeb8f5a216', 'NIEZATWIERDZONE'),
('abada23e-2ffd-4a6c-893d-c8585b3cc78a', 'ZATWIERDZONE'),
('4fc1ceec-6548-4257-8064-bcea84f8f218', 'ANULOWANE'),
('83e2ddaa-b6eb-410d-a7fe-b2418e78f367', 'ZREALIZOWANE');

INSERT INTO Categories (name) VALUES ('Owoce'), ('Warzywa');
INSERT INTO Products (name, description, unitPrice, unitWeight, categoryId) 
VALUES
    ('Jabłka', 'Świeże i smaczne, prosto z ogrodu sąsiada', 1000, 1000, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Pomarańcze', 'Bloody oranges!', 1600, 1000, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Wiśnie', 'To te z pestkami. Chyba.', 3500, 1000, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Kalafior', 'Bułka tarta sprzedawana osobno.', 1500, 1000, (SELECT categoryId FROM Categories WHERE name = 'Warzywa')),
    ('Pomidor', 'Dyskusyjna kategoria, ale bezdyskusyjnie smaczny.', 2200, 1000, (SELECT categoryId FROM Categories WHERE name = 'Warzywa')),
    ('Gruszki', 'Słodkie gruszki z sadu', 1200, 1000, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Mandarynki', 'Mini pomarańcze pełne witaminy', 1800, 800, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Maliny', 'Świeże maliny idealne do deserów', 4200, 500, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Brokuły', 'Zielone brokuły, bogate w błonnik', 2000, 800, (SELECT categoryId FROM Categories WHERE name = 'Warzywa')),
    ('Marchewki', 'Słodkie marchewki prosto z pola', 900, 800, (SELECT categoryId FROM Categories WHERE name = 'Warzywa')),
    ('Cukinia', 'Cukinia gotowa do grillowania', 2500, 700, (SELECT categoryId FROM Categories WHERE name = 'Warzywa')),
    ('Arbuzy', '80% wody, 20% pestek', 3000, 5000, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Brzoskwinie', 'Dojrzałe brzoskwinie z własnego sadu', 1800, 1200, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Jeżyny', 'Dzikie jeżyny, pełne witamin', 4500, 800, (SELECT categoryId FROM Categories WHERE name = 'Owoce')),
    ('Szparagi', 'Świeże szparagi, idealne do sałatek', 2800, 500, (SELECT categoryId FROM Categories WHERE name = 'Warzywa')),
    ('Ziemniaki', 'Firmowe ziemniaki, doskonałe do gotowania', 1200, 2000, (SELECT categoryId FROM Categories WHERE name = 'Warzywa'));
