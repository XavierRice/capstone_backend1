DROP DATABASE IF EXISTS capstone_app;

CREATE DATABASE user_table;

\c user_table;

CREATE TABLE tasks (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  events_created INT,
  favorite_events INT,
  favorite_news INT,
  donations_made INT,
  password_hash VARCHAR(255),
  user_keywords TEXT[];
);