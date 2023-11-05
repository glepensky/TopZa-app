
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- Table for restaurants

CREATE TABLE "restaurants" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"("id"),
    "restaurant_name" VARCHAR (80) NOT NULL,
    "restaurant_location" VARCHAR(255)
);

-- Table for ratings

CREATE TABLE "ratings" (
    "id" SERIAL PRIMARY KEY,
    "restaurant_id" INTEGER REFERENCES "restaurants"("id"),
    "restaurant_rating" DECIMAL(3,1) NOT NULL
);