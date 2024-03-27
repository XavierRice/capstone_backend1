DROP DATABASE IF EXISTS impactify_app;

CREATE DATABASE impactify_app;

\c impactify_app;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
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
  event_keywords TEXT[],
  event_location VARCHAR(255) NOT NULL,
  event_details VARCHAR(1000) NOT NULL,
  event_photo TEXT NOT NULL,
  is_virtual boolean,
  accept_donation boolean,
  rsvp BOOLEAN DEFAULT false,
  stripe_id VARCHAR(225)
);

CREATE TABLE news (
  news_id SERIAL PRIMARY KEY,
  news_title VARCHAR(255) NOT NULL,
  donation_id INTEGER,
  news_content TEXT NOT NULL,
  news_url TEXT NOT NULL,
  news_image TEXT NOT NULL,
  news_keywords TEXT[] 
);

CREATE TABLE donations (
  donation_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
  donation_amount NUMERIC, 
  stripe_button VARCHAR(255) NOT NULL,
  donation_description TEXT NOT NULL
);

