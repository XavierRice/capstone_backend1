DROP DATABASE IF EXISTS impactify_app;

CREATE DATABASE impactify_app;

\c impactify_app;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  events_created INT DEFAULT 0,
  favorite_events INT DEFAULT 0,
  favorite_news INT DEFAULT 0,
  donations_made INT DEFAULT 0,
  password_hash VARCHAR(255),
  user_keywords TEXT[]
);


CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  event_title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  lat NUMERIC (6, 4),
  lng NUMERIC (6, 4),
  event_location VARCHAR(255) NOT NULL,
  event_details VARCHAR(1000) NOT NULL,
  event_photo TEXT NOT NULL,
  is_virtual boolean,
  donation_id INTEGER,
  mobilize_id INTEGER,
  rsvp BOOLEAN DEFAULT false
);

CREATE TABLE news (
  news_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  news_title VARCHAR(255) NOT NULL,
  donation_id INTEGER,
  news_content TEXT NOT NULL,
  news_url TEXT NOT NULL,
  news_image TEXT NOT NULL
);

CREATE TABLE donations (
  donation_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
  donation_amount NUMERIC, 
  currency_code CHAR(3),
  donation_keyword VARCHAR(255) NOT NULL,
  donation_description TEXT NOT NULL
);

